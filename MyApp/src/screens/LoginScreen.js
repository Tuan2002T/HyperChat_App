// src/screens/LoginScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentScreen, changeScreen} from '../redux/screenSlice';
import axios from 'axios';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0938131256');
  const [password, setPassword] = useState('HienLor@123123123');

  const handleChecklogin = async () => {
    console.log('checklogin');
    console.log('phoneNumber:', phoneNumber);
    console.log('password:', password);

    if (phoneNumber === '' || password === '') {
      Alert.alert('Please enter phoneNumber and password');
      return;
    }

    /**/
    try {
      const response = await axios.post('http://192.168.2.41:5000/api/user/login', {
        phoneNumber: phoneNumber,
        password: password,
      });
      console.log('Login successfully:', response.data.token);
    } catch (error) {
      console.error('Error', error);
    }
  };
  /**/

  useEffect(() => {
    loadUsername();
    AsyncStorage.getItem('language')
      .then(language => {
        if (language) {
          i18n.changeLanguage(language);
        }
      })
      .catch(error => {
        console.error('Error loading language:', error);
      });
  });

  const handleLogin = () => {
    dispatch(changeScreen('Main'));
  };

  const saveLoginStatus = async isLoggedIn => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    } catch (error) {
      console.error('Error saving login status:', error);
    }
  };

  const saveUsername = async value => {
    try {
      await AsyncStorage.setItem('username', value);
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const loadUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        // Set the username state if it exists in AsyncStorage
        setUsername(value);
      }
    } catch (error) {
      console.error('Error loading username:', error);
    }
  };

  const handleGoBack = () => {
    dispatch(changeScreen('Splash'));
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {/* Go to Start*/}
      <View
        style={{
          width: '100%',
          height: '7%',
          backgroundColor: 'lightblue',
          paddingLeft: 20,
          justifyContent: 'center',
        }}>
        <Pressable style={{flexDirection: 'row'}} onPress={handleGoBack}>
          <SvgIcons name="back" width={36} height={36} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'black',
              paddingHorizontal: 10,
            }}>
            {i18n.t('Login')}
          </Text>
        </Pressable>
      </View>

      <View>
        <Text style={{fontSize: 16}}>
          Please enter phone number and password to log in
        </Text>
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={i18n.t('Username')}
          style={{
            height: 40,
            width: '100%',
            borderColor: 'gray',
            borderBottomWidth: 0.5,
            marginBottom: 10,
          }}
          onChangeText={text => setUsername(text)}
          value={username} // Set the value of TextInput to the 'username' state
        />
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={i18n.t('Password')}
          secureTextEntry
          style={{
            height: 40,
            width: '100%',
            borderColor: 'gray',
            borderBottomWidth: 0.5,
            marginBottom: 10,
          }}
        />
      </View>

      <View style={{width: '90%'}}>
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{color: 'blue'}}>{i18n.t('Forgot password?')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{color: 'blue'}}>Register account</Text>
        </Pressable>
      </View>

      <View style={{width: '90%', alignItems: 'flex-end'}}>
        <Pressable
          onPress={handleLogin}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightblue',
          }}>
          <SvgIcons name="go" width={36} height={36} />
        </Pressable>
      </View>
      <View>
        <Pressable onPress={handleChecklogin}>
          <Text>checklogin</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
