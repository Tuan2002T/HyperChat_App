import React, {useEffect, useState} from 'react';
import {Button, Dialog, Portal, Searchbar} from 'react-native-paper';
import {View, FlatList, Image, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {addFriend, removeFriend, getMyFriends} from '../../api/allUser'; // Assuming you have a removeFriend function
import {socket} from '../../socket/socket';

const SearchModal = ({visible, title, hideDialog}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedUsers, setInvitedUsers] = useState({});
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);

  useEffect(() => {
    if (visible) {
      // Fetch the list of friends when the modal is opened
      const fetchFriends = async () => {
        try {
          const friends = await getMyFriends(me._id, me.token);
          const invited = {};
          friends.forEach(friend => {
            invited[friend._id] = true;
          });
          setInvitedUsers(invited);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };
      fetchFriends();
    }
  }, [visible]);

  const onChangeSearch = query => setSearchQuery(query);

  const filteredUsers = users
    .filter(
      user =>
        user._id !== me._id &&
        user.fullname &&
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 4);

  const inviteFriend = async userId => {
      const res = await addFriend(me._id, userId);
      console.log('res', res);
      socket.emit('sendFriendRequest', {
        senderId: me._id,
        receiverId: userId,
      });
      if (res.message === 'Gửi lời mời kết bạn thành công') {
        // socket.emit('sendFriendRequest', {
        //   senderId: me._id,
        //   receiverId: userId,
        // });
        showMessage({
          message: 'Add new friend!',
          description: 'Add new friend successfully!',
          type: 'success',
        });
        setInvitedUsers(prev => ({...prev, [userId]: true}));
      }

      else {
        showMessage({
          message: 'Kết bạn !',
          description: 'Đã gửi lơi mơi kết bạn hoặc đã la bạn bè!',
          type: 'warning',
        });
      }
  };

  const uninviteFriend = async userId => {
    try {
      const res = await removeFriend(me._id, userId); // Assuming you have a removeFriend function
      showMessage({
        message: 'Remove friend!',
        description: 'Remove friend successfully!',
        type: 'success',
      });
      setInvitedUsers(prev => ({...prev, [userId]: false}));
    } catch (error) {
      showMessage({
        message: 'Remove friend!',
        description: 'Remove friend failed!',
        type: 'warning',
      });
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          {searchQuery.length > 0 && (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.userContainer}>
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.fullname}>{item.userName}</Text>
                    <Text style={styles.fullname}>{item.fullname}</Text>
                    <Text style={styles.fullname}>{item.phoneNumber}</Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    {invitedUsers[item._id] ? (
                      <Button
                        style={styles.uninviteButton}
                        labelStyle={styles.uninviteButtonText}
                        mode="contained"
                        onPress={() => uninviteFriend(item._id)}>
                        Uninvite
                      </Button>
                    ) : (
                      <Button
                        style={styles.inviteButton}
                        labelStyle={styles.inviteButtonText}
                        mode="contained"
                        onPress={() => inviteFriend(item._id)}>
                        Invite
                      </Button>
                    )}
                  </View>
                </View>
              )}
            />
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  fullname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  inviteButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: '#76ABAE',
  },
  inviteButtonText: {
    color: '#76ABAE',
  },
  uninviteButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: 'red',
  },
  uninviteButtonText: {
    color: 'red',
  },
});

export default SearchModal;
