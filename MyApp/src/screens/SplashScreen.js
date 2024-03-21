import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/authSlice';
import { changeScreen } from '../redux/screenSlice';
import PngIcons from '../assets/PngIcons';
import i18n from '../i18n/i18n';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';
import LanguageSelector from '../components/LanguageSelector ';
import AnimatedCircle from '../components/AnimatedCircle';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const SplashScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showButtons, setShowButtons] = useState(!isLoggedIn);
  const [currentLanguage, setCurrentLanguage] = useState('en'); // State to store the current language

  useEffect(() => {
    // Load language from AsyncStorage when the component mounts
    const loadLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem('language');
        if (language) {
          setCurrentLanguage(language);
          i18n.changeLanguage(language);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async newLanguage => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      setCurrentLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const renderIcon = iconSource => {
    return currentLanguage === iconSource ? (
      <Image source={PngIcons[iconSource]} style={{ width: 50, height: 50 }} />
    ) : null;
  };

  return (
    <View style={styles.container}>
      {showButtons && (
        <View style={styles.iconContainer}>
          {renderIcon('vi')}
          {renderIcon('en')}
        </View>
      )}
      <AnimatedCircle />
      {showButtons && (
        <View style={styles.buttonContainer}>
          <LoginButton handleLogin={() => dispatch(changeScreen('Login'))} />
          <RegisterButton
            handleRegister={() => dispatch(changeScreen('Register'))}
          />
          <LanguageSelector
            currentLanguage={currentLanguage}
            toggleLanguage={toggleLanguage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '95%',
    alignItems: 'flex-end',
    padding: 10,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
  },
});

export default SplashScreen;
