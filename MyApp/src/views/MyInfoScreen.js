import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {IconButton, Button} from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
import {updateUser} from '../api/updateUser';
import {getData} from '../api/loginUser';
import {useDispatch} from 'react-redux';
import {loginUserSuccess} from '../redux/authSlice';
import {SharedElement} from 'react-navigation-shared-element';

const MyInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [avatarUri, setAvatarUri] = useState(user.avatar);

  console.log('User:', user.phoneNumber);

  const handleEditAvatar = async () => {
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

  const [res, setRes] = useState(null);

  const handleSave = async () => {
    try {
      const userData = {
        userName: user.userName,
        fullname: user.fullname,
        birthday: user.birthday,
        file: {
          uri: res.uri,
          type: res.type,
          name: res.fileName,
        },
      };
      await updateUser(user._id, userData);
      Alert.alert('Success', 'Your profile has been updated successfully.');

      getData(user.phoneNumber).then(res => {
        console.log('res: ', res);
        dispatch(loginUserSuccess(res));
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
      console.log('Error updating profile:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Profile"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
        rightIcon="camera"
        rightIconPress={handleEditAvatar}
      />
      <View style={{width: '100%', height: '40%'}}>
        {avatarUri && (
          <SharedElement id="avatar">
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={{uri: avatarUri}}
            />
          </SharedElement>
        )}
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        {user.fullname}
      </Text>
      <Text
        style={{color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 5}}>
        {user.userName}
      </Text>

      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Email
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          {user.email}
        </Text>
      </View>

      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Phone number
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          {user.phoneNumber}
        </Text>
      </View>
      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Birthday
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          {user.birthday}
        </Text>
      </View>
      <View style={{width: '90%'}}>
        <Button
          style={{
            marginTop: 20,
            borderRadius: 9999,
            justifyContent: 'center',
            backgroundColor: '#76ABAE',
          }}
          mode="contained"
          labelStyle={{fontSize: 18}}
          onPress={handleSave}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyInfoScreen;
