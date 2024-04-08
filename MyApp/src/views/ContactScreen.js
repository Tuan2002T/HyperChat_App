import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, SectionList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Searchbar} from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
import CustomConfirmDialog from '../components/custom/CustomConfirmDialog';
import {
  getRequests,
  getMyFriends,
  acceptRequest,
  denyRequest,
  unFriend,
  addFriend,
} from '../api/allUser';

const ContactScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});
  const [btnType, setBtnType] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getMyFriends(me._id, me.token);
        const friendsWithType = res.map(friend => ({
          ...friend,
          type: 'friend',
        }));
        setFriends(friendsWithType);
      } catch (error) {
        console.error('Error caught:', error);
      }
    };
    fetchFriends();
    const fetchRequests = async () => {
      try {
        let res = await getRequests(me._id);
        res = res.map(request => ({...request, type: 'request'}));
        setRequests(res);
      } catch (error) {
        console.error('Error caught:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleNext = async () => {
    hideConfirmDialog();
    if (btnType === 'deny') {
      try {
        const res = await denyRequest(selectedId, me._id);
        const updatedRequests = requests.filter(
          request => request._id !== selectedId,
        );
        setRequests(updatedRequests);
      } catch (error) {
        console.error('Error caught:', error);
      }
    }
    if (btnType === 'remove') {
      try {
        const res = await unFriend(selectedId, me._id);
        const updatedFriends = friends.filter(
          friend => friend._id !== selectedId,
        );
        setFriends(updatedFriends);
      } catch (error) {
        console.error('Error caught:', error);
      }
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
      console.log('Accept request:', res);
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

  const handleInviteFriend = async friendId => {
    console.log('Invite friend:', friendId);
    try {
      const res = await addFriend(me._id, friendId);
      console.log('Invite friend:', res);
    } catch (error) {
      console.error('Error caught:', error);
    }
  };

  const filteredData = [...requests, ...friends, ...users].filter(item => {
    const isAlreadyRequested = requests.some(
      request => request._id === item._id,
    );
    const isFriend = friends.some(friend => friend._id === item._id);
    return (
      item._id !== me._id &&
      !isAlreadyRequested &&
      !isFriend &&
      (item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const sections = [
    {title: 'Requests', data: requests},
    {title: 'Friends', data: friends},
    {title: 'Suggest', data: filteredData},
  ];

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
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <Text style={styles.fullname}>{item.fullname}</Text>
            {item.type === 'request' ? (
              <View style={styles.buttonContainer}>
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
              </View>
            ) : item.type === 'friend' ? (
              <Button
                style={styles.unfriendButton}
                labelStyle={styles.unfriendButtonText}
                mode="contained"
                onPress={() => handleRemoveFriend(item._id)}>
                Unfriend
              </Button>
            ) : (
              <Button
                style={styles.inviteButton}
                labelStyle={styles.inviteButtonText}
                mode="contained"
                onPress={() => handleInviteFriend(item._id)}>
                Invite
              </Button>
            )}
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
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
