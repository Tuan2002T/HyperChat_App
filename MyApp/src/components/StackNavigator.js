// MainStackNavigator.js
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import Chat from '../screens/ChatScreen';

const Stack = createStackNavigator();

const MainStackNavigator = ({logout}) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      console.log("Logout function is not provided!");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeState = navigation.getRootState(); // Lấy trạng thái gốc của navigation
      console.log(routeState); // Log ra trạng thái gốc của navigation
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainTabNavigator} logout={handleLogout}/>
      <Stack.Screen name="Chat" component={Chat} />

    </Stack.Navigator>
  );
};

export default MainStackNavigator;
