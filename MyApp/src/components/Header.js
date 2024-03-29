import React from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import SvgIcons from '../assets/SvgIcons';

const Header = ({title, handleGoBack, indicator}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#76ABAE',
        paddingLeft: 20,
        justifyContent: 'center',
      }}>
      <Pressable style={{flexDirection: 'row'}} onPress={handleGoBack}>
        <SvgIcons name="arrow_left" width={32} height={32} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'white',
            paddingHorizontal: 10,
          }}>
          {title}
        </Text>
      </Pressable>
      <View style={{position: 'absolute', right: 10}}>
        <ActivityIndicator animating={indicator} color={'#eee'} />
      </View>
    </View>
  );
};

export default Header;
