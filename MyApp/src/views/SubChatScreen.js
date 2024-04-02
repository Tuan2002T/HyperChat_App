//src/views/SubChatScreen.js

import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import CustomHeader from '../components/CustomHeader';

const SubChatScreen = ({navigation}) => {

    const handleGoBack = () => {
    navigation.goBack();
    };


  return (
    <View style={styles.container}>
      <CustomHeader
        title="New message"
        leftIcon="arrow-left"
        leftIconPress={handleGoBack}
      />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
});

export default SubChatScreen;
