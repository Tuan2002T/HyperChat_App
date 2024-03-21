//src/components/RegisterButton.js
import React from 'react';
import { Text, Pressable } from 'react-native';
import i18n from '../i18n/i18n';

const RegisterButton = ({ handleRegister }) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginBottom: 20,
        borderRadius: 999,
      })}
      onPress={handleRegister}>
      {({ pressed }) => (
        <Text style={{ fontSize: 20 }}>{i18n.t('Create new account')}</Text>
      )}
    </Pressable>
  );
};

export default RegisterButton;
