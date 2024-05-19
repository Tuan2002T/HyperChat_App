import React, { useEffect, useState } from 'react';
import { GiftedChat, Avatar, Day } from 'react-native-gifted-chat';
import { View, TouchableHighlight, Text, Alert, Image, Linking, Modal, TouchableOpacity } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { socket } from '../socket/socket';
import { deleteMessageAPI, getMessagesByChatId, retrieveMessages, sendMessage } from '../api/Message';
import Video from 'react-native-video';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';

const NewMessageScreen = ({ navigation, route }) => {
  const users = useSelector(state => state.user.users);
  const user = useSelector(state => state.auth.user.avatar);
  // console.log('user111111111111111111111111', user);
  const getFileExtensionFromUrl = (url) => {
    // Tách phần mở rộng từ URL và chuyển đổi thành chữ thường
    const parts = url.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    return extension;
  };


  const renderMessageVideo = ({ currentMessage, user }) => {
    if (currentMessage.video) {
      return (
        <TouchableOpacity
          onLongPress={() => toggleModal(currentMessage)}
          style={{
          flexDirection: 'row',
          alignItems: 'center',
          // marginVertical: 10,
          height: 150,
        }}>
          <Video
            source={{ uri: currentMessage.video }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10, // Làm tròn góc của video
            }}
            resizeMode="cover" // Chế độ co dãn hình ảnh để phù hợp với kích thước của video
            paused={true} // Tạm dừng video khi nó được hiển thị
            controls={true} // Hiển thị controls cho video
          />
        </TouchableOpacity>
      );
    }
  
    return null;
  }; 
  const renderMessageText = (props) => {
    const { currentMessage, user } = props;

    // Kiểm tra xem trường "text" có tồn tại trong currentMessage hay không
    if (currentMessage.text) {
      const isCurrentUser = currentMessage.user._id === user._id;
      const textColor = isCurrentUser ? 'white' : 'black';

      return (
        <TouchableOpacity
          onLongPress={() => toggleModal(currentMessage)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              paddingHorizontal: 15,
              // paddingVertical: 10,
              backgroundColor: isCurrentUser ? '#0084ff' : '#f0f0f0',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: textColor,
              }}
            >
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return null; // Trả về null nếu không có trường "text" trong currentMessage
  };

  const renderMessageImage = ({ currentMessage, user }) => {
    if (currentMessage.image) {
      return (
        <TouchableOpacity onLongPress={() => toggleModal(currentMessage)} style={{ marginVertical: 10 }}>
          <View style={{ backgroundColor: '#f0f0f0', borderRadius: 10, overflow: 'hidden', elevation: 5 }}>
            <Image
              source={{ uri: currentMessage.image }}
              style={{ width: 150, height: 150 }}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderMessageFile = ({ currentMessage, user }) => {
    if (currentMessage.file) {
      return (
        <TouchableOpacity
          onLongPress={() => toggleModal(currentMessage)}
          onPress={() => Linking.openURL(currentMessage.file)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <IconButton
            iconColor="white"
            icon="file"
            style={{
              backgroundColor: 'gray',
              height: 60,
              width: 60,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      );
    }

    return null;
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

  const [modalVisible, setModalVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const toggleModal = (currentMessage) => {
    setModalVisible(true);
    setCurrentMessage(currentMessage);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const convertMessageToGiftedChatMessage = (message) => {
    const { _id, content, sender, createdAt, views } = message;
    let messageType = 'text';
    let messageContent = content.text;
    let imageContent = '';
    let videoContent = '';
    let fileContent = '';

    if (views.includes(currentUserId)) {
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
      console.log(users.find((user) => user._id === sender).avatar);
      return {
        _id,
        text: messageContent,
        image: imageContent,
        video: videoContent,
        file: fileContent,
        user: {
          _id: sender,
          avatar: users.find((user) => user._id === sender).avatar,
        },
        createdAt: new Date(createdAt),
      };
    }
    return {
      _id,
      text: '',
      image: '',
      video: '',
      file: '',
      user: {
        _id: sender,
        avatar: '',
      },
      createdAt: '',
    }
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
            avatar: users.find((user) => user._id === senderId).avatar,
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
      if (response.assets && response.assets.length > 0) {
        console.log('Video URI:', response.assets[0].uri);
        let files;
  
        if (Array.isArray(response.assets)) {
          files = response.assets.map((asset) => {
            return {
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName,
            };
          });
        } else {
          files = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
        }
  
        try {
          if (files) {
            const video = await sendMessage(currentUserId, '', roomId, files);
            if (video && video.files && video.files.length > 0) {
              console.log('video', video);
              const messageId = video.id;
              socket.emit('sendMessage', {
                roomId,
                senderId: currentUserId,
                createdAt: new Date(),
                image: '',
                video: video.files[0],
                files: '',
                messageId
              });
            } else {
              console.log('Invalid response from sendMessageGroup');
            }
          } else {
            console.error('files object is undefined');
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.log('No assets found in the response');
      }
    }
  };

  const handleFileResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled file picker');
    } else if (response.errorMessage) {
      console.log('FilePicker Error: ', response.errorMessage);
    } else {
      if (response && response.length > 0) {
        console.log('File URI:', response[0].uri);
  
        let files;
  
        if (Array.isArray(response)) {
          files = response.map((file) => {
            return {
              uri: file.uri,
              type: file.type,
              name: file.name,
            };
          });
        } else {
          files = {
            uri: response[0].uri,
            type: response[0].type,
            name: response[0].name,
          };
        }
  
        console.log('files', files);
  
        try {
          if (files) {
            const file = await sendMessage(currentUserId, '', roomId, files);
            if (file && file.files && file.files.length > 0) {
              console.log('file', file);
              const messageId = file.id;
              socket.emit('sendMessage', {
                roomId,
                senderId: currentUserId,
                createdAt: new Date(),
                image: '',
                video: '',
                file: file.files[0],
                messageId
              });
            } else {
              console.log('Invalid response from sendMessageGroup');
            }
          } else {
            console.error('files object is undefined');
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.log('No file found in the response');
      }
    }
  };
  const checkMessage = async (currentMessage) => {
    const messageIndex = messages.findIndex(message => message._id === currentMessage._id);
    console.log('messageIndex', messageIndex);
    console.log('Message', messages);
    console.log('messages', messageIndex);
    console.log('currentMessage', currentMessage.user._id);
    console.log('currentUserId', currentUserId);
  
    // Kiểm tra xem người gửi tin nhắn có phải là người dùng hiện tại hay không
    if (currentMessage.user._id !== currentUserId) {
      // Hiển thị thông báo khi người dùng cố gắng thu hồi tin nhắn của mình
      closeModal();
      return Alert.alert('Thông báo', 'Bạn không thể thu hồi tin nhắn của người khác.');
    }
  
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
  
      // Gửi sự kiện thông báo server về việc cập nhật tin nhắn
      socket.emit('retrieveMessages', { roomId, updatedMessages });
  
      // Cập nhật state với danh sách tin nhắn mới đã được cập nhật
      setMessages(updatedMessages);
  
      // Gọi hàm retrieveMessages để lấy tin nhắn mới nhất
      retrieveMessages(currentMessage._id);
  
      // Đóng modal sau khi đã xử lý xong
      closeModal();
    } else {
      console.log('Tin nhắn không tồn tại trong danh sách.');
    }
  };

  const deleteMessage = async (currentMessage) => {

    const messageIndex = messages.findIndex(message => message._id === currentMessage._id);
    console.log('messageIndex', messageIndex);
    console.log('Message', messages);
    console.log('messages', messageIndex);
    console.log('currentMessage', currentMessage._id);

    // Kiểm tra xem tin nhắn có tồn tại trong danh sách không
    if (messageIndex !== -1) {
      // Sao chép tin nhắn cần cập nhật
      const updatedMessage = { ...messages[messageIndex] };
      // Cập nhật nội dung của tin nhắn
      updatedMessage.text = '';
      // Cập nhật các trường image, video, file (nếu cần)
      updatedMessage.image = ''; // Cập nhật hình ảnh
      updatedMessage.video = ''; // Cập nhật video
      updatedMessage.file = ''; // Cập nhật file
      updatedMessage.createdAt = '';
      // Sao chép danh sách tin nhắn và thay thế tin nhắn cũ bằng tin nhắn mới
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = updatedMessage;
      // socket.emit('deleteMessages', { roomId, updatedMessages })
      // Cập nhật state với danh sách tin nhắn mới đã được cập nhật
      setMessages(updatedMessages);
      deleteMessageAPI(currentUserId, currentMessage._id)
      // Log toàn bộ danh sách tin nhắn đã được cập nhật
      // console.log('Updated Messages:', updatedMessages);
      closeModal();
    } else {
      console.log('Tin nhắn không tồn tại trong danh sách.');
    }
  }


  // ---------------------------
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 70, width: '100%', backgroundColor: '#76ABAE', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack(), socket.emit('leaveRoom', roomId); }} />
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{route.params.item.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', widthL: '50%' }}>
          <IconButton size={25} iconColor='white' icon="phone" onPress={() => { }} />
          <IconButton size={28} iconColor='white' icon="video-outline" onPress={() => { }} />
          <IconButton size={30} iconColor='white' icon="menu-open" onPress={() => { navigation.navigate('ChatInformation', {roomId: roomId, item: route.params.item}) }} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableRipple onPress={closeModal} style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '10%'
            }}>
              <TouchableOpacity onPress={() => {deleteMessage(currentMessage)}} style={{ alignItems: 'center', width: '25%' }}>
                <IconButton icon="delete" />
                <Text>Xoá</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => checkMessage(currentMessage)} style={{ alignItems: 'center', width: '25%' }}>
                <IconButton icon="undo" />
                <Text>Thu hồi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('forwardMessages', { id: currentMessage._id }), closeModal()}} style={{ alignItems: 'center', width: '25%' }}>
                <IconButton icon="forward" />
                <Text>Chuyển tiếp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Sao chép')} style={{ alignItems: 'center', width: '25%' }}>
                <IconButton icon="content-copy" />
                <Text>Sao chép</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableRipple>
      </Modal>
    </View>
  );
};

export default NewMessageScreen;
