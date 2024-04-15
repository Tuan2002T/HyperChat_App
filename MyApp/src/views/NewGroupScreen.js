import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, SectionList} from 'react-native';
import {Button, Searchbar, Checkbox, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {getMyFriends} from '../api/allUser';
import {showMessage} from 'react-native-flash-message';
import {socket} from '../socket/socket';
import CustomTextInput from '../components/CustomTextInput';
import {createGroupChat} from '../api/getListChats';

const NewGroupScreen = ({navigation}) => {
  const me = useSelector(state => state.auth.user);

  const [name, setName] = React.useState('');

  const [checkboxStates, setCheckboxStates] = React.useState({});

  const handleCheckboxChange = (friendId, isChecked) => {
    setCheckboxStates(prevState => ({
      ...prevState,
      [friendId]: isChecked,
    }));
  };

  const handleCreateGroupChat = async () => {
    if (name === '') {
      showMessage({
        message: 'Please enter group name',
        type: 'warning',
      });
      return;
    }

    const selectedFriends = friends.filter(
      friend => checkboxStates[friend._id],
    );
    if (selectedFriends.length < 2) {
      showMessage({
        message: 'Please select at least 2 friends',
        type: 'warning',
      });
    } else {
      //create array me._id and friendIds
      const newGroup = [me._id, ...selectedFriends.map(friend => friend._id)];

      const res = await createGroupChat(name, newGroup);
      console.log('Create group chat:', res);
    }
  };

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

  const filterFriends = () => {
    return friends.filter(
      friend =>
        friend.fullname &&
        friend.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };
  const filteredFriends = filterFriends();

  return (
    <View style={styles.container}>
      <CustomHeader
        title="New group"
        leftIcon="arrow-left"
        leftIconPress={() => navigation.goBack()}
      />

      {/* Input group name */}
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <CustomTextInput
          label="Group name"
          placeholder="Your group name"
          value={name}
          onChangeText={setName}
        />
      </View>

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
            <View style={{marginLeft: 'auto', marginRight: 10}}>
              <Checkbox
                uncheckedColor="#76ABAE"
                color="#76ABAE"
                // Truyền giá trị của checkbox từ state tương ứng
                status={checkboxStates[item._id] ? 'checked' : 'unchecked'}
                // Khi checkbox thay đổi trạng thái, cập nhật state tương ứng
                onPress={() => {
                  handleCheckboxChange(item._id, !checkboxStates[item._id]);
                }}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <Button
          style={{
            marginHorizontal: '5%',
            marginVertical: 10,
            backgroundColor: '#76ABAE',
          }}
          labelStyle={{color: 'white', fontWeight: 'bold'}}
          mode="contained"
          onPress={() => {
            handleCreateGroupChat();
          }}>
          Create group
        </Button>
      </View>
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

export default NewGroupScreen;
