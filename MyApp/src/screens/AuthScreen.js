// AuthScreen.js

import React, {Component, useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import axios from 'axios';


const AuthScreen = ({navigation}) => {
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  AsyncStorage.getItem('email').then(email => {
    if (email) {
      setEmail(email);
    }
  });


  // get phoneNumber from AsyncStorage
  const [phoneNumber, setPhoneNumber] = useState('');
  AsyncStorage.getItem('phoneNumber').then(phoneNumber => {
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  });

  // handle resend OTP
  const resendOTP = async () => {
    const OTP = generateOTP();
    await AsyncStorage.setItem('OTP', OTP);
    console.log('OTP:', OTP);
  };

  // handle continue
  const handleContinue = async () => {
    console.log('OTP:', otp);
    console.log('email:', email);
    try {
      const response = await axios.post('http://192.168.2.41:5000/api/user/register/verifyOTP', {
        email: email,
        userOTP: otp, // Corrected key name
      });
      console.log('response:', response.data);
      // Handle success response here
      // Save token to AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      // Navigate to Main screen
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle error response here and display appropriate message to the user
    }
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
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('Register')}>
          <SvgIcons name="back" width={36} height={36} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'black',
              paddingHorizontal: 10,
            }}>
            Nhập mã xác thực
          </Text>
        </Pressable>
      </View>

      <View>
        <Text style={{fontSize: 16}}>
          Please enter phone number and password to log in
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          paddingVertical: '10%',
          paddingHorizontal: '1%',
        }}>
        <Text style={{fontSize: 36, fontWeight: 700, color: 'black'}}>
          {/*show phone number*/}
          {email}
        </Text>
      </View>

      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
        keyboardType="numeric"
        placeholder="Enter OTP"
        onChangeText={setOTP}
      />

      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 999,
        })}
        onPress={handleContinue}>
        {({pressed}) => (
          <Text style={{fontSize: 20}}>{i18n.t('Continue')}</Text>
        )}
      </Pressable>
      {/*resend otp*/}
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 999,
          marginTop: 10,
        })}
        onPress={resendOTP}>
        {({pressed}) => (
          <Text style={{fontSize: 20}}>{i18n.t('Resend OTP')}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AuthScreen;
