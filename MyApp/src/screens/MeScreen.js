// MeScreen.js
import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import { useDispatch } from 'react-redux';
import SvgIcons from '../assets/SvgIcons';
import PngIcons from '../assets/PngIcons';

let pl = 10;
let px = 30;
let fs = 20;
let fc = 'black';

const MeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {;
    console.log("Thực hiện đăng xuất khỏi ứng dụng");
    dispatch(setCurrentScreen('Splash')); // Dispatch action để chuyển đến màn hình Splash
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
    <View>
      {/*Avatar, User [full name], phone number */}
      <View style={{backgroundColor: 'lightgrey', padding: '3%'}}>
        {/* <SvgIcons name="logo" width={100} height={100} /> */}
        <Image
          source={PngIcons.avt}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
        <Text style={{fontWeight: 700, fontSize: 20}}>Hiện</Text>
        <Text style={{fontSize: 16}}>+84 38 xxxxxx</Text>
      </View>
      {/*Invite Friends, New Group, Contacts, Call, Settings, Logout */}
      <View>
        <View style={{padding: '1%', paddingVertical: pl}}>
          <Pressable style={{flexDirection: 'row'}} onPress={handleAddUser}>
            <SvgIcons name="add_user" width={px} height={px} />
            <Text style={{fontSize: fs, fontWeight: 700, color: fc, paddingLeft: pl}}>Invite Friends</Text>
          </Pressable>
        </View>
        <View style={{padding: '1%', paddingVertical: pl}}>
          <Pressable style={{flexDirection: 'row'}} onPress={handleNewGroup}>
            <SvgIcons name="group" width={px} height={px} />
            <Text style={{fontSize: fs, fontWeight: 700, color: fc, paddingLeft: pl}}>New Group</Text>
          </Pressable>
        </View>
        <View style={{padding: '1%', paddingVertical: pl}}>
          <Pressable style={{flexDirection: 'row'}} onPress={handleContacts}>
            <SvgIcons name="friend" width={px} height={px} />
            <Text style={{fontSize: fs, fontWeight: 700, color: fc, paddingLeft: pl}}>Contacts</Text>
          </Pressable>
        </View>
        <View style={{padding: '1%', paddingVertical: pl}}>
          <Pressable style={{flexDirection: 'row'}} onPress={handleCall}>
            <SvgIcons name="call" width={px} height={px} />
            <Text style={{fontSize: fs, fontWeight: 700, color: fc, paddingLeft: pl}}>Call</Text>
          </Pressable>
        </View>
        <View style={{padding: '1%', paddingVertical: pl}}>
          <Pressable style={{flexDirection: 'row'}} onPress={handleSettings}>
            <SvgIcons name="setting" width={px} height={px} />
            <Text style={{fontSize: fs, fontWeight: 700, color: fc, paddingLeft: pl}}>Settings</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={handleLogout}>
        <Text style={{fontSize: 60}}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default MeScreen;
