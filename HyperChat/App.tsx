// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Image } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import LoginScreen2 from './Screens/LoginScreen2';
import SingUpScreen from './Screens/SingUpScreen';
import MessageScreen from './Screens/MessageScreen';
import CallScreen from './Screens/CallScreen';
import ContactScreen from './Screens/ContactScreen';
import SettingScreen from './Screens/SettingScreen';

import messageIcon from './Images/IconBottomTab/Message.png';
import messageIconFocus from './Images/IconBottomTab/MessageFocus.png';
import callIcon from './Images/IconBottomTab/Call.png';
import callIconFocus from './Images/IconBottomTab/CallFocus.png';
import contactIcon from './Images/IconBottomTab/Contact.png';
import contactIconFocus from './Images/IconBottomTab/ContactFocus.png';
import settingIcon from './Images/IconBottomTab/Setting.png';
import settingIconFocus from './Images/IconBottomTab/SettingFocus.png';
import UserProfile from './Screens/UserProfile';
import Message from './Screens/Message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle:{
          height: 50,       
        },
        tabBarActiveTintColor: 'black',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === 'Message') {
            iconName = focused ? <Image style={{ width: 25, height: 25 }} source={messageIconFocus} /> : <Image style={{ width: 25, height: 25 }} source={messageIcon} />;
          } else if (rn === 'Call') {
            iconName = focused ? <Image style={{ width: 23, height: 23 }} source={callIconFocus} /> : <Image style={{ width: 23, height: 23 }} source={callIcon} />;
          } else if (rn === 'Contact') {
            iconName = focused ? <Image style={{ width: 25, height: 25 }} source={contactIconFocus} /> : <Image style={{ width: 25, height: 25 }} source={contactIcon} />;
          } else if (rn === 'Setting') {
            iconName = focused ? <Image style={{ width: 25, height: 25 }} source={settingIconFocus} /> : <Image style={{ width: 25, height: 25 }} source={settingIcon} />;
          }
          return iconName;
        }
      })}
    >
      <Tab.Screen name="Message" component={MessageScreen} options={{ headerShown: false, tabBarLabelStyle:{fontSize:12} }} />
      <Tab.Screen name="Call" component={CallScreen} options={{ headerShown: false, tabBarLabelStyle:{fontSize:12} }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{ headerShown: false, tabBarLabelStyle:{fontSize:12} }} />
      <Tab.Screen name="Setting" component={SettingScreen} options={{ headerShown: false, tabBarLabelStyle:{fontSize:12} }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Login2" component={LoginScreen2} />
        <Stack.Screen name="SignUp" component={SingUpScreen} />

        <Stack.Screen name="Main" component={TabScreens} />
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="ViewMessage" component={Message} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;