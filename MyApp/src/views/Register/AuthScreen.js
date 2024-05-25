// AuthScreen.js
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import i18n from '../../i18n/i18n';
import axios from 'axios';
import Header from '../../components/Header';
import {Button} from 'react-native-paper';
import API_CONFIG from '../../api/apiConfig';
import {regSendMail} from '../../api/registerUser';

const AuthScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params);

  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  // Countdown timer effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [timer]);

  // handle resend OTP
  const resendOTP = async () => {
    console.log('Resend OTP');
    setTimer(30);
    setCanResend(false);
    try {
      regSendMail(email.toLowerCase());
    } catch (error) {
      console.error(error);
    }
  };

  // handle continue
  const handleContinue = async () => {
    try {
      const response = await axios.post(
        API_CONFIG.baseURL + API_CONFIG.endpoints.regVerifyMail,
        {
          email: email,
          OTP: otp,
        },
      );
      navigation.navigate('Register', {email});
      return response;
    } catch (error) {
      console.error(error.response?.data.error);
    }

  };

  handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      {/* Go to Start*/}
      <Header
        title={i18n.t('Verify your email')}
        handleGoBack={handleBack}
        indicator={false}
      />

      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>
          {i18n.t('The OTP code has been sent to your email')}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'black',
            marginTop: 5,
          }}>
          ({email})
        </Text>
      </View>

      <TextInput
        style={{
          width: '90%',
          borderBottomWidth: 0.5,
          borderColor: '#76ABAE',
          backgroundColor: '#eee',
          fontSize: 20,
          marginTop: 20,
        }}
        textAlign="center"
        maxLength={6}
        label="OTP"
        keyboardType="numeric"
        onChangeText={setOTP}
      />

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontSize: 16}}>{i18n.t('Didn’t receive the OTP?')}</Text>
        <Pressable onPress={canResend ? resendOTP : null}>
          <Text
            style={{
              fontSize: 16,
              color: canResend ? '#76ABAE' : 'gray',
              marginHorizontal: 5,
            }}>
            {i18n.t('Resend OTP')}
          </Text>
        </Pressable>
        <Text style={{fontSize: 16}}>({timer})</Text>
      </View>

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
          onPress={handleContinue}>
          {i18n.t('Continue')}
        </Button>
      </View>
    </View>
  );
};

export default AuthScreen;
