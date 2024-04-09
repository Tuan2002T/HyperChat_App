import React, { useEffect, useState } from 'react';
import { GiftedChat, Avatar, Day } from 'react-native-gifted-chat';
import { View, TouchableHighlight, Text, Alert, Image, Linking } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { io } from 'socket.io-client';
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { socket } from '../socket/socket';
import { getMessagesByChatId, retrieveMessages, sendMessage } from '../api/Message';
import Video from 'react-native-video';
import { showMessage, hideMessage } from "react-native-flash-message";
import {useDispatch, useSelector} from 'react-redux';

const NewMessageScreen = ({ route }) => {
  const users = useSelector(state => state.user.users); 
  const user = useSelector(state => state.auth.user.avatar);
  console.log('user111111111111111111111111', user);
  const getFileExtensionFromUrl = (url) => {
    // Tách phần mở rộng từ URL và chuyển đổi thành chữ thường
    const parts = url.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    return extension;
  };


  const renderMessageVideo = (props) => {
    const { currentMessage, user } = props;

    // Kiểm tra xem trường "video" có tồn tại trong currentMessage hay không
    if (currentMessage.video) {
      const isCurrentUser = currentMessage.user._id === user._id;

      return (
        <View style={{ alignItems: 'center' }}>
          <Video
            source={{ uri: currentMessage.video }}
            style={{ width: 150, height: 150 }}
            ref={(ref) => { this.player = ref }}
            onBuffer={this.onBuffer}
            onError={this.videoError}
          />
          {isCurrentUser && (
            <IconButton
              iconColor='white'
              onPress={() => pickerMessage(currentMessage)}
              icon="dots-horizontal"
              style={{ backgroundColor: 'gray', height: 20 }}
            />
          )}
        </View>
      );
    }

    return null; // Trả về null nếu không có trường "video" trong currentMessage
  };
  const renderMessageText = (props) => {
    const { currentMessage, user } = props;

    // Kiểm tra xem trường "text" có tồn tại trong currentMessage hay không
    if (currentMessage.text) {
      const isCurrentUser = currentMessage.user._id === user._id;
      const textColor = isCurrentUser ? 'white' : 'black';

      return (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: textColor }}>{currentMessage.text}</Text>
          {isCurrentUser && (
            <IconButton
              iconColor='white'
              onPress={() => pickerMessage(currentMessage)}
              icon="dots-horizontal"
              style={{ backgroundColor: 'gray', height: 20 }}
            />
          )}
        </View>
      );
    }

    return null; // Trả về null nếu không có trường "text" trong currentMessage
  };



  const renderMessageImage = (props) => {
    const { currentMessage, user } = props;

    // Kiểm tra xem trường "image" có tồn tại trong currentMessage hay không
    if (currentMessage.image) {
      const isCurrentUser = currentMessage.user._id === user._id;

      return (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: currentMessage.image }}
            style={{ width: 150, height: 150 }}
          />
          {isCurrentUser && (
            <IconButton
              iconColor='white'
              onPress={() => pickerMessage(currentMessage)}
              icon="dots-horizontal"
              style={{ backgroundColor: 'gray', height: 20 }}
            />
          )}
        </View>
      );
    }

    return null; // Trả về null nếu không có trường "image" trong currentMessage
  };

  const renderMessageFile = (props) => {

    const { currentMessage } = props;
    // Kiểm tra xem trường "file" có tồn tại trong currentMessage hay không
    if (currentMessage.file) {
      return (
        <View style={{ alignItems: 'center' }}>
          <IconButton
            iconColor='white'
            onPress={() => Linking.openURL(currentMessage.file)}
            icon="file"
            style={{ backgroundColor: 'gray', height: 100, width: 100 }}
          />
          <IconButton
            iconColor='white'
            onPress={() => pickerMessage(currentMessage)}
            icon="dots-horizontal"
            style={{ backgroundColor: 'gray', height: 20 }}
          />
        </View>

      );
    }

    return null; // Trả về null nếu không có trường "file" trong currentMessage

  }



  const pickerMessage = async (id) => {
    Alert.alert(
      'Tuỳ chọn tin nhắn',
      'Tuỳ chọn ',
      [
        {
          text: 'Thu hồi tin nhắn',
          onPress: () => checkMessage(id),
        },
        {
          text: 'Xoá tin nhắn',
          onPress: () => launchImagePicker('camera'),
        },
        {
          text: 'Chuyển tiếp tin nhắn',
          onPress: () => launchImagePicker('camera'),
        },
      ],
      { cancelable: true },
    );
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Loại tệp tin có thể chọn
      });

      // Gọi hàm xử lý khi chọn tệp
      handleFileResponse(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        // Xảy ra lỗi khi chọn tệp
        console.log(err);
      }
    }
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
    let fileContent = '';
    
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
      else {
        messageType = 'file';
        messageContent = '';
        fileContent = content.files[0];
      }
    }

    return {
      _id,
      text: messageContent,
      image: imageContent,
      video: videoContent,
      file: fileContent,
      user: {
        _id: sender,
        avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
      },
      createdAt: new Date(createdAt),
    };
  };

  useEffect(() => {
    socket.on('notification', (data) => {
      console.log('data', data);
      showMessage({
        message: data,
        description: "This is our second message",
        type: "success",
      })

    });
  }, [socket]);

  useEffect(() => {
    socket.on('receiveNotification', (data) => {
      showMessage({
        message: data,
        description: "This is our second message",
        type: "success",
      })
    });

    socket.on('retrievedMessageRecall', (data) => {
      setMessages(data)
    });
    getMessagesByChatId(roomId).then((data) => {
      const convertedMessages = data.map(convertMessageToGiftedChatMessage);
      setMessages(convertedMessages.reverse());
    });
    socket.emit('joinRoom', roomId, route.params.item.members);
    socket.on('receiveMessage', (data) => {
      const { message, senderId, createdAt, image, video, file, messageId } = data;
      setMessages((previousMessages) => {
        const existingMessage = previousMessages.find(
          (msg) => msg.text === message && msg.user._id === senderId
        );

        const newMessage = {
          _id: messageId,
          text: message,
          createdAt: new Date(createdAt),
          user: {
            _id: senderId,
            avatar: 'https://image2403.s3.ap-southeast-1.amazonaws.com/message.1712420273857.jpg',
          },
          image: image, // Thêm dữ liệu hình ảnh vào đây
          video: video, // Thêm dữ liệu video vào đây
          file: file, // Thêm dữ liệu file vào đây
        };


        return GiftedChat.append(previousMessages, [newMessage]);
      });
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const onSend = async (newMessages = []) => {
    try {
      for (const newMessage of newMessages) {
        const { text, createdAt, image, video, file } = newMessage;

        // Gửi tin nhắn và đợi nhận ID từ hàm sendMessage
        const id = await sendMessage(currentUserId, text, roomId, image);
        const messageId = id.id
        console.log('messageId', id.id);
        // Sau khi nhận được messageId, gửi tin nhắn qua socket
        socket.emit('sendMessage', {
          roomId,
          message: text,
          senderId: currentUserId,
          createdAt,
          image,
          video,
          file,
          messageId // Truyền ID của tin nhắn
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
        console.log('img', img.files[0]);
        const messageId = img.id
        // Gửi tin nhắn hình ảnh qua socket
        socket.emit('sendMessage', {
          roomId,
          senderId: currentUserId,
          createdAt: new Date(),
          image: img.files[0],
          video: '',
          files: '',
          messageId
          
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
          text: 'Camera',
          onPress: () => launchVideoPicker('camera'),
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
        const messageId = video.id
        socket.emit('sendMessage', {
          roomId,
          senderId: currentUserId,
          createdAt: new Date(),
          image: '',
          video: video,
          files: '',
          messageId
        });

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled Video picker');
    } else if (response.errorMessage) {
      console.log('FilePicker Error: ', response.errorMessage);
    } else {
      console.log('File URI:', response[0]);
      const files = {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name,
      };
      console.log('files', files);

      try {
        const file = await sendMessage(currentUserId, '', roomId, files);
        console.log('file', file);
        const messageId = file.id
        socket.emit('sendMessage', {
          roomId,
          senderId: currentUserId,
          createdAt: new Date(),
          image: '',
          video: '',
          file: file,
          messageId
        });

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  const checkMessage = async (currentMessage) => {

    const messageIndex = messages.findIndex(message => message._id === currentMessage._id);
    console.log('messageIndex', messageIndex);
    console.log('Message', messages);
    console.log('messages', messageIndex);

    // Kiểm tra xem tin nhắn có tồn tại trong danh sách không
    if (messageIndex !== -1) {
      // Sao chép tin nhắn cần cập nhật
      const updatedMessage = { ...messages[messageIndex] };
      // Cập nhật nội dung của tin nhắn
      updatedMessage.text = 'Tin nhắn đã được thu hồi';
      // Cập nhật các trường image, video, file (nếu cần)
      updatedMessage.image = ''; // Cập nhật hình ảnh
      updatedMessage.video = ''; // Cập nhật video
      updatedMessage.file = ''; // Cập nhật file

      // Sao chép danh sách tin nhắn và thay thế tin nhắn cũ bằng tin nhắn mới
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = updatedMessage;
      socket.emit('retrieveMessages', { roomId, updatedMessages })
      // Cập nhật state với danh sách tin nhắn mới đã được cập nhật
      setMessages(updatedMessages);
      retrieveMessages(currentMessage._id)
      // Log toàn bộ danh sách tin nhắn đã được cập nhật
      // console.log('Updated Messages:', updatedMessages);
    } else {
      console.log('Tin nhắn không tồn tại trong danh sách.');
    }
  }


  // ---------------------------
  return (
    <View style={{ flex: 1 , width: '100%'} }>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: '6%',width:'100%', backgroundColor: '#149AFD', justifyContent:'space-between' }}>
        <View style={{flexDirection:'row', alignItems:'center', width:'50%'}}>
          <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack(), socket.emit('leaveRoom', roomId); }} />
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{route.params.item.name}</Text>
        </View>
        <View style={{ flexDirection:'row', alignItems: 'flex-end', widthL:'50%' }}>
          <IconButton size={25} iconColor='white' icon="phone" onPress={() => { }} />
          <IconButton size={28} iconColor='white' icon="video-outline" onPress={() => { }} />
          <IconButton size={30} iconColor='white' icon="menu-open" onPress={() => { }} />
        </View>

      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: currentUserId,
          avatar: 'https://exam ple.com/currentUserAvatar.png',
        }}
        renderAvatar={renderAvatar}
        renderDay={renderDay}
        renderMessageVideo={renderMessageVideo}
        renderMessageText={renderMessageText}
        renderMessageImage={renderMessageImage}
        renderCustomView={renderMessageFile}
        renderActions={(props) => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={() => pickImage()}>
              <IconButton icon="image" />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => pickMedia()}>
              <IconButton icon="file-video-outline" />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => pickFile()}>
              <IconButton icon="file" />
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

export default NewMessageScreen;
