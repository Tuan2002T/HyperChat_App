import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addFriend, allFriendRequestSent, getAllSendFriendRequest, getRequests } from '../../api/allUser';

const MembersChat = ({ navigation, route }) => {
    const users = useSelector(state => state.user.users); // Access the user list from Redux store
    const id = useSelector(state => state.auth.user._id);
    const currentUser = useSelector(state => state.auth.user);
    const [listMember, setListMember] = useState([]);
    const members = useSelector(state => state.chat.chat.members);
    const [friendSent, setFriendSent] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);

    useEffect(() => {
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
    const toggleModal = () => {
        setModalVisible(true);
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
                        onLongPress={() => toggleModal()}
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
                        {friendRequest.some(sent => sent.receiver === item._id) ? (
                            <IconButton
                                icon="account-arrow-left"
                                color="black"
                                size={25}
                                style={{ position: 'absolute', right: 20 }}
                            />
                        ) : friendSent.some(sent => sent.sender === item._id) ? (
                            <IconButton
                                icon="account-arrow-right"
                                color="black"
                                size={25}
                                style={{ position: 'absolute', right: 20 }}
                            />
                        ) : !isFriend(item._id) ? (
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
                            <TouchableOpacity onPress={() => { console.log('Bổ nhiệm') }} style={{ alignItems: 'center', width: '100%', flexDirection: 'row', alignContent: 'center' }}>
                                <IconButton icon="account-arrow-up-outline" size={30} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                >Bổ nhiệm lên cùng làm trưởng nhóm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Thu hồi')} style={{ alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                                <IconButton icon="account-arrow-down-outline" size={30} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                >Thu hồi quyền trưởng nhóm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log('Xoá khỏi nhóm') }} style={{ alignItems: 'center', width: '100%', flexDirection: 'row' }}>
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
        alignItems: 'center',width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MembersChat;