// MainStackNavigator.js
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import Splash from '../screens/SplashScreen';
import Start from '../screens/StartScreen';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Chat from '../screens/ChatScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeState = navigation.getRootState(); // Lấy trạng thái gốc của navigation
      console.log(routeState); // Log ra trạng thái gốc của navigation
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
