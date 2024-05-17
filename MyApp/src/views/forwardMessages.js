import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
import { getMyFriends } from '../api/allUser';
import { listChats, createNewChat } from '../api/getListChats';
import { getListChats } from '../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { forwardMessageAPI, forwardMessageAPIGroup } from '../api/Message';
import { socket } from '../socket/socket';
import { showMessage } from 'react-native-flash-message';

const ForwardMessages = ({ navigation, route }) => {

  useEffect(() => {
    socket.on('receiveNotification', (data) => {
      showMessage({
        message: data,
        description: "This is our second message",
        type: "success",
      })
    });
  }, []);

  const me = useSelector(state => state.auth.user);

  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentMessages, setSentMessages] = useState({});

  const dispatch = useDispatch();

  const id = useSelector(state => state.auth.user._id);
  const [list, setList] = useState([]);
  console.log("Routttttttttt", route.params.id);

  useEffect(() => {
    listChats(id).then(data => {
      dispatch(getListChats(data));
      setList(data);
    });
  }, []);

  const getFileExtensionFromUrl = (url) => {
    // Tách phần mở rộng từ URL và chuyển đổi thành chữ thường
    const parts = url.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    return extension;
  };

  const handleCreateChat = async (friendId, chat) => {
    console.log('Chacacscsc', chat);
    socket.emit('listRooms');
    socket.on('rooms', (data) => {
      let found = false;
      data.forEach(element => {
        if (element.roomId.includes(friendId) && element.members.includes(id)) {
          console.log('Có rooms');
          found = true;
        }
      });
      if (!found) {
        socket.emit('joinRoom', friendId, chat.members);
      }
    });
  
    try {
      let messageType = 'text';
      let messageContent = '';
      let imageContent = '';
      let videoContent = '';
      let fileContent = '';
      let mes = [];
      if (chat.admin) {
        mes = await forwardMessageAPIGroup(id, friendId, route.params.id);
        console.log("Mess", mes);
      } else {
        mes = await forwardMessageAPI(id, friendId, route.params.id);
        console.log("Mess", mes);
      }
      console.log("Message", mes.text);
      if (mes.files.length > 0) {
        const fileExtension = getFileExtensionFromUrl(mes.files[0]);
        console.log("FileExtension", fileExtension);
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          messageType = 'image';
          messageContent = '';
          imageContent = mes.files[0];
        } else if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
          messageType = 'video';
          messageContent = '';
          videoContent = mes.files[0];
        } else {
          messageType = 'file';
          messageContent = '';
          fileContent = mes.files[0];
        }
      }
      socket.emit('sendMessage', {
        roomId: friendId,
        message: mes.text,
        senderId: id,
        createdAt: new Date().toISOString(),
        image: imageContent,
        video: videoContent,
        file: fileContent,
        messageId: mes.id // Truyền ID của tin nhắn
      });
  
      // Cập nhật trạng thái đã gửi cho mục tương ứng
      const key = `${friendId}-${mes.id}`;
      setSentMessages(prevState => ({
        ...prevState,
        [friendId]: true
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


    const handleCreateChatG = async friendId => {
    try {
      // Gửi tin nhắn
      let messageType = 'text';
      let messageContent = '';
      let imageContent = '';
      let videoContent = '';
      let fileContent = '';
      const mes = await forwardMessageAPI(id, friendId, route.params.id);
      console.log("Message", mes);
      if (mes.files.length > 0) {
        const fileExtension = getFileExtensionFromUrl(mes.files[0]);
        console.log("FileExtension", fileExtension);
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          messageType = 'image';
          messageContent = '';
          imageContent = mes.files[0];
        } else if (['mp4', 'mov', 'avi'].includes(fileExtension)) {
          messageType = 'video';
          messageContent = '';
          videoContent = mes.files[0];
        }
        else {
          messageType = 'file';
          messageContent = '';
          fileContent = mes.files[0];
        }
        console.log('friendId', friendId);
        console.log('mes.text', mes.text);
        console.log('id', id);
        console.log('new Date().toISOString()', new Date().toISOString());
        console.log('imageContent', imageContent);
        console.log('videoContent', videoContent);
        console.log('fileContent', fileContent);
        console.log('mes.id', mes.id);
      }

        socket.emit('sendMessage', {
          roomId: friendId,
          message: mes.text,
          senderId: id,
          createdAt : new Date().toISOString(),
          image: imageContent,
          video: videoContent,
          file: fileContent,
          messageId: mes.id // Truyền ID của tin nhắn
        });
        // Cập nhật trạng thái đã gửi cho mục tương ứng
        setSentMessages(prevState => ({
          ...prevState,
          [friendId]: true
        }));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };


    const renderItem = ({ item }) => (
      <TouchableOpacity>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: '700' }}>{item.name}</Text>
            <Text>Message - Time</Text>
          </View>
          <Button
            style={{
              backgroundColor: null,
              borderWidth: 1,
              borderColor: '#76ABAE',
              marginLeft: 'auto',
            }}
            labelStyle={{ color: '#76ABAE', fontWeight: 'bold' }}
            mode="contained"
            onPress={() => handleCreateChat(item._id, item)}
            disabled={sentMessages[item._id]} // Disable button if message is already sent
          >
            {sentMessages[item._id] ? 'Đã gửi' : 'Gửi'}
          </Button>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <CustomHeader
          title="Chuyển tiếp tin nhắn"
          leftIcon="arrow-left"
          leftIconPress={() => navigation.goBack()}
          rightIcon="account-group"
          rightIconPress={() => console.log('Create group chat')}
        />
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      width: '100%',
    },
  });

  export default ForwardMessages;
