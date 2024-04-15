import React from 'react';
import {TransitionSpecs, createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'; // Import thư viện shared element

import MainTabNavigator from './MainTabNavigator';
import ChatScreen from '../views/ChatScreen';
import SubChatScreen from '../views/SubChatScreen';
import NewMessageScreen from '../views/NewMessageScreen';
import SettingScreen from '../views/SettingScreen';
import MyInfoScreen from '../views/MyInfoScreen';
import ChangePasswordScreen from '../views/ChangePasswordScreen';
import forwardMessages from '../views/forwardMessages';
import MessageChatGroup from '../views/MessageChatGroup';
import ChatInformation from '../views/ChatInformation';
import MediaMessage from '../views/Chat/MediaMessage';
import MembersChat from '../views/Chat/MembersChat';
import AddMembersGroup from '../views/Chat/AddMembersGroup';
import NewGroup from '../views/NewGroupScreen';

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

      <Stack.Screen name="forwardMessages" component={forwardMessages} />
      <Stack.Screen name="messageChatGroup" component={MessageChatGroup} />
      <Stack.Screen name="NewGroup" component={NewGroup} />
      <Stack.Screen name="ChatInformation" component={ChatInformation}
      options={{
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: ({ current, layouts }) => {
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
            containerStyle: {
              backgroundColor: 'transparent',
            },
          };
        },
      }} 
      />
      <Stack.Screen name="MediaMessage" component={MediaMessage} />
      <Stack.Screen name="MembersChat" component={MembersChat} />
      <Stack.Screen name="AddMembersGroup" component={AddMembersGroup} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
