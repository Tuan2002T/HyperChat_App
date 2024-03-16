// MainTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ContactScreen from '../screens/ContactScreen';
import MeScreen from '../screens/MeScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    // initialRouteName="Me"
    screenOptions={{headerShown: false}}>
    {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
    <Tab.Screen name="Messages" component={MessagesScreen} />
    <Tab.Screen name="Contact" component={ContactScreen} />
    <Tab.Screen name="Me" component={MeScreen} />
    <Tab.Screen name="Details" component={DetailScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
