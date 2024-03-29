import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const NewMessageScreen = ({ navigation }) => {
  const selectedChat = useSelector(state => state.chat.selectedChat);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSend = () => {
    if (messageText.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, text: messageText, sender: 'me' }]);
      setMessageText('');
      // Gửi tin nhắn đến đối tác trò chuyện
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleBack} style={{ padding: 10 }}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{selectedChat?.name}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start', backgroundColor: item.sender === 'me' ? '#DCF8C6' : '#E5E5EA', borderRadius: 10, padding: 10, marginBottom: 5 }}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        inverted
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8 }}
          placeholder="Type a message"
          value={messageText}
          onChangeText={text => setMessageText(text)}
        />
        <TouchableOpacity onPress={handleSend} style={{ marginLeft: 10, padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewMessageScreen;
