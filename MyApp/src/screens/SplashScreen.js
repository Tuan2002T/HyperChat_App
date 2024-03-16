// Splash.js
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      // Kiểm tra trạng thái đăng nhập
      if (userToken || isLoggedIn) {
        navigation.replace('Main');
      } else {
        // navigation.replace('Login');
        navigation.replace('Start');

      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your App Name</Text>
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
