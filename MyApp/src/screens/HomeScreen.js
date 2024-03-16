// src/screens/HomeScreen.js
import React, {useState} from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import SvgIcons from '../assets/SvgIcons';
import PngIcons from '../assets/PngIcons';
import i18n from '../i18n/i18n';

const HomeScreen = () => {
  const {t, i18n} = useTranslation();

  const toggleLanguage = () => {
    try {
      const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error in toggleLanguage:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '100%', height: 200}}>
        <SvgIcons name="logo" width={'100%'} height={'100%'} />
      </View>

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

      <View style={{position: 'absolute', top: 100, left: 100}}>
        <Text style={{fontSize: 32}}>{t('Hello')}</Text>
      </View>
    </View>
  );

  function renderIcon(iconSource) {
    return (
      <Pressable onPress={toggleLanguage} style={{paddingHorizontal: 5}}>
        <Image source={iconSource} style={{width: 50, height: 50}} />
      </Pressable>
    );
  }
};

export default HomeScreen;
