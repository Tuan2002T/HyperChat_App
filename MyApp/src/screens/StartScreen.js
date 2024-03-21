import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, selectLanguage } from '../redux/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';
import PngIcons from '../assets/PngIcons';
import SvgIcons from '../assets/SvgIcons';

const StartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const handleLogin = () => {
    navigation.navigate('Login');
    console.log('-> StartScreen: handleLogin');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
    console.log('-> StartScreen: handleRegister');
  };

  const toggleLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      dispatch(changeLanguage(newLanguage));
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error in toggleLanguage:', error);
    }
  };

  const renderIcon = (iconSource) => {
    if (currentLanguage === iconSource) {
      return (
        <Pressable onPress={() => toggleLanguage(iconSource)} style={{ paddingHorizontal: 5 }}>
          <Image source={PngIcons[iconSource]} style={{ width: 50, height: 50 }} />
        </Pressable>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', zIndex: -1 }}>
        {renderIcon('vi')}
        {renderIcon('en')}
      </View>

      <View style={{ width: '100%', height: 200 }}>
        <SvgIcons name="logo" width={'100%'} height={'100%'} />
      </View>

      <View style={{ position: 'absolute', bottom: '10%', width: '90%' }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 999,
          })}
          onPress={handleLogin}>
          {({ pressed }) => <Text style={{ fontSize: 20 }}>{t('Login')}</Text>}
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 999,
          })}
          onPress={handleRegister}>
          {({ pressed }) => (
            <Text style={{ fontSize: 20 }}>{t('Create new account')}</Text>
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
        <Pressable onPress={() => toggleLanguage('vi')}>
          <Text style={{ marginTop: 10, fontSize: 20, color: currentLanguage === 'vi' ? 'grey' : 'black' }}>
            Tiếng Việt
          </Text>
        </Pressable>
        <Pressable onPress={() => toggleLanguage('en')}>
          <Text style={{ marginTop: 10, fontSize: 20, color: currentLanguage === 'en' ? 'grey' : 'black' }}>
            English
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StartScreen;
