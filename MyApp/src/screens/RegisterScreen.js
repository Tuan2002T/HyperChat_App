// src/screens/RegisterScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('Hoàng Hiện'); // Tên người dùng
  const [email, setEmail] = useState('djn65341@fosiq.com');
  const [phone, setPhone] = useState('0987687788');
  const [pwd, setPwd] = useState('A@hihi8899');
  const [cpwd, setCpwd] = useState('A@hihi8899');
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const formatDate2 = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  const handleContinue = async () => {
    if (!name || !email || !phone || !pwd || !cpwd) {
      Alert.alert('Please enter all fields');
      return;
    }

    if (pwd !== cpwd) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid phone number');
      return;
    }

    try {
      await AsyncStorage.setItem('email', email);
      const response = await axios.post('http://192.168.2.41:5000/api/user/register/send-otp', {
        userName: name.replace(/\s/g, ''), // remove spaces
        password: pwd,
        fullname: name,
        email: email,
        phoneNumber: phone,
        birthday: formatDate2(birthday),
      });
      console.log('Login successfully:', response.data);
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error in handleContinue:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleBack = () => {
    dispatch(changeScreen('Splash'));
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
          {i18n.t('Enter your info')}
        </Text>
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Input your NAME'}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onChangeText={setName}
          value={name}
        />
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Input your EMAIL'}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Input your PHONE NUMBER'}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onChangeText={setPhone}
          value={phone}
        />
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Input your phone PASSWORD'}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onChangeText={setPwd}
          value={pwd}
        />
      </View>

      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Confirm your PASSWORD'}
          style={{
            height: 'auto',
            width: '100%',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
          }}
          onChangeText={setCpwd}
          value={cpwd}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        {/* show date picker */}
        <Text style={{fontSize: 20, marginRight: 10}}>Date of Birth:</Text>
        <Text style={{fontSize: 20, marginRight: 10, color: 'black'}}>
          {formatDate(birthday)}
        </Text>

        <Pressable onPress={() => setOpen(true)}>
          <SvgIcons name="edit" width={20} height={20} />
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={birthday}
          onConfirm={selectedDate => {
            setOpen(false);
            setBirthday(selectedDate);
          }}
          onCancel={() => setOpen(false)}
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
          {({pressed}) => (
            <Text style={{fontSize: 20}}>{i18n.t('Continue')}</Text>
          )}
        </Pressable>
      </View>

      {/* <View style={{flexDirection: 'row', paddingVertical: '5%'}}>
        <Text>
          {contactInfo.type === 'phone'
            ? 'Bạn đã có tài khoản?'
            : 'Quay lại nhập số điện thoại?'}
        </Text>
        <Pressable onPress={toggleContactType}>
          <Text style={{color: 'blue'}}>
            {contactInfo.type === 'phone' ? 'Via email' : 'Via phone'}
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default RegisterScreen;
