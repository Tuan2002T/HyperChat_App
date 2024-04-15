import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'react-native-paper';
import { changeScreen } from '../redux/screenSlice';
import CustomHeader from '../components/CustomHeader';
import CustomConfirmDialog from '../components/custom/CustomConfirmDialog';
import { SharedElement } from 'react-navigation-shared-element';
import { socket } from '../socket/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: '', message: '' });

  const openConfirmDialog = () => {
    setDialogMessage({ title: 'Logout', message: 'Do you want to logout?' });
    setConfirmVisible(true);
  };

  const hideConfirmDialog = () => {
    setConfirmVisible(false);
  };

  const handleLogout = () => {
    console.log('Perform logout from the application');

    AsyncStorage.setItem('isLogin', 'false');

    dispatch(changeScreen('Splash'));
    socket.emit('userOffline', user._id);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Settings"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
      />

      <View style={styles.userInfoContainer}>
        <SharedElement id="avatar">
          <Pressable onPress={() => handleNavigation('MyInfoScreen')}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          </Pressable>
        </SharedElement>
        <Text style={styles.fullName}>{user.fullname}</Text>
        <Text style={styles.phoneNumber}>{user.email} ({user.phoneNumber})</Text>
      </View>

      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigation(item.screen)}
        >
          <Icon source={item.icon} size={30} />
          <Text style={styles.menuText}>{item.title}</Text>
        </Pressable>
      ))}

      <View style={styles.logoutButtonContainer}>
        <Button
          style={styles.logoutButton}
          icon="logout"
          mode="contained"
          labelStyle={styles.logoutButtonText}
          onPress={openConfirmDialog}
        >
          Logout
        </Button>
      </View>
      
      <CustomConfirmDialog
        visible={confirmVisible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideConfirmDialog}
        next={handleLogout}
      />
    </View>
  );
};

const menuItems = [
  { title: 'Profile', screen: 'MyInfoScreen', icon: 'account' },
  { title: 'Change Password', screen: 'ChangePasswordScreen', icon: 'lock' },
  { title: 'Friend', screen: 'FriendScreen', icon: 'account-multiple' },
  { title: 'Group', screen: 'GroupScreen', icon: 'account-group' },
  { title: 'Language', screen: 'LanguageScreen', icon: 'cog' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  userInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'gray',
  },
  menuItem: {
    width: '90%',
    height: 50,
    backgroundColor: '#E5E5E5',
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  menuText: {
    paddingLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  logoutButtonContainer: {
    width: '90%',
    marginTop: 20,
  },
  logoutButton: {
    borderRadius: 9999,
    justifyContent: 'center',
    backgroundColor: '#EF4040',
  },
  logoutButtonText: {
    fontSize: 18,
  },
});

export default SettingScreen;
