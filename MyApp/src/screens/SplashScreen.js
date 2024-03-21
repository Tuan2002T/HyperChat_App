// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserToken, setIsLoggedIn } from '../redux/actions';
import SvgIcons from '../assets/SvgIcons';

const { width, height } = Dimensions.get("window");
const circleWidth = width / 2;

const SplashScreen = ({ navigation }) => {

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  console.log('SplashScreen');
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      // Kiểm tra trạng thái đăng nhập
      if (userToken || isLoggedIn) {
        dispatch(setUserToken(userToken));
        dispatch(setIsLoggedIn(true));
        console.log("true");
        // navigation.replace('Main');
      } else {
        console.log("false");
        // navigation.replace('Start');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
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
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ])
  ).start();
  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: textOpacity,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Inhale
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: exhale,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Exhale
        </Text>
      </Animated.View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });
        return (
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: "purple",
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFill,
              transform: [
                {
                  rotateZ: rotation,
                },
                { translateX: translate },
                { translateY: translate },
              ],
            }}
          ></Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    left: width / 4,
    top: height / 4,
  },
});

export default SplashScreen;
