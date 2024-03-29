import React from 'react';
import { View, Text } from 'react-native';
import {IconButton} from 'react-native-paper';

const CustomHeader = ({ title, leftIcon, leftIconPress, rightIcon, rightIconPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: '#76ABAE',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <IconButton
        icon={leftIcon}
        iconColor="white"
        size={30}
        onPress={leftIconPress}
      />
      <Text
        style={{
          position: 'absolute',
          left: '10%',
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 20,
        }}>
        {title}
      </Text>
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          iconColor="white"
          size={30}
          onPress={rightIconPress}
        />
      )}
    </View>
  );
};

export default CustomHeader;
