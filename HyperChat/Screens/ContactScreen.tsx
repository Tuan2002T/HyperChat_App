// DetailsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const ContactScreen = () => {
  return (
    <Text style={styles.text}>Contact Screen</Text>
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

export default ContactScreen;