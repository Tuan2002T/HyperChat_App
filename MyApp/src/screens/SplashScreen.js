// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserToken, setIsLoggedIn } from '../redux/actions';

const SplashScreen = ({ navigation }) => {
  console.log('SplashScreen');
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      // Kiểm tra trạng thái đăng nhập
      if (userToken || isLoggedIn) {
        dispatch(setUserToken(userToken));
        dispatch(setIsLoggedIn(true));
        navigation.replace('Main');
      } else {
        navigation.replace('Start');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hyper chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
