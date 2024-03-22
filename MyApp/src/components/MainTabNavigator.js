import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from '../screens/MessagesScreen';
import ContactScreen from '../screens/ContactScreen';
import MeScreen from '../screens/MeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingScreen from '../screens/SettingScreen';
import CallScreen from '../screens/CallScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Calls" component={CallScreen}/>
        <Tab.Screen name="Contacts" component={ContactScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;
