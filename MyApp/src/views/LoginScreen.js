import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import axios from 'axios';
import {Button, Divider , Dialog} from 'react-native-paper';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import { loginUser } from '../api/loginUser'; // Import loginUser function



const LoginScreen = () => {
  const dispatch = useDispatch();
  const [indicator, setIndicator] = useState(false);

  const [username, setUsername] = useState('vkmt');
  const [password, setPassword] = useState('Vkmt@9999');

  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Please enter account information');
      return;
    }

    try {
      const phoneNumber = await loginUser(username, password);
      Alert.alert('Login successfully:', phoneNumber);
      handleGotoChat();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleGoBack = () => {
    dispatch(changeScreen('Splash'));
  };

  const handleRegister = () => {
    // Hiển thị hộp thoại cảnh báo
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn chuyển trang đến trang đăng ký?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(changeScreen('Register'));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleForgottenPassword = () => {
    dispatch(changeScreen('ForgottenPassword'));
  };

  const handleGotoChat = () => {
    dispatch(changeScreen('Main'));
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      <Header
        title={i18n.t('Login')}
        handleGoBack={handleGoBack}
        indicator={indicator}
      />

      <CustomTextInput
        label="Account information"
        placeholder="Username or email or phone number"
        value={username}
        onChangeText={setUsername}
      />

      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        showPassword={showPassword}
        onPressEye={handleShowPassword}
      />

      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginTop: 20,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#76ABAE',
          }}
          mode="contained"
          labelStyle={{fontSize: 18}}
          onPress={handleLogin}>
          {i18n.t('Login')}
        </Button>
      </View>

      <View style={{width: '90%', alignItems: 'center', marginTop: 10}}>
        <Pressable onPress={handleForgottenPassword}>
          <Text style={{color: '#76ABAE', fontSize: 16}}>
            {i18n.t('Forgotten password?')}
          </Text>
        </Pressable>
      </View>

      <View style={{width: '90%', marginVertical: 10}}>
        <Divider bold="true" />
      </View>

      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginVertical: 10,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#EEE',
          }}
          mode="contained"
          labelStyle={{fontSize: 18, color: '#76ABAE'}}
          onPress={handleRegister}>
          {i18n.t('Create new account')}
        </Button>
      </View>

      {/*  */}
      <View style={{position: 'absolute', top: 10, right: 100}}>
        <Pressable onPress={handleGotoChat}>
          <Text>goToChat</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
