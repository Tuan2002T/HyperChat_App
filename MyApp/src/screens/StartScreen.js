import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgIcons from '../assets/SvgIcons';
import PngIcons from '../assets/PngIcons';
import i18n from '../i18n/i18n';

const StartScreen = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('language')
      .then(language => {
        if (language) {
          i18n.changeLanguage(language);
        }
      })
      .catch(error => {
        console.error('Error loading language:', error);
      });
  }, []);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const toggleLanguage = async () => {
    try {
      const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
      await AsyncStorage.setItem('language', newLanguage);
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error in toggleLanguage:', error);
    }
  };

  const renderIcon = iconSource => (
    <Pressable onPress={toggleLanguage} style={{paddingHorizontal: 5}}>
      <Image source={iconSource} style={{width: 50, height: 50}} />
    </Pressable>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          flexDirection: 'row',
          zIndex: -1,
        }}>
        {renderIcon(PngIcons.vi)}
        {renderIcon(PngIcons.en)}
      </View>

      <View style={{width: '100%', height: 200}}>
        <SvgIcons name="logo" width={'100%'} height={'100%'} />
      </View>

      <View style={{position: 'absolute', bottom: '10%', width: '90%'}}>
        <Pressable
          style={({pressed}) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 999,
          })}
          onPress={handleLogin}>
          {({pressed}) => <Text style={{fontSize: 20}}>{t('Login')}</Text>}
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 999,
          })}
          onPress={handleRegister}>
          {({pressed}) => (
            <Text style={{fontSize: 20}}>{t('Create new account')}</Text>
          )}
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: '40%',
          bottom: '5%',
          justifyContent: 'space-between',
        }}>
        <Pressable>
          <Text style={{marginTop: 10, fontSize: 20, color: 'blue'}}>
            Tiếng Việt
          </Text>
        </Pressable>
        <Pressable>
          <Text style={{marginTop: 10, fontSize: 20, color: 'blue'}}>
            English
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StartScreen;
