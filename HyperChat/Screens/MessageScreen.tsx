// DetailsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const MessageScreen = () => {
  return (
    <Text style={styles.text}>Message Screen</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageScreen;