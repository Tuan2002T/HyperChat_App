import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { socket } from '../socket/socket';

const NewMessageScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUserId = route.params.currentUserId;
  const roomId = route.params.roomId;

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (data) => {
      const { message, senderId } = data;
      setMessages(previousMessages => GiftedChat.append(previousMessages, [{
        _id: Math.random().toString(36).substring(7),
        text: message,
        user: {
          _id: senderId,
        },
      }]));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    const { text } = newMessages[0];
    socket.emit('sendMessage', { roomId, message: text, senderId: currentUserId });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: currentUserId,
      }}
    />
  );
};

export default NewMessageScreen;