// ContactScreen.js
import React from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const ContactScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  return (
    <View>
      <Text style={{fontSize: 32}}>Contact</Text>
        <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
      </View>
  );
};

export default ContactScreen;
