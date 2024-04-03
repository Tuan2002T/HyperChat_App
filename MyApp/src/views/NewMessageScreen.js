import React, { useEffect, useState } from 'react';
import { GiftedChat, Avatar, Day } from 'react-native-gifted-chat';
import { socket } from '../socket/socket';

const NewMessageScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUserId = route.params.currentUserId;
  const roomId = route.params.roomId;

  useEffect(() => {
    socket.emit('joinRoom', roomId);
    socket.on('receiveMessage', (data) => {
      const { message, senderId, createdAt } = data;
      setMessages((previousMessages) => {
        const existingMessage = previousMessages.find(
          (msg) => msg.text === message && msg.user._id === senderId
        );

        if (!existingMessage) {
          return GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(36).substring(7),
              text: message,
              createdAt: new Date(createdAt), // Sử dụng thời gian createdAt từ server
              user: {
                _id: senderId,
                avatar: 'https://example.com/avatar.png',
              },
            },
          ]);
        }

        return previousMessages;
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    const { text, createdAt } = newMessages[0];
    socket.emit('sendMessage', {
      roomId,
      message: text,
      senderId: currentUserId,
      createdAt: createdAt.getTime(), // Gửi thời gian createdAt cho server
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: currentUserId,
        avatar: 'https://example.com/currentUserAvatar.png',
      }}
      renderAvatar={renderAvatar}
      renderDay={renderDay}
    />
  );
};

export default NewMessageScreen;