//src/views/SplashScreen.js
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import i18n from '../i18n/i18n';
import LanguageSelector from '../components/LanguageSelector ';
import AnimatedCircle from '../components/animated/AnimatedCircle';
import styles from '../css/Styles';
import {Button} from 'react-native-paper';
import {allUsers, getRequests, getMyFriends} from '../api/allUser';
import {loginUser} from '../api/loginUser';
import {loginUserSuccess} from '../redux/authSlice';
import {setMe, setFriends, setFriendRequests} from '../redux/socialSlice';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const SplashScreen = () => {
  console.log('[SPLASH]');
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
    const loadLanguageAndLoginStatus = async () => {
      try {
        const language = await AsyncStorage.getItem('language');
        const isLogin = await AsyncStorage.getItem('isLogin');
        setIsLogin(isLogin);
        const userInfo = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(userInfo));
        const passwordInfo = await AsyncStorage.getItem('@password');
        setPassword(JSON.parse(passwordInfo));
        if (language) {
          setCurrentLanguage(language);
          i18n.changeLanguage(language);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguageAndLoginStatus();
    dispatch(allUsers());
  }, []);

  console.log('[SPLASH] isLogin:', isLogin, '-user:', user, '-pwd:', password);

  useEffect(() => {
    if (isLogin === 'true' && user && password) {
      handleLogin();
      console.log('[SPLASH] Auto login');
    }
    delay(2000).then(() => {
      setShowButtons(true);
    });
  }, [isLogin, user, password]);

  const handleLogin = async () => {
    try {
      const res = await loginUser(user, password);
      dispatch(loginUserSuccess(res));
      dispatch(setMe(res));

      const requests = await getRequests(res._id);
      dispatch(setFriendRequests(requests));

      const friends = await getMyFriends(res._id, res.token);
      dispatch(setFriends(friends));

      handleGotoChat();
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  const handleGotoChat = () => {
    dispatch(changeScreen('Main'));
  };

  const toggleLanguage = async newLanguage => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      i18n.changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
      console.log('[SPLASH] Language changed to:', newLanguage);
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedCircle />
      {showButtons && (
        <>
          <View style={styles.iconContainer}></View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.firstButton}
              mode="contained"
              labelStyle={{fontSize: 18}}
              onPress={() => {
                dispatch(changeScreen('Login'));
              }}>
              {i18n.t('Login')}
            </Button>
            <Button
              style={styles.secondButton}
              mode="contained"
              labelStyle={{fontSize: 18, color: '#76ABAE'}}
              onPress={() => {
                dispatch(changeScreen('Register'));
              }}>
              {i18n.t('Create new account')}
            </Button>
            <LanguageSelector
              currentLanguage={currentLanguage}
              toggleLanguage={toggleLanguage}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SplashScreen;
