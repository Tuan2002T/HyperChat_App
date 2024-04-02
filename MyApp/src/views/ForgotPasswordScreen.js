//scr/views/ForgotPasswordScreen.js
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import {Button, Dialog, Portal, Text, Divider} from 'react-native-paper';
import CustomDialog from '../components/custom/CustomDialog';

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');

  const [visible, setVisible] = React.useState(false);
  const showDialog = (title, message) => {
    setVisible(true);
    setDialogMessage({title, message});
  };
  const hideDialog = () => setVisible(false);

  const handleGoBack = () => {
    dispatch(changeScreen('Login'));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    console.log('Show confirm password: ', showConfirmPassword);
  };

  const validateEmail = email => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGetOTP = () => {
    // Validate email format
    if (!validateEmail(email)) {
      showDialog('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Trigger OTP generation logic
    console.log('Get OTP');
  };

  const checkPassword = () => {
    if (pwd === '') {
      showDialog('Empty Password', 'Please enter a password.');
      return false;
    }

    if (cpwd === '') {
      showDialog('Empty Password', 'Please enter a confirm password.');
      return false;
    }
    if (pwd !== cpwd) {
      showDialog('Passwords Mismatch', 'The passwords do not match.');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateEmail(email)) {
      showDialog('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!checkPassword()) return;
    dispatch(changeScreen('Login'));
  };
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});

  return (
    <View style={{alignItems: 'center'}}>
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <Header
        title={i18n.t('Forgotten Password')}
        handleGoBack={handleGoBack}
        indicator={false}
      />
      <CustomTextInput label="Email" value={email} onChangeText={setEmail} />
      <CustomTextInput
        label="New password"
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

      <TextInput
        style={{
          width: '90%',
          borderBottomWidth: 0.5,
          borderColor: 'grey',
          backgroundColor: '#eee',
          fontSize: 16,
          marginTop: 20,
        }}
        textAlign="center"
        maxLength={6}
        label="OTP"
        keyboardType="numeric"
        onChangeText={setOTP}
        placeholder="OTP"
      />

      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginTop: 10,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: null,
          }}
          mode="contained"
          labelStyle={{fontSize: 16, color: '#76ABAE'}}
          onPress={handleGetOTP}>
          {i18n.t('Get OTP')}
        </Button>
      </View>
      <View style={{width: '90%', marginVertical: 10}}>
        <Divider bold="true" />
      </View>
      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginTop: 10,
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

export default ForgotPasswordScreen;
