// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from '../screens/MessagesScreen';
import ContactScreen from '../screens/ContactScreen';
import MeScreen from '../screens/MeScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ logout }) => {
  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      console.log("Logout function is not provided!!");
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Me">
        {props => <MeScreen {...props} onLogout={handleLogout} />} 
      </Tab.Screen>
      <Tab.Screen name="Details" component={DetailScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
