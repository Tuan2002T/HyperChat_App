import React, { useEffect, useState } from 'react';
import { GiftedChat, Avatar, Day } from 'react-native-gifted-chat';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { io } from 'socket.io-client';
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton  } from 'react-native-paper';
import { socket } from '../socket/socket';
import { getMessagesByChatId, sendMessage } from '../api/Message';
import Video from 'react-native-video';
const NewMessageScreen = ({ route }) => {
  const getFileExtensionFromUrl = (url) => {
    // Tách phần mở rộng từ URL và chuyển đổi thành chữ thường
    const parts = url.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    return extension;
  };

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;

    // Kiểm tra xem trường "video" có tồn tại trong currentMessage hay không
    if (currentMessage.video) {
        return (
            <Video
                source={{ uri: currentMessage.video }} // Đường dẫn của video
                style={{ width: 150, height: 150 }} // Kích thước của video
                ref={(ref) => {
                  this.player = ref
                }}       
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}       
            />
        );
    }

    return null; // Trả về null nếu không có trường "video" trong currentMessage
};
  const [messages, setMessages] = useState([]);
  const currentUserId = route.params.currentUserId;
  const roomId = route.params.roomId;
  const navigation = useNavigation();
  console.log('roomId', roomId);
  const convertMessageToGiftedChatMessage = (message) => {
    const { _id, content, sender, createdAt } = message;
    let messageType = 'text';
    let messageContent = content.text;
    let imageContent = '';
    let videoContent = '';
  
    if (content.files.length > 0) {
      const fileExtension = getFileExtensionFromUrl(content.files[0]);
  
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        messageType = 'image';
        messageContent = '';
        imageContent = content.files[0];
      } else if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
        messageType = 'video';
        messageContent = '';
        videoContent = content.files[0];
      }
    }
  
    return {
      _id,
      text: messageContent,
      image: imageContent,
      video: videoContent,
      user: {
        _id: sender,
        avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
      },
      createdAt: new Date(createdAt),
    };
  };
  
  useEffect(() => {
    
      getMessagesByChatId(roomId).then((data) => {
      const convertedMessages = data.map(convertMessageToGiftedChatMessage);
      setMessages(convertedMessages.reverse());
      console.log('convertedMessages', convertedMessages);
    });
    

    socket.emit('joinRoom', roomId, route.params.item.members);
    socket.on('receiveMessage', (data) => {
      const { message, senderId, createdAt, image, video } = data;
      setMessages((previousMessages) => {
        const existingMessage = previousMessages.find(
          (msg) => msg.text === message && msg.user._id === senderId
        );
    
        const newMessage = {
          _id: Math.random().toString(36).substring(7),
          text: message,
          createdAt: new Date(createdAt),
          user: {
            _id: senderId,
            avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
          },
          image: image, // Thêm dữ liệu hình ảnh vào đây
          video: video, // Thêm dữ liệu video vào đây
        };
    
        return GiftedChat.append(previousMessages, [newMessage]);
      });
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const onSend = (newMessages = []) => {
    newMessages.forEach((newMessage) => {
      const { text, createdAt, image, video } = newMessage;
      socket.emit('sendMessage', {
        roomId,
        message: text,
        senderId: currentUserId,
        createdAt,
        image,
        video
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
          text: 'Camera',
          onPress: () => launchImagePicker('camera'),
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
            video: ''
          });
      
  
        // Gọi onSend để hiển thị tin nhắn hình ảnh trong giao diện
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const pickMedia = async (mediaType) => {
    Alert.alert(
      'Choose Option',
      'Pick an option to select media',
      [
        {
          text: 'Choose from Library',
          onPress: () => launchVideoPicker('library', mediaType),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };



  const launchVideoPicker = (option) => {
    let options = {
      mediaType: 'video',
      quality: 1,
    };

    if (option === 'library') {
      launchImageLibrary(options, handleVideoResponse);
    } else if (option === 'camera') {
      launchCamera(options, handleVideoResponse);
    }
  };

  const handleVideoResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled Video picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      console.log('Video URI:', response.assets[0]);
      const files = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
  
      try {
        const video = await sendMessage(currentUserId, '', roomId, files);
        console.log('video', video);

          socket.emit('sendMessage', {
            roomId,
            senderId: currentUserId,
            createdAt: new Date(),
            image: '',
            video: video ,
          });
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // ---------------------------
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
        renderMessageVideo={renderMessageVideo}
        renderActions={(props) => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={() => pickImage()}>
              <IconButton icon="image"/>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => pickMedia()}>
            <IconButton icon="file-video-outline"/>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

export default NewMessageScreen;
