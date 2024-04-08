import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SectionList } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import { getMyFriends } from '../api/allUser';

const SubChatScreen = ({ navigation }) => {
  const me = useSelector(state => state.auth.user);

  const [friends, setFriends] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const handleCreateChat = async friendId => {
    console.log('Create chat with:', friendId);
  };

  const handleCreateGroupChat = () => {
    console.log('Create group chat');
  };

  const filterFriends = () => {
    return friends.filter(
      friend => 
        (friend.fullname && friend.fullname.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  const filteredFriends = filterFriends();

  return (
    <View style={styles.container}>
      <CustomHeader
        title="New message"
        leftIcon="arrow-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon="account-group"
        rightIconPress={handleCreateGroupChat}
      />
      <View style={{ marginVertical: 10 }}>
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
        sections={filteredFriends.length ? [{ title: 'Friends', data: filteredFriends }] : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.fullname}</Text>
            <Button
              style={{
                backgroundColor: null,
                borderWidth: 1,
                borderColor: '#76ABAE',
                marginLeft: 'auto',
              }}
              labelStyle={{ color: '#76ABAE', fontWeight: 'bold' }}
              mode="contained"
              onPress={() => handleCreateChat(item._id)}>
              Chat
            </Button>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
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
