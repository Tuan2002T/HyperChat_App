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
        <View style={{ alignItems: 'center' }}>
          <Video
            source={{ uri: currentMessage.video }} // Đường dẫn của video
            style={{ width: 150, height: 150 }} // Kích thước của video
            ref={(ref) => {
              this.player = ref
            }}
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}
          />
          <IconButton iconColor='white' onPress={() => pickerMessage()} icon="dots-horizontal" style={{ backgroundColor: 'gray', height: 20 }} />
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
              onPress={() => pickerMessage()}
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

    const { currentMessage } = props;
    // Kiểm tra xem trường "image" có tồn tại trong currentMessage hay không
    if (currentMessage.image) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: currentMessage.image }} // Đường dẫn của hình ảnh
            style={{ width: 150, height: 150 }} // Kích thước của hình ảnh
          />
          <IconButton
            iconColor='white'
            onPress={() => pickerMessage()}
            icon="dots-horizontal"
            style={{ backgroundColor: 'gray', height: 20 }}
          />
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
            style={{ backgroundColor: 'gray', height: 100, width: 100}}
          />
           <IconButton
            iconColor='white'
            onPress={() => pickerMessage()}
            icon="dots-horizontal"
            style={{ backgroundColor: 'gray', height: 20 }}
          />
        </View>

      );
    }

    return null; // Trả về null nếu không có trường "file" trong currentMessage

  }



  const pickerMessage = async () => {
    Alert.alert(
      'Tuỳ chọn tin nhắn',
      'Tuỳ chọn ',
      [
        {
          text: 'Thu hồi tin nhắn',
          onPress: () => launchImagePicker('library'),
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

    getMessagesByChatId(roomId).then((data) => {
      const convertedMessages = data.map(convertMessageToGiftedChatMessage);
      setMessages(convertedMessages.reverse());
      console.log('convertedMessages', convertedMessages);
    });


    socket.emit('joinRoom', roomId, route.params.item.members);
    socket.on('receiveMessage', (data) => {
      const { message, senderId, createdAt, image, video, file } = data;
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
          file: file, // Thêm dữ liệu file vào đây
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
      const { text, createdAt, image, video, file } = newMessage;
      socket.emit('sendMessage', {
        roomId,
        message: text,
        senderId: currentUserId,
        createdAt,
        image,
        video,
        file
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
          image: img,
          video: '',
          files: ''
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
          video: video,
          files: ''
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

        socket.emit('sendMessage', {
          roomId,
          senderId: currentUserId,
          createdAt: new Date(),
          image: '',
          video: '',
          file: file,
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
