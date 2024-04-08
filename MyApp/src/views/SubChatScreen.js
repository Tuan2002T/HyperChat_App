import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SectionList,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {Icon, Searchbar, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getRequests, getMyFriends} from '../api/allUser';

const SubChatScreen = ({navigation}) => {
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);

  const [requests, setRequests] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let res = await getRequests(me._id);
        res = res.map(request => ({...request, type: 'request'}));
        setRequests(res);
      } catch (error) {
        console.error('Error caught:', error);
      }
    };
    const fetchFriends = async () => {
      try {
        const res = await getMyFriends(me._id, me.token);
        
        // Add type attribute to each friend object
        const friendsWithType = res.map(friend => ({ ...friend, type: 'friend' }));
        
        console.log('Friends:', friendsWithType);
        setFriends(friendsWithType);
      } catch (error) {
        console.error('Error caught:', error);
      }
    };
    

    fetchRequests();
    fetchFriends();
  }, []);


  const handleAcceptRequest = async requestId => {
    console.log('Accept request:', requestId);
  }

  const handleDenyRequest = async requestId => {
    console.log('Deny request:', requestId);
  }

  const handleRemoveFriend = async friendId => {
    console.log('Remove friend:', friendId);
  }



  // Filter users, requests, and friends based on search query
  const filteredData = [...requests, ...friends, ...users].filter(item => {
    const isAlreadyRequested = requests.some(request => request._id === item._id);
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
  { title: 'Requests', data: requests },
  { title: 'Friends', data: friends },
  { title: 'Suggest', data: filteredData },
];

  return (
    <View style={styles.container}>
      <CustomHeader
        title="New message"
        leftIcon="arrow-left"
        leftIconPress={() => navigation.goBack()}
      />
      <View style={{marginVertical: 10}}>
        <Searchbar
          style={{
            marginHorizontal: '5%',
            borderWidth: 1,
            borderColor: '#76ABAE',
            backgroundColor: 'white',
          }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              console.log('User selected:', item._id);
            }}>
            <View style={styles.userContainer}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <Text>{item.fullname}</Text>
              {item.type === 'request' ? (
                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                  <Button
                    style={{
                      backgroundColor: null,
                      borderWidth: 1,
                      borderColor: 'green',
                    }}
                    labelStyle={{color: 'green'}}
                    mode="contained"
                    onPress={() => handleAcceptRequest(item._id)}>
                    Accept
                  </Button>
                  <Button
                    style={{
                      backgroundColor: null,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginLeft: 5,
                    }}
                    labelStyle={{color: 'red'}}
                    mode="contained"
                    onPress={() => handleDenyRequest(item._id)}>
                    Denied
                  </Button>
                </View>
              ) : item.type === 'friend' ? (
                <Button
                  style={{
                    backgroundColor: null,
                    borderWidth: 1,
                    borderColor: 'red',
                    marginLeft: 'auto',
                  }}
                  labelStyle={{color: 'red'}}
                  mode="contained"
                  onPress={() => handleRemoveFriend(item._id)}>
                  Unfriend
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: null,
                    borderWidth: 1,
                    borderColor: '#76ABAE',
                    marginLeft: 'auto',
                  }}
                  labelStyle={{color: '#76ABAE'}}
                  mode="contained"
                  onPress={() => console.log('Invite')}>
                  Invite
                </Button>
              )}
            </View>
          </Pressable>
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
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SubChatScreen;
