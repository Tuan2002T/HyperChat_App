import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import AuthScreen from '../screens/AuthScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const RegisterStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Profile" component={CreateProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RegisterStackNavigator;
