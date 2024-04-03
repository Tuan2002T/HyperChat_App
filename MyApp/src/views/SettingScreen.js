import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {changeScreen} from '../redux/screenSlice';
import {useDispatch} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Button, Icon} from 'react-native-paper';
import CustomConfirmDialog from '../components/custom/CustomConfirmDialog';
import {SharedElement} from 'react-navigation-shared-element';

const SettingScreen = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [ConfirmVisible, setConfirmVisible] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState({
    title: '',
    message: '',
  });

  const openConfirmDialog = () => {
    setDialogMessage({
      title: 'Logout',
      message: 'Do you want to logout?',
    });
    setConfirmVisible(true);
  };

  const hideConfirmDialog = () => {
    setConfirmVisible(false);
  };

  const handleLogout = () => {
    console.log('Thực hiện đăng xuất khỏi ứng dụng');
    dispatch(changeScreen('Splash'));
  };

  const handleGoBack = () => {
    // Quay lại màn hình trước đó
    navigation.goBack();
  };

  const handleMyInfo = () => {
    navigation.navigate('MyInfoScreen');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Settings"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
      />

      <View style={{marginVertical: 20, alignItems: 'center'}}>
        <SharedElement id="avatar">
          <Pressable onPress={handleMyInfo}>
            <Image
              source={{uri: user.avatar}}
              style={{width: 150, height: 150, borderRadius: 50}}
            />
          </Pressable>
        </SharedElement>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
          {user.fullname}
        </Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{user.phoneNumber}</Text>
      </View>

      <Pressable
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#E5E5E5',
          marginBottom: 20,
          borderRadius: 10,
          alignItems: 'center',
          paddingLeft: 10,
          flexDirection: 'row',
        }} onPress={handleMyInfo}>
        <Icon source="account" size={30} />
        <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
          Profile
        </Text>
      </Pressable>
      <Pressable
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#E5E5E5',
          marginBottom: 20,
          borderRadius: 10,
          alignItems: 'center',
          paddingLeft: 10,
          flexDirection: 'row',
        }} onPress={handleChangePassword}>
        <Icon source="lock" size={30} />
        <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
          Change Password
        </Text>
      </Pressable>

      <Pressable
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#E5E5E5',
          marginBottom: 20,
          borderRadius: 10,
          alignItems: 'center',
          paddingLeft: 10,
          flexDirection: 'row',
        }} onPress={handleMyInfo}>
        <Icon source="account-multiple" size={30} />
        <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
          Friend
        </Text>
      </Pressable>


      <View style={{width: '90%'}}>
        <Button
          style={{
            marginTop: 20,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#EF4040',
          }}
          icon="logout"
          mode="contained"
          labelStyle={{fontSize: 18}}
          onPress={openConfirmDialog}>
          Logout
        </Button>
      </View>
      <CustomConfirmDialog
        visible={ConfirmVisible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideConfirmDialog}
        next={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
