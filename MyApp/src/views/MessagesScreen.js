// MessageScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectChat, getListChats} from '../redux/chatSlice';
import { listChats } from '../api/getListChats';
import CustomHeader from '../components/CustomHeader';
import {Searchbar} from 'react-native-paper';
import { socket } from '../socket/socket';
import { showMessage, hideMessage } from "react-native-flash-message";
const MessageScreen = ({navigation}) => {
  const id = useSelector(state => state.auth.user._id);
  const [list, setList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.on('receiveNotification', (data) => {
      showMessage({
        message: data,
        description: "This is our second message",
        type: "success",
      })
    });
    socket.emit('userOnline',id);
    socket.emit('listOnlineUsers');
    // Lắng nghe sự kiện 'onlineUsers' từ máy chủ và cập nhật trạng thái của danh sách người dùng trực tuyến
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.disconnect(); 
    }; 
  }, []);

  console.log("onlineUsers",onlineUsers);

 
  useEffect(() => {
    listChats(id).then(data => {
      dispatch(getListChats(data));
      setList(data);
    });
  }, []);
  //---------------------------

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

  // useEffect(() => {
  //   // Gửi sự kiện lấy danh sách cuộc trò chuyện đến server
  //   socket.emit('getRoomList', currentUserId);
  // }, [socket]);

  const handleChatRoomPress = (roomId, item) => {
    // Điều hướng đến màn hình phòng chat với roomId tương ứng
    navigation.navigate('NewMessageScreen', { roomId, currentUserId, item });
  };

  //---------------------------
  
  console.log("list",list);

  const dispatch = useDispatch();
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
    dispatch(selectChat({id: chatId, name: chatName}));
    // Navigate to ChatScreen
    navigation.navigate('NewMessageScreen');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleChatRoomPress(item._id,item)}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.avatar}}
          style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}
        />
        <View>
          <Text style={{fontWeight: 700}}>{item.name}</Text>
          <Text>Message - Time</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white', width: '100%'}}>
      {/* <FlashMessageManager /> */}
      <CustomHeader
        title="Chats"
        leftIcon="menu"
        leftIconPress={handleMenu}
        rightIcon="plus"
        rightIconPress={handleEdit}
      />

      <View style={{marginVertical: 10}}>
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
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default MessageScreen;

