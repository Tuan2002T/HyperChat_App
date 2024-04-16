import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Modal, Alert, SectionList } from 'react-native';
import { Checkbox, IconButton, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { allUsers, getMyFriends } from '../../api/allUser';
import { useDispatch } from 'react-redux';
import { addMembersToChatGroup, findChatGroupById } from '../../api/chatGroup';
import { listChats } from '../../api/getListChats';
import { chatGroup, getListChats } from '../../redux/chatSlice';
import { socket } from '../../socket/socket';

const AddMembersGroup = ({ navigation, route }) => {
  // console.log(route.params.item.members);
  const a = useSelector(state => state.chat.chat);
  const [chat, setChat] = useState(a);
  const [existingMembers, setExistingMembers] = useState(useSelector(state => state.chat.chat.members));
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);
  const currentUser = useSelector(state => state.auth.user);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    socket.on('addAdminChatGroupForMember', (data) => {
      setChat(data);
    })
    socket.on('deleteAdminChatGroupForMember', (data) => {
      setChat(data);
    });
  }, []);

  const toggleItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log('selectedItems', selectedItems);
    }
  }, [selectedItems]);

  console.log('selectItem', selectedItems);

  const [listFriends, setListFriends] = useState([]);

  useEffect(() => {
    getMyFriends(currentUser._id, currentUser.token).then(data => setListFriends(...listFriends, data));
  }, []);

  console.log('listFriends', existingMembers);

  const addMembers = async (members, chatGroupId, userId, token) => {
    if (chat.admin.includes(userId)) {
      await addMembersToChatGroup(members, chatGroupId, userId, token)
      socket.emit('addMemberChatGroup', { roomId: chatGroupId, members: members });
      await findChatGroupById(chatGroupId).then(data => {
        console.log('data', data);
        dispatch(chatGroup(data));
      });
      Alert.alert('Thêm thành công', 'Bạn đã thêm thành viên vào nhóm thành công', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    }
    else {
      Alert.alert('Bạn không phải là admin của nhóm');
    }
  };

  const filteredData = [...listFriends, ...users].filter(item => {
    const isFriend = listFriends.some(friend => friend._id === item._id);
    return (
      item._id !== me._id &&
      !isFriend &&
      (item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const sections = [
    { title: 'Tìm kiếm', data: filteredData },
    { title: 'Bạn bè', data: listFriends },
  ];



  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#149AFD', width: '100%', height: '7%', marginBottom: 20 }}>
        <IconButton size={30} iconColor='white' icon="arrow-left" onPress={() => { navigation.goBack() }} />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Thêm vào nhóm</Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} >
        <TextInput onChangeText={setSearchQuery} value={searchQuery} style={{ width: '90%', height: 50, borderRadius: 100, backgroundColor: '#F3F6F6', paddingLeft: 50 }} />
        <IconButton size={30} iconColor='#cfcfcfcf' icon="account-search-outline" style={{ position: 'absolute', left: 20 }} />
      </View>
      {/* <FlatList
        style={{ width: '100%' }}
        data={listFriends}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginBottom: 10, padding: 10 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.avatar }} />
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{item.fullname}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {existingMembers.includes(item._id) ? (
                <Text style={{ color: 'green' }}>Đã tham gia</Text>
              ) : (
                <Checkbox
                  status={selectedItems.includes(item._id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleItem(item._id)}
                />
              )}
            </View>
          </View>
        )}
      /> */}
      <SectionList
        style={{ width: '100%', marginTop: 20 }}
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginBottom: 10, padding: 10 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.avatar }} />
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{item.fullname}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {existingMembers.includes(item._id) ? (
                <Text style={{ color: 'green' }}>Đã tham gia</Text>
              ) : (
                <Checkbox
                  status={selectedItems.includes(item._id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleItem(item._id)}
                />
              )}
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>{title}</Text>
        )}
      />
      {selectedItems.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('Thêm thành công');
            addMembers(selectedItems, route.params.item._id, currentUser._id, currentUser.token)
          }}
          style={{ width: '100%' }}>
          <View style={{ width: '100%', height: 50, backgroundColor: '#149AFD', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Gửi</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddMembersGroup;