// src/screens/RegisterScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet, Alert} from 'react-native';
import SvgIcons from '../../assets/SvgIcons';
import i18n from '../../i18n/i18n';
import {useDispatch} from 'react-redux';
import {changeScreen} from '../../redux/screenSlice';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import {Button} from 'react-native-paper';
import {registerUser} from '../../api/registerUser';
import CustomDialog from '../../components/custom/CustomDialog';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {changePassword} from '../../api/changePassword';
import {updateUser} from '../../api';
import {getData} from '../../api/loginUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation, route}) => {
  const [avatarUri, setAvatarUri] = useState('');
  const [res, setRes] = useState(null);
  const [user, setUser] = useState(null);
  const [uName, setUName] = useState('');

  useEffect(() => {
    const setData = async () => {
      try {
        const userInfo = await getData(route.params.phone, '');
        setUser(userInfo);
        console.log('User Info:', userInfo);
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    setData();
    console.log('Register Screen');
  }, []);

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({title: '', message: ''});
  const showDialog = (title, message) => {
    setDialogMessage({title: title, message: message});
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  };

  const handleContinue = async () => {
    //check not null
    if (
      uName == '' ||
      name === '' ||
      phone === '' ||
      pwd === '' ||
      cpwd === ''
    ) {
      showDialog('Input', 'Please enter all information.');
      return;
    }

    if (pwd !== cpwd) {
      showDialog('Password', 'Password and confirm password do not match.');
      return;
    }

    try {
      const userData = {
        userName: uName,
        fullname: name,
        birthday: user.birthday,
        file: {
          uri: res.uri,
          type: res.type,
          name: res.fileName,
        },
      };
      await updateUser(user._id, userData);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
      console.log('Error updating profile:', error);
      return;
    }

    try {
      await changePassword(user._id, 'HyperCh@t#24', pwd);
    } catch (error) {
      console.error(error);
    }
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(route.params.email));
      await AsyncStorage.setItem('@password', JSON.stringify(pwd));
    } catch (e) {
      console.error(e);
    }
    handleBack();
  };

  const handleBack = () => {
    dispatch(changeScreen('Login'));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log('Show password: ', showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    console.log('Show confirm password: ', showConfirmPassword);
  };

  const handleUploadAvatar = async () => {
    // Kiểm tra và yêu cầu quyền truy cập camera
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          // Nếu được cấp quyền, mở camera
          Alert.alert(
            'Choose Option',
            'Pick an option to set your avatar',
            [
              {
                text: 'Choose from Library',
                onPress: () => launchImagePicker('library'),
              },
              {
                text: 'Take Photo',
                onPress: () => launchImagePicker('camera'),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        } else {
          console.log('Camera permission denied');
          // Nếu không được cấp quyền, bạn có thể thông báo cho người dùng hoặc thực hiện hành động phù hợp khác
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // Nếu không phải là Android, bạn có thể mở camera trực tiếp (đã kiểm tra quyền truy cập camera trước đó)
      Alert.alert(
        'Choose Option',
        'Pick an option to set your avatar',
        [
          {
            text: 'Choose from Library',
            onPress: () => launchImagePicker('library'),
          },
          {
            text: 'Take Photo',
            onPress: () => launchImagePicker('camera'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }
  };

  const launchImagePicker = option => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    if (option === 'library') {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log('Image URI:', response.assets[0]);
          setAvatarUri(response.assets[0].uri);
          setRes(response.assets[0]);
        }
      });
    } else if (option === 'camera') {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          console.log('Image URI:', response.assets[0]);
          setAvatarUri(response.assets[0].uri);
          setRes(response.assets[0]);
        }
      });
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'lightgrey'}}>
      <Header
        title={i18n.t('Register')}
        handleGoBack={handleBack}
        indicator={isLoading}
      />
      <CustomDialog
        visible={visible}
        title={dialogMessage.title}
        message={dialogMessage.message}
        hideDialog={hideDialog}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {avatarUri && (
          <Image
            style={{
              margin: 10,
              width: 200,
              height: 200,
              resizeMode: 'cover',
              borderRadius: 9999,
              backgroundColor: 'lightgrey',
              borderColor: 'lightgrey',
              borderWidth: 0.5,
            }}
            source={{uri: avatarUri}}
          />
        )}
      </View>
      <Button
        style={{marginTop: 10}}
        buttonColor="#76ABAE"
        icon="camera"
        mode="contained"
        onPress={handleUploadAvatar}>
        Upload Avatar
      </Button>
      <CustomTextInput label="Username" value={uName} onChangeText={setUName} />
      <CustomTextInput label="Full name" value={name} onChangeText={setName} />
      <CustomTextInput
        label="Phone number"
        value={phone}
        onChangeText={setPhone}
      />

      <CustomTextInput
        label="Password"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry={true}
        showPassword={showPassword}
        onPressEye={handleShowPassword}
      />
      <CustomTextInput
        label="Confirm password"
        value={cpwd}
        onChangeText={setCpwd}
        secureTextEntry={true}
        showPassword={showConfirmPassword}
        onPressEye={handleShowConfirmPassword}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          marginTop: 20,
        }}>
        {/* show date picker */}
        <Text style={{fontSize: 18, marginRight: 10}}>Date of Birth:</Text>
        <Text style={{fontSize: 18, marginRight: 10, color: 'black'}}>
          {formatDate(birthday)}
        </Text>

        <Pressable onPress={() => setOpen(true)}>
          <SvgIcons name="edit" width={18} height={18} />
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={birthday}
          onConfirm={selectedDate => {
            setOpen(false);
            setBirthday(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>

      <View style={{width: '90%'}}>
        <Button
          style={{
            width: '100%',
            marginTop: 20,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#76ABAE',
          }}
          mode="contained"
          labelStyle={{fontSize: 18}}
          onPress={handleContinue}>
          {i18n.t('Complete')}
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;
