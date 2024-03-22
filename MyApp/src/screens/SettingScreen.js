// DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';
import { changeScreen } from '../redux/screenSlice';
import { useDispatch } from 'react-redux';
const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {;
    console.log("Thực hiện đăng xuất khỏi ứng dụng");
    dispatch(changeScreen('Splash'));
  };

  const handleAddUser = () => {
    // Chuyển hướng đến màn hình thêm bạn bè
    // navigation.navigate('AddUser');
  };

  const handleNewGroup = () => {
    // Chuyển hướng đến màn hình tạo nhóm mới
    // navigation.navigate('NewGroup');
  };

  const handleContacts = () => {
    // Chuyển hướng đến màn hình danh bạ
    // navigation.navigate('Contacts');
  };

  const handleCall = () => {
    // Chuyển hướng đến màn hình cuộc gọi
    // navigation.navigate('Call');
  };

  const handleSettings = () => {
    // Chuyển hướng đến màn hình cài đặt
    // navigation.navigate('Settings');
  };
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        {/* <Pressable style={{
          width: 37,
          height: 37,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          borderWidth: 0.3,
          borderColor: 'black',
        }} onPress={() => { }}>
          <Image source={require('../Images/Icon/Vector.png')} />
        </Pressable> */}
        <Text style={{ color: 'black', fontSize: 20 }}>Setting</Text>
        {/* <Pressable style={{
          width: 37,
          height: 37,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          borderWidth: 0.3,
          borderColor: 'black',
        }} onPress={() => { }}>
          <Image source={require('../Images/Icon/call-user.png')} />
        </Pressable> */}
      </View>
      <View style={{ width: '100%', marginBottom:50 }}>
        <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
            <Image style={{ width: 60, height: 60, borderRadius: 100 }} source={{ uri: 'https://thegioiso.edu.vn/wp-content/uploads/2023/11/hinh-anh-gai-xinh-cute-1.jpg' }} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trương Văn Tuấn</Text>
              <Text style={{ fontSize: 15, color: 'gray', fontWeight: 'bold' }}>Developer</Text>
            </View>
          </View>
          <Image style={{ width: 30, height: 30, marginRight: 30 }} source={require('../Images/Icon/QRCode.png')} />
        </View>
      </View>
      <Pressable
         onPress={() => { navigation.navigate('UserProfile') }} 
        style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Keys.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Account</Text>
          <Text style={{fontSize:12, fontWeight:'bold'}}>Privacy, security, change number</Text>
        </View>
      </Pressable>

      <Pressable style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Message.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Chat</Text>
          <Text style={{fontSize:12, fontWeight:'bold'}}>Chat history,theme,wallpapers</Text>
        </View>
      </Pressable>

      <Pressable style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Notification.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Notifications</Text>
          <Text style={{fontSize:12, fontWeight:'bold'}}>Messages, group and others</Text>
        </View>
      </Pressable>

      <Pressable style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Help.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Help</Text>
          <Text style={{fontSize:12, fontWeight:'bold'}}>Help center,contact us, privacy policy</Text>
        </View>
      </Pressable>
      <Pressable style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Data.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Storage and data</Text>
          <Text style={{fontSize:12, fontWeight:'bold'}}>Network usage, stogare usage</Text>
        </View>
      </Pressable>
      <Pressable style={{flexDirection:'row',alignItems:'center',width:'100%', paddingLeft:30, paddingVertical:15}}>
        <View style={{backgroundColor:'#F2F8F7', padding:10, borderRadius:100, marginRight:15}}>
          <Image style={{ width: 30, height: 30 }} source={require('../Images/Icon/Users.png')} />
        </View>
        <View>
          <Text style={{fontSize:16, color:'black'}}>Invite a friend</Text>
          {/* <Text style={{fontSize:12, fontWeight:'bold'}}>Privacy, security, change number</Text> */}
        </View>
      </Pressable>
      <Pressable onPress={()=>{
        handleLogout();
      }}>
        <Text style={{fontSize:16, color:'red', padding:30}}>Lougout</Text>
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