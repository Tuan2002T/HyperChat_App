import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, Alert } from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';

const RegisterScreen = ({navigation}) => {
  const {t} = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState('');

  const validatePhoneNumber = () => {
    // Biểu thức chính quy để kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10}$/;

    if (phoneRegex.test(phoneNumber)) {
      Alert.alert('Thông báo', 'Số điện thoại hợp lệ');
    } else {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
    }
  };

  useEffect(() => {
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
    savePhoneNumber(phoneNumber);
    navigation.navigate('Login');
  };

  const savePhoneNumber = async value => {
    try {
      await AsyncStorage.setItem('phone number', value);
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{padding: '1%', width: '100%'}}>
        <Pressable onPress={() => navigation.goBack()}>
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
          // onPress={handleLogin}>
          onPress={validatePhoneNumber}>
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
