<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChatGroup, findChatGroupById, notificationMessage, outChatGroup } from '../api/chatGroup';
import { chatGroup, getListChats } from '../redux/chatSlice';
import { socket } from '../socket/socket';
import { listChats } from '../api/getListChats';

const ChatInformation = ({ navigation, route }) => {
    const users = useSelector(state => state.user.users); // Access the user list from Redux store
    const user = useSelector(state => state.auth.user);
    const id = useSelector(state => state.auth.user._id);
    const a = useSelector(state => state.chat.chat);
    const [chat, setChat] = useState(a);
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    useEffect(() => {
        findChatGroupById(route.params.item._id).then(data => {
            dispatch(chatGroup(data));
        });
    }, []);
=======
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteChatGroup,
  findChatGroupById,
  outChatGroup,
} from '../api/chatGroup';
import {chatGroup, getListChats} from '../redux/chatSlice';
import {socket} from '../socket/socket';
import {listChats} from '../api/getListChats';

const ChatInformation = ({navigation, route}) => {
  const users = useSelector(state => state.user.users); // Access the user list from Redux store
  const id = useSelector(state => state.auth.user._id);
  const a = useSelector(state => state.chat.chat);
  const [chat, setChat] = useState(a);
  const currentUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    findChatGroupById(route.params.item._id).then(data => {
      dispatch(chatGroup(data));
    });
  }, []);
>>>>>>> bbf0fc53b72a4d9eaf8f3447a09bf4fe3a118e61

    const outChat = async (chatGroupId, userId, token) => {
        // Hiển thị hộp thoại xác nhận
        findChatGroupById(chatGroupId).then(data => {
            if (data.admin.length <= 1 && data.admin.includes(userId)) {
                return Alert.alert('Bạn phải bổ nhiệm admin trước khi rời nhóm');
            }
        });
        // if(chat.admin.length <= 1 && chat.admin.includes(userId)){
        //     Alert.alert('Bạn phải bổ nhiệm admin trước khi rời nhóm');
        // }
        // else{
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn rời nhóm chat không?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: async () => {
                        // Nếu người dùng chọn "Có", thực hiện hành động rời nhóm chat
                        await outChatGroup(chatGroupId, userId, token);
                        await notificationMessage(chatGroupId, userId, `${user.fullname} đã rời nhóm`, user.token);
                        socket.emit('sendNotification',
                            {
                                roomId: chatGroupId,
                                senderId: user._id,
                                text: user.fullname + 'đã rời nhóm'
                            })
                        socket.emit('outGroup', { roomId: chatGroupId, currentId: userId });
                        await listChats(userId, token).then((data) => {
                            dispatch(getListChats(data));
                        });
                        navigation.navigate('Chats');
                    },
                },
            ],
            { cancelable: true }
        );
        // }
    };


    const deleteChat = async (chatGroup, userId, token) => {
        // Hiển thị hộp thoại xác nhận

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa nhóm chat không?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: async () => {
                        // Nếu người dùng chọn "Có", thực hiện hành động xóa nhóm chat
                        if (chat.admin.includes(userId)) {

                            socket.emit('deleteGroup', { roomId: chatGroup, name: a.name });
                            await deleteChatGroup(chatGroup, userId, token);
                            await listChats(userId, token).then((data) => {
                                dispatch(getListChats(data));
                            });
                            navigation.navigate('Chats');
                        }
                        else {
                            Alert.alert('Bạn không phải là admin của nhóm');
                        }
                    },
                },
            ],
            { cancelable: true }
        );

    };

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // padding: 10,
                backgroundColor: '#149AFD',
                width: '100%',
                height: '7%',
                marginBottom: 20
            }}>
                <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack() }} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Tuỳ chọn</Text>
            </View>
            <View style={{ alignItems: 'center', width: '100%', backgroundColor: 'white', marginBottom: 10 }} >
                <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={{ uri: route.params.item.avatar }} />
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{route.params.item.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '70%',
                }}>
                    <IconButton
                        icon="message"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút tin nhắn
                        }}
                    />

                    <IconButton
                        icon="account-multiple-plus"
                        color="white"
                        size={30}
                        style={styles.actionButton}
                        onPress={() => {
                            navigation.navigate('AddMembersGroup', { item: route.params.item })
                        }}
                    />

                    <IconButton
                        icon="phone"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút cuộc gọi
                        }}
                    />

                    <IconButton
                        icon="dots-vertical"
                        color="white"
                        size={25}
                        style={styles.actionButton}
                        onPress={() => {
                            // Xử lý sự kiện khi nhấn vào nút tùy chọn
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => { navigation.navigate('MediaMessage', { roomId: route.params.roomId }) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="folder-multiple-image" color="black" size={25} />
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold' }}>Ảnh, File, Video ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('MembersChat', { roomId: route.params.roomId, item: route.params.item }) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="account-group" color="black" size={25} />
                    <Text style={{ color: 'gray', fontSize: 15, fontWeight: 'bold' }}>Thành viên</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { deleteChat(route.params.item._id, currentUser._id, currentUser.token) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="delete-sweep-outline" color="black" size={25} />
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Giản tán nhóm</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity

                onPress={() => { outChat(route.params.item._id, currentUser._id, currentUser.token) }}
                style={{ width: '100%', marginBottom: 10, backgroundColor: 'white', height: '6%', justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="exit-to-app" color="black" size={25} />
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rời nhóm</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  };

  const deleteChat = async (chatGroup, userId, token) => {
    // Hiển thị hộp thoại xác nhận

    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa nhóm chat không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            // Nếu người dùng chọn "Có", thực hiện hành động xóa nhóm chat
            if (chat.admin.includes(userId)) {
              socket.emit('deleteGroup', {roomId: chatGroup});
              await deleteChatGroup(chatGroup, userId, token);
              await listChats(userId, token).then(data => {
                dispatch(getListChats(data));
              });
              navigation.navigate('Chats');
            } else {
              Alert.alert('Bạn không phải là admin của nhóm');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // padding: 10,
          backgroundColor: '#149AFD',
          width: '100%',
          height: '7%',
          marginBottom: 20,
        }}>
        <IconButton
          size={30}
          iconColor="white"
          icon="arrow-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          Tuỳ chọn
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 10,
        }}>
        <Image
          style={{width: 150, height: 150, borderRadius: 100}}
          source={{uri: route.params.item.avatar}}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {route.params.item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '70%',
          }}>
          <IconButton
            icon="message"
            color="white"
            size={25}
            style={styles.actionButton}
            onPress={() => {
              // Xử lý sự kiện khi nhấn vào nút tin nhắn
            }}
          />

          <IconButton
            icon="account-multiple-plus"
            color="white"
            size={30}
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate('AddMembersGroup', {item: route.params.item});
            }}
          />

          <IconButton
            icon="phone"
            color="white"
            size={25}
            style={styles.actionButton}
            onPress={() => {
              // Xử lý sự kiện khi nhấn vào nút cuộc gọi
            }}
          />

          <IconButton
            icon="dots-vertical"
            color="white"
            size={25}
            style={styles.actionButton}
            onPress={() => {
              // Xử lý sự kiện khi nhấn vào nút tùy chọn
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MediaMessage', {roomId: route.params.roomId});
        }}
        style={{
          width: '100%',
          marginBottom: 10,
          backgroundColor: 'white',
          height: '6%',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton icon="folder-multiple-image" color="black" size={25} />
          <Text style={{color: 'gray', fontSize: 15, fontWeight: 'bold'}}>
            Ảnh, File, Video ...
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MembersChat', {
            roomId: route.params.roomId,
            item: route.params.item,
          });
        }}
        style={{
          width: '100%',
          marginBottom: 10,
          backgroundColor: 'white',
          height: '6%',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton icon="account-group" color="black" size={25} />
          <Text style={{color: 'gray', fontSize: 15, fontWeight: 'bold'}}>
            Thành viên
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          deleteChat(route.params.item._id, currentUser._id, currentUser.token);
        }}
        style={{
          width: '100%',
          marginBottom: 10,
          backgroundColor: 'white',
          height: '6%',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton icon="delete-sweep-outline" color="black" size={25} />
          <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
            Giản tán nhóm
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          outChat(route.params.item._id, currentUser._id, currentUser.token);
        }}
        style={{
          width: '100%',
          marginBottom: 10,
          backgroundColor: 'white',
          height: '6%',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton icon="exit-to-app" color="black" size={25} />
          <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
            Rời nhóm
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatInformation;
