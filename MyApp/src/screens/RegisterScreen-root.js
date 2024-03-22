// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import { useDispatch } from 'react-redux';
import { changeScreen } from '../redux/screenSlice';

const RegisterScreen = ({ goBack, navigation }) => {
  const dispatch = useDispatch();

  const [contactInfo, setContactInfo] = useState({
    type: 'phone', // Loại phương tiện đăng ký hiện tại: 'phone' hoặc 'email'
    value: '0000000000' // Giá trị số điện thoại hoặc email
  });

  const handleContinue = async () => {
    // Kiểm tra số điện thoại hoặc email
    if ((contactInfo.type === 'phone' && contactInfo.value.length !== 10) || (contactInfo.type === 'email' && !isValidEmail(contactInfo.value))) {
      Alert.alert('Thông báo', contactInfo.type === 'phone' ? 'Số điện thoại không hợp lệ' : 'Email không hợp lệ');
      return;
    }

    // Lưu số điện thoại hoặc email vào bộ nhớ cục bộ
    console.log('continue: contactInfo:', contactInfo);
    try {
      await AsyncStorage.setItem(contactInfo.type, contactInfo.value);

      // Di chuyển đến màn hình AuthScreen
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error in handleContinue:', error);
    }

    // Gửi mã OTP hoặc link xác nhận
    if (contactInfo.type === 'phone') {
      const OTP = generateOTP();
      await AsyncStorage.setItem('OTP', OTP);
      console.log('OTP:', OTP);
    } else {
      // Xử lý gửi email xác nhận
    }
  };

  const isValidEmail = (email) => {
    // Kiểm tra định dạng email
    return /\S+@\S+\.\S+/.test(email);
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
    dispatch(changeScreen('Splash'));
  };

  const toggleContactType = () => {
    // Chuyển đổi giữa nhập số điện thoại và nhập email
    const newType = contactInfo.type === 'phone' ? 'email' : 'phone';
    setContactInfo({ ...contactInfo, type: newType, value: ''});
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ padding: '1%', width: '100%' }}>
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
        <Text style={{ fontSize: 36, fontWeight: 700, color: 'black' }}>
          {contactInfo.type === 'phone' ? i18n.t('Enter your phone number') : i18n.t('Enter your email')}
        </Text>
      </View>

      <View style={{ width: '90%' }}>
        <TextInput
          placeholder={contactInfo.type === 'phone' ? i18n.t('Enter your phone number') : i18n.t('Enter your email')}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          keyboardType={contactInfo.type === 'phone' ? 'numeric' : 'email-address'}
          onChangeText={text => setContactInfo({ ...contactInfo, value: text })}
          value={contactInfo.value}
        />
      </View>

      <View style={{ width: '90%' }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 999,
          })}
          onPress={handleContinue}>
          {({ pressed }) => (
            <Text style={{ fontSize: 20 }}>{i18n.t('Continue')}</Text>
          )}
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', paddingVertical: '5%' }}>
        <Text>{contactInfo.type === 'phone' ? 'Bạn đã có tài khoản?' : 'Quay lại nhập số điện thoại?'}</Text>
        <Pressable onPress={toggleContactType}>
          <Text style={{ color: 'blue' }}>{contactInfo.type === 'phone' ? 'Via email' : 'Via phone'}</Text>
        </Pressable>
      </View>

      {contactInfo.type === 'phone' && (
        <View>
          {/* Phần này sẽ hiển thị nếu đang nhập số điện thoại */}
        </View>
      )}

      {contactInfo.type === 'email' && (
        <View>
          {/* Phần này sẽ hiển thị nếu đang nhập email */}
        </View>
      )}
    </View>
  );
};

export default RegisterScreen;