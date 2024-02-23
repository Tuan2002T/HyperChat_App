// DetailsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const DetailsScreen = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/428609181_3527490067512479_68719050623459922_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHALci-813CsU2YlWmwloQLzVVuOGG4tujNVW44Ybi26FSHLQC1oK2jU3j-k7vZTnr4kHTnDLQ3hiD56NTar_6H&_nc_ohc=SIGP8tJpDHIAX8E9ccS&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCIf-461IT550nDwNY9B3hzt-h_MqMjsbttDkJ1b1KOWg&oe=65DBE80F',
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Details Screen</Text>
      </View>
    </ImageBackground>
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

export default DetailsScreen;