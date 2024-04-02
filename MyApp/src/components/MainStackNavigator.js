//src/components/MainStackNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import ChatScreen from '../views/ChatScreen';
import SubChatScreen from '../views/SubChatScreen';
import NewMessageScreen from '../views/NewMessageScreen';
import SettingScreen from '../views/SettingScreen';
import MyInfoScreen from '../views/MyInfoScreen';


const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="SubChatScreen" component={SubChatScreen} />
      <Stack.Screen name="NewMessageScreen" component={NewMessageScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="MyInfoScreen" component={MyInfoScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
