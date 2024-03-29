// DetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import {changeScreen} from '../redux/screenSlice';
import {useDispatch} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import {Avatar} from 'react-native-paper';

const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Settings"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
      />

      <View style={{height: 200, marginVertical: 10}}>
        <Pressable onPress={handleMyInfo}>
          <Avatar.Image size={100} source={require('../assets/png/avt.jpg')} />
        </Pressable>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
          Nguyễn Văn A
        </Text>
        <Text style={{fontSize: 16, color: 'gray'}}>+84 123 456 789</Text>
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: '#F2F8F7',
            padding: 10,
            borderRadius: 100,
            marginRight: 15,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/Icon/Keys.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Account</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            Privacy, security, change number
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: '#F2F8F7',
            padding: 10,
            borderRadius: 100,
            marginRight: 15,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/Icon/Message.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Chat</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            Chat history,theme,wallpapers
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: '#F2F8F7',
            padding: 10,
            borderRadius: 100,
            marginRight: 15,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/Icon/Notification.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Notifications</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            Messages, group and others
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: '#F2F8F7',
            padding: 10,
            borderRadius: 100,
            marginRight: 15,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/Icon/Help.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Help</Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            Help center,contact us, privacy policy
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 30,
          paddingVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: '#F2F8F7',
            padding: 10,
            borderRadius: 100,
            marginRight: 15,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../Images/Icon/Users.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Invite a friend</Text>
          {/* <Text style={{fontSize:12, fontWeight:'bold'}}>Privacy, security, change number</Text> */}
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          handleLogout();
        }}>
        <Text style={{fontSize: 16, color: 'red', padding: 30}}>Lougout</Text>
      </Pressable>
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
