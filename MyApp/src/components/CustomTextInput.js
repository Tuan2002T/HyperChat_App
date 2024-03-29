import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import i18n from '../i18n/i18n';

const CustomTextInput = ({ label, placeholder, value, onChangeText, secureTextEntry = false, showPassword, onPressEye }) => {
  return (
    <View style={{ width: '90%', marginTop: 20 }}>
      <TextInput
        style={{ backgroundColor: '#EEE' }}
        activeUnderlineColor="#000"
        label={i18n.t(label)}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        right={secureTextEntry ? <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={onPressEye} /> : null}
      />
    </View>
  );
};

export default CustomTextInput;
