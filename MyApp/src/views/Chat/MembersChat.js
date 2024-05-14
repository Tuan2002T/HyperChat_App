import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addFriend, allFriendRequestSent, getAllSendFriendRequest, getRequests } from '../../api/allUser';
import { addAdminToChatGroup, addMembersToChatGroup, deleteAdminToChatGroup, deleteMembersChatGroup, findChatGroupById } from '../../api/chatGroup';
import { chatGroup } from '../../redux/chatSlice';
import { socket } from '../../socket/socket';
import { showMessage } from 'react-native-flash-message';

const MembersChat = ({ navigation, route }) => {
    const users = useSelector(state => state.user.users); // Access the user list from Redux store
    const id = useSelector(state => state.auth.user._id);
    const currentUser = useSelector(state => state.auth.user);
    const [listMember, setListMember] = useState([]);
    const members = useSelector(state => state.chat.chat.members);
    const [friendSent, setFriendSent] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);
    let chat1 = useSelector(state => state.chat.chat);
    const [chat, setChat] = useState(chat1);
    const dispatch = useDispatch();
    useEffect(() => {
        findChatGroupById(chat1._id).then(data => {
            dispatch(chatGroup(data));
        });
        socket.on('addAdminChatGroupForMember', (data) => {
            setChat(data);
        })
        socket.on('deleteAdminChatGroupForMember', (data) => {
            setChat(data);
        });
        const liss = []
        socket.on('addChatGroupForMemberShow', (data) => {
            members.forEach(member => {
                const user = users.find(user => user._id === member);
                liss.push(user);
            });
            data.forEach(d => {
                const us = users.find(user => user._id === d);
                liss.push(us);
            }
            );
            setListMember(liss);
        });
        socket.on('deleteChatGroupForMemberShow', (data) => {
            console.log('datadekekekekekekekekek', data);
            const lisss = listMember.filter(member => member._id !== data[0]);
            setListMember(lisss);
        });
        
        allFriendRequestSent(id).then(data => setFriendSent(data));
        getAllSendFriendRequest(id).then(data => setFriendRequest(data));
        const listMember = [];
        members.forEach(member => {
            const user = users.find(user => user._id === member);
            listMember.push(user);
        });
        setListMember(listMember);
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentU, setCurrentU] = useState({});
    const toggleModal = (currentMessage) => {
        setModalVisible(true);
        setCurrentU(currentMessage);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const isFriend = (userId) => {
        // Hàm kiểm tra xem userId có phải là bạn của currentUser không
        return currentUser.friends.includes(userId);
    };
    const isFriendSent = (userId) => {
        // Hàm kiểm tra xem userId có phải là người đã gửi lời mời kết bạn cho currentUser không
        return friendSent.some(sent => sent.receiver === userId);
    };
    const isFriendRequest = (userId) => {
        // Hàm kiểm tra xem userId có phải là người nhận lời mời kết bạn từ currentUser không
        return friendRequest.some(sent => sent.sender === userId);
    };
    const handleInviteFriend = async friendId => {
        console.log('Invite friend:', friendId);
        try {
            const res = await addFriend(currentUser._id, friendId);
            console.log('Invite friend:', res);
        } catch (error) {
            console.error('Error caught:', error);
        }
    };

    const addAdmin = async (current, chatGroupId) => {
        if (chat.admin.includes(current._id)) {
            Alert.alert('Người này đã là admin rồi');
        } else if (current._id === currentUser._id) {
            Alert.alert('Bạn không thể tự thêm mình làm admin');
        } else if (!chat.admin.includes(currentUser._id)) {
            Alert.alert('Bạn không phải admin của nhóm này');
        } else {
            const res = await addAdminToChatGroup(
                chatGroupId,
                currentUser._id,
                current._id,
                currentUser.token
            );

            Alert.alert(
                'Thông báo',
                'Thêm admin thành công',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );
            const add = await findChatGroupById(chatGroupId).then(data => {
                dispatch(chatGroup(data));
                socket.emit('addAdmin', {roomId:chatGroupId, members : [current._id], chat: data});
            });
            // socket.emit('addAdmin', {roomId:chatGroupId, members : [current._id], chat: add});
        }

    };

    const retriveAdmin = async (current, chatGroupId) => {
        if (!chat.admin.includes(current._id)) {
            Alert.alert('Người này không là phải admin');
        } else if (!chat.admin.includes(currentUser._id)) {
            Alert.alert('Bạn không phải admin của nhóm này');
        } else {
            const res = await deleteAdminToChatGroup(
                chatGroupId,
                currentUser._id,
                current._id,
                currentUser.token
            );

            Alert.alert(
                'Thông báo',
                'Xoá admin thành công',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );

            await findChatGroupById(chatGroupId).then(data => {
                dispatch(chatGroup(data));
                socket.emit('deleteAdmin', {roomId:chatGroupId, members : [current._id], chat: data});
            });
        }

    }

    const deleteMember = async (current, chatGroupId) => {

        if (current._id === currentUser._id) {
            Alert.alert('Bạn không thể tự xoá mình');
        }
        else if (!chat.members.includes(current._id)) {
            Alert.alert('Người này không phải thành viên của nhóm');
        } else if (!chat.admin.includes(currentUser._id)) {
            Alert.alert('Bạn không phải admin của nhóm này');
        } else {
            const res = await deleteMembersChatGroup(
                current._id,
                chatGroupId,
                currentUser._id,
                currentUser.token
            );

            Alert.alert(
                'Thông báo',
                'Xoá thành viên thành công',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );
            socket.emit('deleteMemberChatGroup', { roomId: chatGroupId, members: [current._id] });
            await findChatGroupById(chatGroupId).then(data => {
                console.log('dataCấndasdasdasdasdasdasd', data);
                dispatch(chatGroup(data));
            });
        }
    }


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#149AFD',
                width: '100%',
                height: '7%',
                marginBottom: 20
            }}>
                <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack() }} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Thành viên</Text>
            </View>

            <FlatList
                style={{ width: '100%' }}
                data={listMember}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={() => toggleModal(item)}
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            marginBottom: 10,
                            padding: 10,
                        }}
                    >
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={{ uri: item.avatar }}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 10,
                            }}
                        >
                            {item.fullname}
                        </Text>
                        {!isFriend(item._id) ? (
                            <IconButton
                                onPress={() => console.log('Thêm thành viên')}
                                icon="account-plus"
                                color="black"
                                size={25}
                                style={{ position: 'absolute', right: 20 }}
                            />
                        ) : null}
                    </TouchableOpacity>
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
                            borderRadius: 20,
                            height: '20%'
                        }}>
                            <TouchableOpacity onPress={() => { addAdmin(currentU, route.params.item._id) }} style={{ alignItems: 'center', width: '100%', flexDirection: 'row', alignContent: 'center' }}>
                                <IconButton icon="account-arrow-up-outline" size={30} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                >Bổ nhiệm lên cùng làm trưởng nhóm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { retriveAdmin(currentU, route.params.item._id) }} style={{ alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                                <IconButton icon="account-arrow-down-outline" size={30} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                >Thu hồi quyền trưởng nhóm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { deleteMember(currentU, route.params.item._id) }} style={{ alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                                <IconButton icon="close-box-outline" size={25} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                >Xoá khỏi nhóm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableRipple>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        alignItems: 'center', width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MembersChat;