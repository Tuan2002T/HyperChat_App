import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgIcons from '../assets/SvgIcons';

import MessagesScreen from '../views/MessagesScreen';
import ContactScreen from '../views/ContactScreen';
import SettingScreen from '../views/SettingScreen';
import CallScreen from '../views/CallScreen';
import { socket } from '../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSuccess } from '../redux/userSlice';
import { allUsers, allUsers1, getRequests } from '../api/allUser';
import { setFriendRequests } from '../redux/socialSlice';
import { showMessage } from 'react-native-flash-message';

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
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const me = useSelector(state => state.social.me);
  useEffect(() => {
          socket.on('newUserRegister', (data) => {
            allUsers1().then((res) => {
              // dispatch(getUsersSuccess(res));
              // const addNewUser = [...res, data]\
              console.log('New usersssssss:', res);
              dispatch(getUsersSuccess(res))
            });
          });
  }, []);

  useEffect(() => {
    socket.on('receiveFriendRequest', async data => {
          console.log('Me:', me._id);
          console.log('Receive friend request:', data); 
          showMessage({
            message: data,
            description: 'This is our second message',
            type: 'success',
          });
          const res = await getRequests(me._id);
          console.log('Friend requests:', res);
          dispatch(setFriendRequests(res));
    });
  }, []);
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
