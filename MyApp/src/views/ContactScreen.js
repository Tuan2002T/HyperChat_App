import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Searchbar, SegmentedButtons} from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
import CustomConfirmDialog from '../components/custom/CustomConfirmDialog';
import {
  acceptRequest,
  denyRequest,
  unFriend,
  getRequests,
  getMyFriends,
} from '../api/allUser';
import {showMessage} from 'react-native-flash-message';
import {socket} from '../socket/socket';
import SearchModal from '../components/custom/SearchModal';
import {setFriends, setFriendRequests} from '../redux/socialSlice';

const ContactScreen = ({navigation}) => {
  const me = useSelector(state => state.social.me);
  const friends = useSelector(state => state.social.friends);
  const requests = useSelector(state => state.social.friendRequests);

  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  useEffect(() => {
    socket.on('acceptedFriendRequest', async data => {
      setTimeout(async () => {
        try {
          const fRes = await getMyFriends(me._id, me.token);
          dispatch(setFriends(fRes));
        } catch (error) {
          console.error('Error fetching friend requests:', error);
        }
      }, 1000);
      showMessage({
        message: data,
        description: 'This is our second message',
        type: 'success',
      });
    });
  }, []);

  useEffect(() => {
    socket.on('undedFriend', async data => {
      setTimeout(async () => {
        try {
          const fRes = await getMyFriends(me._id, me.token);
          dispatch(setFriends(fRes));
        } catch (error) {
          console.error('Error fetching friend requests:', error);
        }
      }, 1000);

    });
  }, []);

  useEffect(() => {
    socket.on('receiveFriendRequest', async data => {
      console.log('Me:', me._id);
      console.log('Receive friend request:', data);

      setTimeout(async () => {
        try {
          const res = await getRequests(me._id);
          console.log('Friend requests:', res);
          dispatch(setFriendRequests(res));
        } catch (error) {
          console.error('Error fetching friend requests:', error);
          // Xử lý lỗi ở đây nếu cần thiết
        }
      }, 1000);

      showMessage({
        message: data,
        description: 'This is our second message',
        type: 'success',
      });
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const handleRightIconPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});
  const [btnType, setBtnType] = useState('');

  useEffect(() => {
    socket.on('receiveNotification', data => {
      showMessage({
        message: data,
        description: 'This is our second message',
        type: 'success',
      });
    });
  }, []);

  const handleNext = async () => {
    hideConfirmDialog();
    if (btnType === 'deny') {
      try {
        const res = await denyRequest(selectedId, me._id);
        const fRRes = await getRequests(me._id);
        dispatch(setFriendRequests(fRRes));
      } catch (error) {
        console.error('Error caught:', error);
      }
    }
    if (btnType === 'remove') {
      socket.emit('unFriend', {senderId: me._id, receiverId: selectedId});

      try {
        const res = await unFriend(selectedId, me._id);
      } catch (error) {
        console.error('Error caught:', error);
      }
      setTimeout(async () => {
        try {
          const fRes = await getMyFriends(me._id, me.token);
          dispatch(setFriends(fRes));
        } catch (error) {
          console.error('Error fetching friend requests:', error);
        }
      }, 1000);
    }
  };

  const showDialog = (title, message) => {
    setDialogMessage({title, message});
    setConfirmVisible(true);
  };

  const hideConfirmDialog = () => {
    setConfirmVisible(false);
  };

  const handleAcceptRequest = async requestId => {
    console.log('Accept request:', requestId);
    try {
      const res = await acceptRequest(requestId, me._id);
      const fRRes = await getRequests(me._id);
      const fRes = await getMyFriends(me._id, me.token);

      dispatch(setFriendRequests(fRRes));
      dispatch(setFriends(fRes));

      console.log('Accept request:', res);
      socket.emit('acceptFriendRequest', {
        senderId: requestId,
        receiverId: me._id,
      });
    } catch (error) {
      console.error('Error caught:', error);
    }
  };

  const handleDenyRequest = async requestId => {
    setSelectedId(requestId);
    setBtnType('deny');
    showDialog('Deny request', 'Do you want to deny this request?');
  };

  const handleRemoveFriend = async friendId => {
    setSelectedId(friendId);
    setBtnType('remove');
    showDialog('Remove friend', 'Do you want to remove this friend?');
  };

  const handleMenu = () => {
    navigation.navigate('SettingScreen');
    console.log('Menu');
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Contacts"
        leftIcon="menu"
        leftIconPress={handleMenu}
        rightIcon="plus"
        rightIconPress={handleRightIconPress}
      />
      <SearchModal
        visible={modalVisible}
        title="Add new friend"
        hideDialog={handleCloseModal}
      />

      <CustomConfirmDialog
        visible={confirmVisible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideConfirmDialog}
        next={handleNext}
      />
      <View style={{marginVertical: 10}}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View style={{paddingHorizontal: '5%'}}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'friends',
              label: 'Friends',
            },
            {
              value: 'requests',
              label: 'Requests',
            },
            // {value: 'pending', label: 'Pending'},
          ]}
        />
      </View>

      <FlatList
        data={value === 'requests' ? requests : friends}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.fullname}>{item.fullname}</Text>
            </View>

            <View style={styles.buttonContainer}>
              {value === 'requests' ? (
                <>
                  <Button
                    style={styles.acceptButton}
                    labelStyle={styles.acceptButtonText}
                    mode="contained"
                    onPress={() => handleAcceptRequest(item._id)}>
                    Accept
                  </Button>
                  <Button
                    style={styles.denyButton}
                    labelStyle={styles.denyButtonText}
                    mode="contained"
                    onPress={() => handleDenyRequest(item._id)}>
                    Deny
                  </Button>
                </>
              ) : (
                <Button
                  style={styles.unfriendButton}
                  labelStyle={styles.unfriendButtonText}
                  mode="contained"
                  onPress={() => handleRemoveFriend(item._id)}>
                  Unfriend
                </Button>
              )}
            </View>
          </View>
        )}
      />
    </View>
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

export default ContactScreen;
