// src/screens/RegisterScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import SvgIcons from '../assets/SvgIcons';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import DatePicker from 'react-native-date-picker';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import {Button} from 'react-native-paper';
import {registerUser} from '../api/registerUser';
import CustomDialog from '../components/custom/CustomDialog';

const RegisterScreen = ({navigation}) => {
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

  const [log, setLog] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  };

  useEffect(() => {
    console.log('Register Screen');
  }, [setLog]);

  const handleContinue = async () => {
    //check not null
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      pwd === '' ||
      cpwd === ''
    ) {
      showDialog('Input', 'Please enter all information.');
      return;
    }

    //check password

    const res = await registerUser(pwd, name, email, phone, birthday);
    if (res.status === 200) {
      //save email to async storage:

      console.log(email);
      navigation.navigate('Auth', {email});



      
    }
    showDialog('Register', res.data.message);
  };

  handleGoVerify = async () => {
    //save email to async storage
    console.log(email);
    navigation.navigate('Verify', {email});
  };

  const handleBack = () => {
    dispatch(changeScreen('Splash'));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    console.log('Show confirm password: ', showConfirmPassword);
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
      <CustomTextInput label="Full name" value={name} onChangeText={setName} />
      <CustomTextInput label="Email" value={email} onChangeText={setEmail} />
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
          {i18n.t('Continue')}
        </Button>
      </View>
      <View>{/* show respone data */}</View>
    </View>
  );
};

export default RegisterScreen;
