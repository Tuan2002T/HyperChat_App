import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, SectionList} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {getMyFriends} from '../api/allUser';
import {listChats, createNewChat} from '../api/getListChats';
import {showMessage} from 'react-native-flash-message';
import {socket} from '../socket/socket';

const CallScreen = ({navigation}) => {
  const me = useSelector(state => state.auth.user);

  const [friends, setFriends] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    socket.on('receiveNotification', data => {
      showMessage({
        message: data,
        description: 'This is our second message',
        type: 'success',
      });
    });
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (me && me._id && me.token) {
          const res = await getMyFriends(me._id, me.token);
          res.sort((a, b) => a.fullname.localeCompare(b.fullname));
          setFriends(res);
        }
      } catch (error) {
        console.error('Error caught:', error);
      }
    };

    fetchFriends();
  }, [me]);


  const handleCall = friendId => {
    console.log('Call to friend:', friendId);
  };

  const handleVideoCall = friendId => {
    console.log('Video call to friend:', friendId);
  };

  const filterFriends = () => {
    return friends.filter(
      friend =>
        friend.fullname &&
        friend.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };
  const filteredFriends = filterFriends();

  const handleMenu = () => {
    navigation.navigate('SettingScreen');
    console.log('Menu');
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Calls"
        leftIcon="menu"
        leftIconPress={handleMenu}
        rightIcon="plus"
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
        sections={
          filteredFriends.length
            ? [{title: 'Friends', data: filteredFriends}]
            : []
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              {item.fullname}
            </Text>
            <Button
              icon={'phone'}
              style={{
                backgroundColor: null,
                borderWidth: 1,
                borderColor: '#76ABAE',
                marginLeft: 'auto',
              }}
              labelStyle={{color: '#76ABAE', fontWeight: 'bold'}}
              onPress={() => handleCall(item._id)}
            />
            <Button
              icon={'video'}
              style={{
                backgroundColor: null,
                borderWidth: 1,
                borderColor: '#76ABAE',
                marginLeft: 10,
              }}
              labelStyle={{color: '#76ABAE', fontWeight: 'bold'}}
              onPress={() => handleVideoCall(item._id)}
            />
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CallScreen;
