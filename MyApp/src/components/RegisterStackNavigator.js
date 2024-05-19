import React from 'react';
import RegisterScreen from '../views/Register/RegisterScreen';
import AuthScreen from '../views/Register/AuthScreen';
import EmailInputScreen from '../views/Register/EmailInputScreen';
import CreateProfileScreen from '../views/CreateProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EmailInput" component={EmailInputScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Profile" component={CreateProfileScreen} />
    </Stack.Navigator>
  );
};

export default RegisterStackNavigator;
