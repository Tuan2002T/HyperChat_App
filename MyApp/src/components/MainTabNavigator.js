import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgIcons from '../assets/SvgIcons';

import MessagesScreen from '../views/MessagesScreen';
import ContactScreen from '../views/ContactScreen';
import SettingScreen from '../views/SettingScreen';
import CallScreen from '../views/CallScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const tabBarIcons = {
    Chats: {focus: 'focus_messages', default: 'default_messages'},
    Calls: {focus: 'focus_calls', default: 'default_calls'},
    Contacts: {focus: 'focus_contacts', default: 'default_contacts'},
    Settings: {focus: 'focus_settings', default: 'default_settings'},
  };

  const getTabBarIcon = (route, focused) => {
    const {name} = route;
    const {focus, default: defaultIcon} = tabBarIcons[name];
    const iconName = focused ? focus : defaultIcon;
    return <SvgIcons name={iconName} width={24} height={24} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => getTabBarIcon(route, focused),
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: '#76ABAE',
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen name="Chats" component={MessagesScreen} />
      <Tab.Screen name="Calls" component={CallScreen} />
      <Tab.Screen name="Contacts" component={ContactScreen} />
      {/* <Tab.Screen name="Settings" component={SettingScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
