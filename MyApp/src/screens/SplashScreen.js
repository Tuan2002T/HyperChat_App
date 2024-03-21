// src/screens/SplashScreen.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, selectLanguage } from '../redux/languageSlice';
import SvgIcons from '../assets/SvgIcons';
import PngIcons from '../assets/PngIcons';
import i18n from '../i18n/i18n';

const {width, height} = Dimensions.get('window');
const circleWidth = width / 2;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const SplashScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log('handleLogin');
  };

  const handleRegister = () => {
    console.log('handleRegister');
   
  };

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [showButtons, setShowButtons] = useState(!isLoggedIn);
  const currentLanguage = useSelector(selectLanguage);

  const animation = useMemo(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            delay: 100,
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: 1000,
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
  }, []);


  useEffect(() => {
    animation.start();
    return () => {
      animation.stop();
    };
  }, [animation]);

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const renderIcon = iconSource => {
    if (currentLanguage === iconSource) {
      return (
        <Image source={PngIcons[iconSource]} style={{width: 50, height: 50}} />
      );
    } else {
      return null;
    }
  };

  const toggleLanguage = async newLanguage => {
    console.log('newLanguage', newLanguage);
    try {
      await AsyncStorage.setItem('language', newLanguage);
      dispatch(changeLanguage(newLanguage));
      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error in toggleLanguage:', error);
    }
  };


  return (
    <View style={styles.container}>
      {showButtons && (
        <View style={{width: '95%', alignItems: 'flex-end', padding: 10}}>
          {renderIcon('vi')}
          {renderIcon('en')}
        </View>
      )}

      <View
        style={{
          position: 'absolute',
          top: height / 3,
          width: width / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: textOpacity,
          }}>
          <SvgIcons name="logo" width={circleWidth} height={circleWidth} />
        </Animated.View>
        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: exhale,
          }}>
          <SvgIcons name="logo" width={circleWidth} height={circleWidth} />
        </Animated.View>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
          const rotation = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });
          return (
            <Animated.View
              key={item}
              style={{
                opacity: 0.1,
                backgroundColor: 'black',
                width: circleWidth,
                height: circleWidth,
                borderRadius: circleWidth / 2,
                ...StyleSheet.absoluteFill,
                transform: [
                  {
                    rotateZ: rotation,
                  },
                  {translateX: translate},
                  {translateY: translate},
                ],
              }}></Animated.View>
          );
        })}
      </View>
      {showButtons && (
        <View
          style={{
            width: '90%',
            alignItems: 'center',
          }}>
          <Pressable
            style={({pressed}) => ({
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              marginBottom: 20,
              borderRadius: 999,
            })}
            onPress={handleLogin}>
            {({pressed}) => (
              <Text style={{fontSize: 20}}>{i18n.t('Login')}</Text>
            )}
          </Pressable>

          <Pressable
            style={({pressed}) => ({
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              marginBottom: 20,
              borderRadius: 999,
            })}
            onPress={handleRegister}>
            {({pressed}) => (
              <Text style={{fontSize: 20}}>{i18n.t('Create new account')}</Text>
            )}
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              bottom: '5%',
              justifyContent: 'space-between',
            }}>
            <Pressable onPress={() => toggleLanguage('vi')}>
              <Text
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  fontSize: 20,
                  color: currentLanguage === 'vi' ? 'grey' : 'black',
                }}>
                Tiếng Việt
              </Text>
            </Pressable>
            <Pressable onPress={() => toggleLanguage('en')}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  color: currentLanguage === 'en' ? 'grey' : 'black',
                }}>
                English
              </Text>
            </Pressable>
          </View>
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
});

export default SplashScreen;
