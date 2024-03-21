// CreateProfileScreen.js
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';

const CreateProfileScreen = ({navigation}) => {
  const [goBackConfirmed, setGoBackConfirmed] = useState(false);
  const [userName, setUserName] = useState('vietkieumytho');
  const [password, setPassword] = useState('A@12345');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('Le Hoang Hien');
  const [email, setEmail] = useState('vkmt@gmail.com');

  // get phone form async storage
  const phoneNumber = async () => {
    try {
      const value = await AsyncStorage.getItem('phone');
      if (value !== null) {
        console.log('phone:', value);
      }
    } catch (error) {
      console.error('Error in getPhone:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!goBackConfirmed) {
        e.preventDefault();
        Alert.alert(
          'Confirmation',
          'Are you sure you want to go back? Your changes will not be saved.',
          [
            {text: 'Cancel', style: 'cancel', onPress: () => {}},
            {
              text: 'Go Back',
              onPress: () => {
                setGoBackConfirmed(true);
                navigation.dispatch(e.data.action);
              },
            },
          ],
        );
      }
    });

    return unsubscribe;
  }, [navigation, goBackConfirmed]);

  const {t} = useTranslation();

  const [avatarUri, setAvatarUri] = useState(null);


  const [selectedGender, setSelectedGender] = useState(null);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  };

  const handleContinue = async () => {
    try {
      const response = await axios.post(
        'http://192.168.2.41:5000/api/user/register',
        {
          userName: "tuanapi1aa",
          password: "Tuan@123",
          fullname: "Trương Tuấn",
          email: "tuan12a1623@gmail.com",
          phoneNumber: "0339949343"
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  // Function to handle avatar edit
  const handleChangeAvatar = async () => {
    Alert.alert(
      'Chọn ảnh',
      'Bạn muốn chọn ảnh từ thư viện hay chụp ảnh mới?',
      [
        {
          text: 'Chọn từ thư viện',
          onPress: () => handlePickImageFromLibrary(),
        },
        {
          text: 'Chụp ảnh mới',
          onPress: () => handleCaptureImage(),
        },
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handlePickImageFromLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      console.log('Selected image:', image);
      setAvatarUri(image.path); // Cập nhật đường dẫn ảnh đại diện mới
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleCaptureImage = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        useFrontCamera: true, // Sử dụng camera trước
      });
      console.log('Selected image:', image);
      setAvatarUri(image.path); // Cập nhật đường dẫn ảnh đại diện mới
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <View
      style={{flex: 1, alignItems: 'center', width: '100%', height: '100%'}}>
      <View
        style={{
          width: '100%',
          height: 'auto',
          backgroundColor: 'lightblue',
          paddingLeft: 20,
          justifyContent: 'center',
        }}>
        <Pressable
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('Start')}>
          <SvgIcons name="back" width={36} height={36} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'black',
              paddingHorizontal: 10,
            }}>
            Create Profile
          </Text>
        </Pressable>
      </View>

      {/* default avatar */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: '5%',
        }}>
        {avatarUri ? ( // Kiểm tra nếu có đường dẫn ảnh đại diện mới
          <Image
            source={{uri: avatarUri}}
            style={{width: 200, height: 200, borderRadius: 100}}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../assets/png/avt.jpg')}
            style={{width: 200, height: 200, borderRadius: 100}}
            resizeMode="cover"
          />
        )}
        <Pressable
          onPress={handleChangeAvatar}
          style={{position: 'absolute', right: 10, bottom: 10}}>
          <SvgIcons name="edit" width={32} height={32} />
        </Pressable>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <TextInput
          style={{
            width: '80%',
            padding: '2%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            marginBottom: '5%',
          }}
          placeholder={t('Full Name')}
          value={fullName}
          onChangeText={setFullName}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* show date picker */}
          <Text style={{fontSize: 24, marginRight: 10}}>Date of Birth:</Text>
          <Text style={{fontSize: 24, marginRight: 10, color: 'black'}}>
            {formatDate(date)}
          </Text>

          <Pressable onPress={() => setOpen(true)}>
            <SvgIcons name="edit" width={24} height={24} />
          </Pressable>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={selectedDate => {
              setOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => setOpen(false)}
          />
        </View>
      </View>

      {/* select gender */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{fontSize: 24, marginRight: 10}}>Gender:</Text>
        <Pressable
          style={({pressed}) => ({
            backgroundColor:
              selectedGender === 'male' || pressed
                ? 'rgb(210, 230, 255)'
                : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
          })}
          onPress={() => {
            setSelectedGender('male');
            console.log('Male selected');
          }}>
          {({pressed}) => (
            <Text
              style={{
                fontSize: 20,
                color: selectedGender === 'male' || pressed ? 'blue' : 'black',
              }}>
              Male
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({pressed}) => ({
            backgroundColor:
              selectedGender === 'female' || pressed
                ? 'rgb(210, 230, 255)'
                : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
          })}
          onPress={() => {
            setSelectedGender('female');
            console.log('Female selected');
          }}>
          {({pressed}) => (
            <Text
              style={{
                fontSize: 20,
                color:
                  selectedGender === 'female' || pressed ? 'blue' : 'black',
              }}>
              Female
            </Text>
          )}
        </Pressable>
      </View>
      {/* continue */}
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 999,
          marginTop: 10,
        })}
        onPress={() => {
          navigation.goBack();
        }}>
        {({pressed}) => <Text style={{fontSize: 20}}>{t('Cancel')}</Text>}
      </Pressable>
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 999,
          marginTop: 10,
        })}
        onPress={handleContinue}>
        {({pressed}) => <Text style={{fontSize: 20}}>{t('Continue')}</Text>}
      </Pressable>
    </View>
  );
};

export default CreateProfileScreen;
