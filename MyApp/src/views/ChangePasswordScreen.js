//scr/views/ForgotPasswordScreen.js
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import i18n from '../i18n/i18n';
import {useDispatch} from 'react-redux';
import {Button, Divider} from 'react-native-paper';
import CustomDialog from '../components/custom/CustomDialog';
import CustomConfirmOnlyDialog from '../components/custom/CustomConfirmOnlyDialog';
import {sendOTPForgotPwd, verifyOTPForgotPwd} from '../api/forgotPwd';
import {useSelector} from 'react-redux';
import {changePassword} from '../api/changePassword';

const ChangePasswordScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');

  const [visible, setVisible] = React.useState(false);
  const showDialog = (title, message) => {
    setVisible(true);
    setDialogMessage({title, message});
  };
  const hideDialog = () => setVisible(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    console.log('Show confirm password: ', showConfirmPassword);
  };


  const handleContinue = () => {
    if (pwd === '') {
      showDialog('Empty Password', 'Please enter a password.');
      return;
    }

    if (cpwd === '') {
      showDialog('Empty Password', 'Please enter a confirm password.');
      return;
    }

    if (pwd === cpwd) {
      return showDialog(
        'Password Mismatch',
        'New password different old password.',
      );
    }

    // const res = verifyOTPForgotPwd(user.email, OTP, pwd);
    res = changePassword(user._id, pwd, cpwd);

    setTimeout(() => {
      const text = res._j.data.message;
      console.log(text);
      if (res._j.status === 200) {
        showConfirmDialog('Success', text);
      } else {
        showDialog('Failed', text);
      }
    }, 500);
  };
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});

  const [ConfirmVisible, setConfirmVisible] = React.useState(false);
  const showConfirmDialog = (title, message) => {
    setConfirmVisible(true);
    setDialogMessage({title, message});
  };

  return (
    <View style={{alignItems: 'center'}}>
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <CustomConfirmOnlyDialog
        visible={ConfirmVisible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        next={handleGoBack}
      />
      <Header
        title={i18n.t('Change Password')}
        handleGoBack={handleGoBack}
        indicator={false}
      />

      <CustomTextInput
        label="Old Password"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry={true}
        showPassword={showPassword}
        onPressEye={handleShowPassword}
      />
      <CustomTextInput
        label="New password"
        value={cpwd}
        onChangeText={setCpwd}
        secureTextEntry={true}
        showPassword={showConfirmPassword}
        onPressEye={handleShowConfirmPassword}
      />

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

export default ChangePasswordScreen;
