// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';

const RegisterScreen = ({goBack, navigation}) => {
  const {t} = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState('0000000000');

  const handleContinue = async () => {
    // Kiểm tra số điện thoại
    if (phoneNumber.length !== 10) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
      return;
    }

    // Lưu số điện thoại vào bộ nhớ cục bộ
    console.log('continue: phoneNumber:', phoneNumber);
    try {
      await AsyncStorage.setItem('phoneNumber', phoneNumber);

      // di chuyển đến màn hình AuthScreen
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error in handleContinue:', error);
    }

    // Gửi mã OTP
    const OTP = generateOTP();
    await AsyncStorage.setItem('OTP', OTP);
    console.log('OTP:', OTP);
  
  };

  // generateOTP
  const generateOTP = () => {
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  };

  const handleBack = () => {
    goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{padding: '1%', width: '100%'}}>
        <Pressable onPress={handleBack}>
          <SvgIcons name="back" width={36} height={36} />
        </Pressable>
      </View>

      <View
        style={{
          alignItems: 'center',
          paddingVertical: '10%',
          paddingHorizontal: '1%',
        }}>
        <Text style={{fontSize: 36, fontWeight: 700, color: 'black'}}>
          {t('Enter your phone number')}
        </Text>
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={t('Enter your phone number')}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          // keyboardType="phone-pad"
          keyboardType="numeric"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />
      </View>

      <View style={{width: '90%'}}>
        <Pressable
          style={({pressed}) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 999,
          })}
          onPress={handleContinue}>
          {({pressed}) => <Text style={{fontSize: 20}}>{t('Continue')}</Text>}
        </Pressable>
      </View>

      <View style={{flexDirection: 'row', paddingVertical: '5%'}}>
        <Text>Bạn đã có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'blue'}}>Đăng nhập ngay</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
