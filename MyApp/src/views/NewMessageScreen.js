import React, { useEffect, useState } from 'react';
import { GiftedChat, Avatar, Day } from 'react-native-gifted-chat';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { io } from 'socket.io-client';
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { socket } from '../socket/socket';
import { getMessagesByChatId, sendMessage } from '../api/Message';

const NewMessageScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUserId = route.params.currentUserId;
  const roomId = route.params.roomId;
  const navigation = useNavigation();
  console.log('roomId', roomId);
  const convertMessageToGiftedChatMessage = (message) => {
    const { _id, content, sender, createdAt } = message;
    return {
      _id,
      text: content.text,
      user: {
        _id: sender,
        avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
      },
      createdAt: new Date(createdAt),
      image: content.files.length > 0 ? content.files[0] : null,
    };
  };
  useEffect(() => {
    
      getMessagesByChatId(roomId).then((data) => {
      const convertedMessages = data.map(convertMessageToGiftedChatMessage);
      setMessages(convertedMessages.reverse());
    });
    

    socket.emit('joinRoom', roomId, route.params.item.members);
    socket.on('receiveMessage', (data) => {
      const { message, senderId, createdAt, image } = data;
      setMessages((previousMessages) => {
        const existingMessage = previousMessages.find(
          (msg) => msg.text === message && msg.user._id === senderId
        );
        return GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: message,
            createdAt: new Date(createdAt),
            user: {
              _id: senderId,
              avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
            },
            image: image, // Thêm dữ liệu hình ảnh vào đây
          },
        ]);
      });
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const onSend = (newMessages = []) => {
    newMessages.forEach((newMessage) => {
      const { text, createdAt, image } = newMessage;
      socket.emit('sendMessage', {
        roomId,
        message: text,
        senderId: currentUserId,
        createdAt,
        image,
      });
      sendMessage(currentUserId, text, roomId, image)
    });
  };

  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        source={{ uri: props.currentMessage.user.avatar }}
        containerStyle={{ marginRight: 8 }}
      />
    );
  };

  const renderDay = (props) => {
    return <Day {...props} />;
  };

  const pickImage = async () => {
    Alert.alert(
      'Choose Option',
      'Pick an option to set your avatar',
      [
        {
          text: 'Choose from Library',
          onPress: () => launchImagePicker('library'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const launchImagePicker = (option) => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    if (option === 'library') {
      launchImageLibrary(options, handleImageResponse);
    } else if (option === 'camera') {
      launchCamera(options, handleImageResponse);
    }
  };

  const handleImageResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      console.log('Image URI:', response.assets[0]);
      const files = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
  
      try {
        const img = await sendMessage(currentUserId, '', roomId, files);
        console.log('img', img);
  
        // Gửi tin nhắn hình ảnh qua socket
          socket.emit('sendMessage', {
            roomId,
            senderId: currentUserId,
            createdAt: new Date(),
            image: img ,
          });
      
  
        // Gọi onSend để hiển thị tin nhắn hình ảnh trong giao diện
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableHighlight onPress={() => { navigation.goBack(), socket.emit('leaveRoom', roomId); }}>
          <Text style={{ paddingHorizontal: 10 }}>Quay lại</Text>
        </TouchableHighlight>
        <Text style={{ flex: 1, textAlign: 'center' }}>Tin nhắn mới</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: currentUserId,
          avatar: 'https://example.com/currentUserAvatar.png',
        }}
        renderAvatar={renderAvatar}
        renderDay={renderDay}
        renderActions={(props) => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={() => pickImage()}>
              <Text style={{ paddingHorizontal: 10 }}>Chọn hình ảnh</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => launchImagePicker('camera')}>
              <Text style={{ paddingHorizontal: 10 }}>Chụp ảnh</Text>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

export default NewMessageScreen;
