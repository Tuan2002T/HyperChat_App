import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from '../screens/MessagesScreen';
import ContactScreen from '../screens/ContactScreen';
import MeScreen from '../screens/MeScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
        <Tab.Screen name="Me" component={MeScreen}/>
        <Tab.Screen name="Details" component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;
