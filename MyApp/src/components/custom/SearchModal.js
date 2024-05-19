import React, {useState} from 'react';
import {Button, Dialog, Portal, Searchbar} from 'react-native-paper';
import {View, FlatList, Image, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {addFriend} from '../../api/allUser';
import {socket} from '../../socket/socket';


const SearchModal = ({visible, title, hideDialog}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);

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
    console.log('Invite friend:', me._id, 'to', userId);
    try {
      socket.emit('sendFriendRequest', {
        senderId: me._id,
        receiverId: userId,
      });
      const res = await addFriend(me._id, userId);
      console.log('Invite friend:', res);
      showMessage({
        message: 'Add new friend!',
        description: 'Add new friend successfully!',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Add new friend!',
        description: 'Add new friend failed!',
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
                    <Button
                      style={styles.acceptButton}
                      labelStyle={styles.acceptButtonText}
                      mode="contained"
                      onPress={() => inviteFriend(item._id)}>
                      Invite
                    </Button>
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
  acceptButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: 'green',
  },
  acceptButtonText: {
    color: 'green',
  },
  denyButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 5,
  },
  denyButtonText: {
    color: 'red',
  },
  unfriendButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 'auto',
  },
  unfriendButtonText: {
    color: 'red',
  },
  inviteButton: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: '#76ABAE',
    marginLeft: 'auto',
  },
  inviteButtonText: {
    color: '#76ABAE',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchbar: {
    marginHorizontal: '5%',
    borderWidth: 1,
    borderColor: '#76ABAE',
    backgroundColor: 'white',
  },
});

export default SearchModal;
