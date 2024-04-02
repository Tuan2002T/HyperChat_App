//src/views/SplashScreen.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {changeScreen} from '../redux/screenSlice';
import PngIcons from '../assets/PngIcons';
import i18n from '../i18n/i18n';
import LanguageSelector from '../components/LanguageSelector ';
import AnimatedCircle from '../components/animated/AnimatedCircle';
import styles from '../css/Styles';
import {Button} from 'react-native-paper';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const SplashScreen = () => {
  const dispatch = useDispatch();
  
  const [showButtons, setShowButtons] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
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
    delay(1).then(() => setShowButtons(true));
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
      <Image source={PngIcons[iconSource]} style={{width: 50, height: 50}} />
    ) : null;
  };

  return (
    <View style={styles.container}>
      <AnimatedCircle />
      {showButtons && (
        <>
          <View style={styles.iconContainer}>
            {renderIcon('vi')}
            {renderIcon('en')}
          </View>
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
