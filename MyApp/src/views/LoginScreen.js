import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import {Button, Divider} from 'react-native-paper';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import {loginUser} from '../api/loginUser'; // Import loginUser function
import {loginUserSuccess} from '../redux/authSlice';
import CustomDialog from '../components/custom/CustomDialog';
import CustomConfirmDialog from '../components/custom/CustomConfirmDialog';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [indicator, setIndicator] = useState(false);

  const [username, setUsername] = useState('noname001');
  const [password, setPassword] = useState('Tuan@123');


  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      showDialog('Input', 'Please enter account information and password.');
      return;
    }

    try {
      const res = await loginUser(username, password);
      dispatch(loginUserSuccess(res));
      handleGotoChat();
    } catch (error) {
      showDialog("Login Fail", 'Account information or password not correct.');

    }
  };

  const handleGoBack = () => {
    dispatch(changeScreen('Splash'));
  };


  const openConfirmDialog = () => {
    showConfirmDialog('Create new account', 'Do you want to create a new account?');
  }

  const handleRegister = () => {
      dispatch(changeScreen('Register'));
  };

  const handleForgottenPassword = () => {
    dispatch(changeScreen('ForgotPassword'));
  };

  const handleGotoChat = () => {
    dispatch(changeScreen('Main'));
  };

  const [visible, setVisible] = React.useState(false);
  const showDialog = (title, message) => {
    setVisible(true);
    setDialogMessage({title, message});
  };
  const hideDialog = () => setVisible(false);

  const [ConfirmVisible, setConfirmVisible] = React.useState(false);
  const showConfirmDialog = (title, message) => {
    setConfirmVisible(true);
    setDialogMessage({title, message});
  };
  const hideConfirmDialog = () => setConfirmVisible(false);

  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      <Header
        title={i18n.t('Login')}
        handleGoBack={handleGoBack}
        indicator={indicator}
      />
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <CustomConfirmDialog
        visible={ConfirmVisible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideConfirmDialog}
        next={handleRegister}
      />
      <CustomTextInput
        label="Account information"
        placeholder="Username or email or phone number"
        value={username}
        onChangeText={setUsername}
      />

      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        showPassword={showPassword}
        onPressEye={handleShowPassword}
      />

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
          onPress={handleLogin}>
          {i18n.t('Login')}
        </Button>
      </View>

      <View style={{width: '90%', alignItems: 'center', marginTop: 10}}>
        <Pressable onPress={handleForgottenPassword}>
          <Text style={{color: '#76ABAE', fontSize: 16}}>
            {i18n.t('Forgotten password?')}
          </Text>
        </Pressable>
      </View>

      <View style={{width: '90%', marginVertical: 10}}>
        <Divider bold="true" />
      </View>

      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginVertical: 10,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#EEE',
          }}
          mode="contained"
          labelStyle={{fontSize: 18, color: '#76ABAE'}}
          onPress={openConfirmDialog}>
          {i18n.t('Create new account')}
        </Button>
      </View>

      {/*  */}
      <View style={{position: 'absolute', top: 10, right: 100}}>
        <Pressable onPress={handleGotoChat}>
          <Text>goToChat</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
