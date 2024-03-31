// MessageScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectChat} from '../redux/chatSlice';
import CustomHeader from '../components/CustomHeader';
import {Searchbar} from 'react-native-paper';

const MessageScreen = ({navigation}) => {
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
  };

  const handleChatPress = (chatId, chatName) => {
    dispatch(selectChat({id: chatId, name: chatName}));
    // Navigate to ChatScreen
    navigation.navigate('NewMessageScreen');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleChatPress(item.id, item.name)}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={item.image}
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
      <CustomHeader
        title="Chats"
        leftIcon="menu"
        leftIconPress={handleMenu}
        rightIcon="pencil"
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
        data={filteredChats}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default MessageScreen;
