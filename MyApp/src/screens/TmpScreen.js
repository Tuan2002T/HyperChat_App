// MeScreen.js
import React from 'react';
import { View, Text, Pressable, } from 'react-native';

const MeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={{fontSize: 32}}>Tempt</Text>
      <Pressable onPress={()=>{
        navigation.goBack();
      }}>
        <Text style={{fontSize: 60}}>BACK</Text>
      </Pressable>
    </View>
  );
};

export default MeScreen;
