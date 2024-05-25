import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {IconButton, Button, TextInput} from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
import {updateUser} from '../api/updateUser';
import {getData} from '../api/loginUser';
import {useDispatch} from 'react-redux';
import {loginUserSuccess} from '../redux/authSlice';
import {SharedElement} from 'react-navigation-shared-element';
import SvgIcons from '../assets/SvgIcons';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import CustomTextInput from '../components/CustomTextInput';

const MyInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [avatarUri, setAvatarUri] = useState(user.avatar);
  const [enableSave, setEnableSave] = useState(false);
  const [open, setOpen] = useState(false);

  const [birthday, setBirthday] = useState(
    format(new Date(user.birthday), 'dd-MM-yyyy'),
  );

  const [userName, setUserName] = useState(user.userName);
  const [fullname, setFullname] = useState(user.fullname);

  useEffect(() => {
    if (userName !== user.userName || fullname !== user.fullname || birthday !== format(new Date(user.birthday), 'dd-MM-yyyy') || avatarUri !== user.avatar) {
      setEnableSave(true);
    } else {
      setEnableSave(false);
    }
  }, [userName, fullname, birthday, avatarUri]);

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
          Alert.alert('Error', 'Camera permission denied');
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
        } else if (response.errorMessage) {
          Alert.alert('Error', 'Failed to pick image. Please try again later.');
        } else {
          setAvatarUri(response.assets[0].uri);
          setRes(response.assets[0]);
        }
      });
    } else if (option === 'camera') {
      launchCamera(options, response => {
        if (response.didCancel) {
        } else if (response.errorMessage) {
          Alert.alert('Error', 'Failed to take photo. Please try again later.');
        } else {
          setAvatarUri(response.assets[0].uri);
          setRes(response.assets[0]);
        }
      });
    }
  };

  const [res, setRes] = useState(null);
  const formatDate = (dateString) => {
    // Split the date string by "-"
    const [day, month, year] = dateString.split('-');
    // Return the formatted string
    return `${year}-${month}-${day}`;
  };
  const handleSave = async () => {
    try {
      const userData = {
        userName: userName,
        fullname: fullname,
        birthday: formatDate(birthday),
        file: res ? { uri: res.uri, type: res.type, name: res.fileName } : undefined,
      };

      if (!userData.file) {
        delete userData.file;
      }

      await updateUser(user._id, userData);
      Alert.alert('Success', 'Your profile has been updated successfully.');

      getData(user.phoneNumber).then(res => {
        dispatch(loginUserSuccess(res));
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
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
      <View style={{width: '100%', height: 300}}>
        {avatarUri && (
          <SharedElement id="avatar">
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={{uri: avatarUri}}
            />
          </SharedElement>
        )}
      </View>

      <CustomTextInput
        label="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <CustomTextInput
        label="Full name"
        value={fullname}
        onChangeText={setFullname}
      />
      <View style={{width: '90%', marginBottom: 10}}>
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

      <View style={{width: '90%', marginBottom: 10}}>
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
      <View style={{width: '90%', marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Birthday
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
            {birthday}
          </Text>
          <Pressable style={{paddingLeft: 10}} onPress={() => setOpen(true)}>
            <SvgIcons name="edit" width={18} height={18} />
          </Pressable>
        </View>
      </View>
      <View style={{width: '90%'}}>
        <Button
          disabled={!enableSave}
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

      <DatePicker
        mode="date"
        modal
        open={open}
        date={new Date()}
        onConfirm={selectedDate => {
          let age = new Date().getFullYear() - selectedDate.getFullYear();
          const monthDifference =
            new Date().getMonth() - selectedDate.getMonth();
          const dayDifference = new Date().getDate() - selectedDate.getDate();

          if (
            monthDifference < 0 ||
            (monthDifference === 0 && dayDifference < 0)
          ) {
            age--;
          }
          setOpen(false);
          if (age < 18) {
            Alert.alert('Error', 'You must be at least 18 years old!');
            return;
          }
          setBirthday(format(new Date(selectedDate), 'dd-MM-yyyy'));
        }}
        onCancel={() => setOpen(false)}
      />
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
