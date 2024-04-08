import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'; // Import thư viện shared element

import MainTabNavigator from './MainTabNavigator';
import ChatScreen from '../views/ChatScreen';
import SubChatScreen from '../views/SubChatScreen';
import NewMessageScreen from '../views/NewMessageScreen';
import SettingScreen from '../views/SettingScreen';
import MyInfoScreen from '../views/MyInfoScreen';
import ChangePasswordScreen from '../views/ChangePasswordScreen';

const Stack = createSharedElementStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="SubChatScreen"
        component={SubChatScreen}
        options={{
          gestureDirection: 'horizontal', // Thiết lập hướng chuyển trang
          gestureEnabled: true, // Cho phép gesture
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen name="NewMessageScreen" component={NewMessageScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          gestureDirection: 'horizontal', // Thiết lập hướng chuyển trang
          gestureEnabled: true, // Cho phép gesture
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="MyInfoScreen"
        component={MyInfoScreen}
        options={{
          transitionSpec: {
            open: {
              animation: 'timing',
            },
            close: {
              animation: 'timing',
            },
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
