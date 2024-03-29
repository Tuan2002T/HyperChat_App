// DetailScreen.js
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const DetailScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const handleLogout = async () => {
    // Cập nhật trạng thái đăng nhập thành false
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    // Chuyển hướng đến màn hình đăng nhập
    navigation.navigate('Tmp');
  };

  return (
    <View>
      <Text>{isFocused ? 'focused' : 'unfocused'}</Text>

      <Text>Đăng xuất</Text>
      <Pressable onPress={handleLogout}>
        <Text style={{fontSize: 60}}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default DetailScreen;
