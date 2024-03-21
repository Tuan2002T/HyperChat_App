// StackRegisterNavigation.js
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from '../screens/RegisterScreen';
import Auth from '../screens/AuthScreen';
import Profile from '../screens/CreateProfileScreen';

const Stack = createStackNavigator();

const StackRegisterNavigation = () => {
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
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register">
        {props => <Register {...props} goBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default StackRegisterNavigation;
