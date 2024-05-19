// src/screens/RegisterScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import i18n from '../../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../../redux/screenSlice';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import {Button} from 'react-native-paper';
import CustomDialog from '../../components/custom/CustomDialog';
import {registerUser} from '../../api/registerUser';

const EmailInputScreen = ({navigation}) => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [email]);

  const validateForm = () => {
    let errors = {};

    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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

  const handleContinue = async () => {
    let originalNumber = new Date().getTime();
    let originalNumberStr = originalNumber.toString().substring(5, 13);
    const modifiedNumberStr = '09' + originalNumberStr;

    if (isFormValid) {
      try {
        const res = await registerUser(
          'HyperCh@t#24',
          'Your name',
          email.toLowerCase(),
          modifiedNumberStr,
          new Date(),
        );

        if (res.status === 400) {
          showDialog('Notify', i18n.t('Email is already in use!'));
        } else if (res.status === 200) {
          
          params = email.toLowerCase();
          params2 = modifiedNumberStr;

          navigation.navigate('Auth', {params, params2});
          console.log('Successfully!', params);
        } else {
          console.log(`Unexpected response status: ${res.status}`);
          showDialog(
            'Notify',
            i18n.t('An unexpected error occurred. Please try again.'),
          );
        }
      } catch (error) {
        console.error('Registration error:', error);
        showDialog(
          'Notify',
          i18n.t(
            'An error occurred during registration. Please try again later.',
          ),
        );
      }
    } else {
      console.log('Form has errors. Please correct them.');
      showDialog('Notify', i18n.t('Please enter your email address!'));
    }
  };

  const handleBack = () => {
    dispatch(changeScreen('Splash'));
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      <Header
        title={i18n.t('Register')}
        handleGoBack={handleBack}
        indicator={false}
      />
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <Text style={{fontSize: 20, marginTop: 20}}>
        {i18n.t('Please enter your email address!')}
      </Text>

      <CustomTextInput label="Email" value={email} onChangeText={setEmail} />

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
    </View>
  );
};

export default EmailInputScreen;
