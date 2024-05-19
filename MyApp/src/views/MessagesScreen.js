// MessageScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { selectChat, getListChats } from '../redux/chatSlice';
import { listChats } from '../api/getListChats';
import CustomHeader from '../components/CustomHeader';
import { Searchbar, Menu, Divider } from 'react-native-paper';
import { socket } from '../socket/socket';

import { showMessage, hideMessage } from "react-native-flash-message";
import { findChatGroupById } from '../api/chatGroup';
const MessageScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.user.users); // Access the user list from Redux store

  const id = useSelector(state => state.auth.user._id);
  const [list, setList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    socket.on('addAdminChatGroup', (data) => {
      let members = '';
      data.members.forEach((member) => {
        members += users.find((user) => user._id === member).fullname;
      });
      listChats(id).then(d => {
        d.forEach((item) => {
          if (item._id === data.roomId) {
            showMessage({
              message: 'Người dùng ' + members + ' đã được bổ nhiệm làm admin nhóm ' + item.name,
              type: "success",
            })
          }
        });
      });
      // showMessage({
      //   message: 'Người dùng ' + members + ' đã được bổ nhiệm làm admin nhóm ',
      //   type: 'success',
      // });
    });

    socket.on('deleteAdminChatGroup', (data) => {
      let members = '';
      data.members.forEach((member) => {
        members += users.find((user) => user._id === member).fullname;
      });
      listChats(id).then(d => {
        d.forEach((item) => {
          if (item._id === data.roomId) {
            showMessage({
              message: 'Người dùng ' + members + ' đã bị thu hồi quyền admin nhóm ' + item.name,
              type: "success",
            })
          }
        });
      });
      // showMessage({
      //   message: 'Người dùng ' + members + ' đã được bổ nhiệm làm admin nhóm ',
      //   type: 'success',
      // });
    });
  }, []);


  useEffect(() => {
    socket.on('addChatGroupForMember', (data) => {
      findChatGroupById(data).then(d => {
        setList(prevList => [...prevList, d]);
      }

      );
      showMessage({
        message: 'Bạn đã được thêm vào nhóm chat' + data,
      })
    });
    socket.on('deleteChatGroupForMember', (roomId) => {
      setList(prevList => prevList.filter(item => item._id !== roomId));
      showMessage({
        message: 'Bạn đã bị xóa khỏi nhóm chat ' + roomId,
      });
    });
    socket.on('outedGroup', (data) => {
      console.log('data6666666666666666666666666666666666666666666', data);
      setList(prevList => prevList.filter(item => item._id !== data));
      showMessage({
        message: 'Bạn đã rời khỏi nhóm chat ' + data.roomId,
        type: 'success',
      });
    });

    socket.on('deletedGroupForMember', (data) => {
      const { roomId, name } = data;
      setList(prevList => prevList.filter(item => item._id !== roomId));
      
      showMessage({
        message: 'Nhóm chat ' + name + ' đã bị xóa',
        type: 'success',
      });
    });
    socket.on('createdGroup', (data) => {
      setList(prevList => [...prevList, data]);
      showMessage({
        message: 'Nhóm chat ' + data.name + ' đã được tạo',
        type: 'success',
      });
    });
  }, []);

  // console.log("list", list);
  useEffect(() => {
    socket.on('receiveNotification', (data) => {
      const {senderId, roomId, createdAt} = data;
      // handleNewMessage(roomId, createdAt);
      const notification = 'Bạn có tin nhắn mới từ '+ users.find((user) => user._id === senderId).fullname;
      listChats(id).then(data => {
        data.forEach((item) => {
          if (item._id === roomId) {
            showMessage({
              message: notification,
              description: 'Từ : ' + item.name,
              type: "success",
            })
          }
        });
      });
    });
    socket.on('sortChat', (data) => {
      const {senderId, roomId, createdAt} = data;
      handleNewMessage(roomId, createdAt);
    })
    if (id) {
      socket.emit('userOnline', id);
      socket.emit('listOnlineUsers');

      // Lắng nghe sự kiện 'onlineUsers' từ máy chủ và cập nhật trạng thái của danh sách người dùng trực tuyến
      socket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });
    }

  }, []);

  console.log("onlineUsers", onlineUsers);


  useEffect(() => {
    listChats(id).then(data => {
      dispatch(getListChats(data));
      setList(data);
    });
  }, []);


  const currentUserId = useSelector(state => state.auth.user._id);
  const [conversationList, setConversationList] = useState(list);

  useEffect(() => {
    // Lắng nghe sự kiện nhận danh sách cuộc trò chuyện từ server
    socket.on('roomList', (rooms) => {
      setConversationList(rooms);
    });

    // Cleanup khi component unmount
    return () => {
      socket.off('roomList');
    };
  }, []);

  const handleChatRoomPress = (roomId, item) => {
    // Điều hướng đến màn hình phòng chat với roomId tương ứng
    console.log('item', item);
    if (item.admin) {
      navigation.navigate('messageChatGroup', { roomId, currentUserId, item });
    }
    else {
      navigation.navigate('NewMessageScreen', { roomId, currentUserId, item });
    }
  };
  const [searchText, setSearchText] = useState('');
  const chats = useSelector(state => state.chat.chats);

  const handleMenu = () => {
    navigation.navigate('SettingScreen');
    console.log('Menu');
  };

  const handleEdit = () => {
    console.log('Edit');
    // dispatch any edit action if needed
    navigation.navigate('SubChatScreen');
  };

  const handleChatPress = (chatId, chatName) => {
    dispatch(selectChat({ id: chatId, name: chatName }));
    // Navigate to ChatScreen
    navigation.navigate('NewMessageScreen');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => { setVisible(true); setSelectedItem(item); }}
      onPress={() => handleChatRoomPress(item._id, item)}
    >
      <View style={{ padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
        <View>
          <Text style={{ fontWeight: 700 }}>{item.name}</Text>
          <Text>Message - Time</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredChats = list.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const sortedFilteredChats = filteredChats.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const handleNewMessage = (roomId, createdAt) => {  
    listChats(id).then(data => {
      data.forEach((item, index) => {
        if (item._id === roomId) {
          data[index].updatedAt = createdAt  
          console.log('data', data[index].updatedAt, 'createdAt', createdAt);
        }
      });
      setList(data);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
      <CustomHeader
        title="Chats"
        leftIcon="menu"
        leftIconPress={handleMenu}
        rightIcon="plus"
        rightIconPress={handleEdit}
      />

      <View style={{ marginVertical: 10 }}>
        <Searchbar
          style={{
            marginHorizontal: '5%',
            borderWidth: 1,
            borderColor: '#76ABAE',
            backgroundColor: 'white',
          }}
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <FlatList
        data={sortedFilteredChats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <Menu
        style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text></Text>
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={handleEdit} title="Edit" />
        <Divider />
        <Menu.Item onPress={() => { /* handle other actions */ }} title="Other Action" />
      </Menu>
    </View>
  );
};

export default MessageScreen;

