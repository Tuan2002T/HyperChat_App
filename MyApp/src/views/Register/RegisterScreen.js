// src/screens/RegisterScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet, Alert} from 'react-native';
import SvgIcons from '../../assets/SvgIcons';
import i18n from '../../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../../redux/screenSlice';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import {Button} from 'react-native-paper';
import {reg, registerUser} from '../../api/registerUser';
import CustomDialog from '../../components/custom/CustomDialog';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {changePassword} from '../../api/changePassword';
import {updateUser} from '../../api';
import {getData} from '../../api/loginUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../socket/socket';
import { getUserById } from '../../api/allUser';

const RegisterScreen = ({navigation, route}) => {
  const [avatarUri, setAvatarUri] = useState('');
  const [res, setRes] = useState(null);
  const [user, setUser] = useState(null);
  const [uName, setUName] = useState('');

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});
  const showDialog = (title, message) => {
    setDialogMessage({title: title, message: message});
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [name, setName] = useState('Tina');
  const [phone, setPhone] = useState('033');

  const [pwd, setPwd] = useState('Tuan@123');
  const [cpwd, setCpwd] = useState('Tuan@123');
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState(new Date(2000, 0, 1));
  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  };

  const handleContinue = async () => {
    let age = new Date().getFullYear() - birthday.getFullYear();
    const monthDifference = new Date().getMonth() - birthday.getMonth();
    const dayDifference = new Date().getDate() - birthday.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (
      uName == '' ||
      name === '' ||
      phone === '' ||
      pwd === '' ||
      cpwd === ''
    ) {
      showDialog('Input', 'Please enter all information!');
      return;
    }

    if (pwd !== cpwd) {
      showDialog('Password', 'Password and confirm password do not match!');
      return;
    }
    if (age < 18) {
      showDialog('Age', 'You must be at least 18 years old to register!');
      return;
    }
    try {
      const userData = {
        id: uName.toLowerCase(),
        name: name,
        email: route.params.email,
        phone: phone,
        dob: birthday,
        pwd: pwd,
      };
      const res = await reg(userData);
      if (res.status === 500) {
        showDialog('Phone', 'Phone number is already in use!');
        return;
      }
      if (res.status === 200) {
        try {
          await AsyncStorage.setItem(
            '@user',
            JSON.stringify(route.params.email),
          );
          await AsyncStorage.setItem('@password', JSON.stringify(pwd));
        } catch (e) {
          console.error(e);
        }
        socket.emit('userNewRegister', res.data.fullUser);
        handleBack();
      } else {
        showDialog('Register failed', res.data.error);
        console.log('Register failed:', user.data.error);
        showDialog('Register failed', user.data.error);
      }
    } catch (error) {
      showDialog('Register error', error);
    }
  };

  const handleBack = () => {
    dispatch(changeScreen('Login'));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      <Header
        title={i18n.t('Register')}
        handleGoBack={handleBack}
        indicator={isLoading}
      />
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {avatarUri && (
          <Image
            style={{
              margin: 10,
              width: 200,
              height: 200,
              resizeMode: 'cover',
              borderRadius: 9999,
              backgroundColor: 'lightgrey',
              borderColor: 'lightgrey',
              borderWidth: 0.5,
            }}
            source={{uri: avatarUri}}
          />
        )}
      </View>
      <CustomTextInput label="Username" value={uName} onChangeText={setUName} />
      <CustomTextInput label="Full name" value={name} onChangeText={setName} />
      <CustomTextInput
        label="Phone number"
        value={phone}
        onChangeText={setPhone}
      />

      <CustomTextInput
        label="Password"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry={true}
        showPassword={showPassword}
        onPressEye={handleShowPassword}
      />
      <CustomTextInput
        label="Confirm password"
        value={cpwd}
        onChangeText={setCpwd}
        secureTextEntry={true}
        showPassword={showConfirmPassword}
        onPressEye={handleShowConfirmPassword}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          marginTop: 20,
        }}>
        {/* show date picker */}
        <Text style={{fontSize: 18, marginRight: 10}}>Date of Birth:</Text>
        <Text style={{fontSize: 18, marginRight: 10, color: 'black'}}>
          {formatDate(birthday)}
        </Text>

        <Pressable onPress={() => setOpen(true)}>
          <SvgIcons name="edit" width={18} height={18} />
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
          {i18n.t('Complete')}
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;
