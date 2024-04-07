//src/views/SubChatScreen.js

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {Icon, Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {getRequests, getData} from '../api/allUser';

const SubChatScreen = ({navigation}) => {
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.auth.user);

  console.log('SubChat - My id:', me._id);

  const [requests, setRequests] = React.useState([]);

  //getRequests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getRequests(me._id);
        setRequests(res);
      } catch (error) {
        console.error('Error caught:', error);
      }
    };
    fetchRequests();
  }, []);

  console.log('Requests:', requests);

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filteredUsers = users.filter(
    user =>
      user._id !== me._id &&
      (user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="New message"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
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
      <View>
        <Text>Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.userContainer}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <Text>
                {item.fullname} ({item.userName})
              </Text>
              <Icon source="account-check" size={20} color="green" />
            </View>
          )}
        />
      </View>
      <Text>Suggest</Text>
      <View>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                console.log('User selected:', item._id);
              }}>
              <View style={styles.userContainer}>
                <Image source={{uri: item.avatar}} style={styles.avatar} />
                <Text>
                  {item.fullname} ({item.userName})
                </Text>
              </View>
            </Pressable>
          )}
        />
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
  },
});

export default SubChatScreen;
