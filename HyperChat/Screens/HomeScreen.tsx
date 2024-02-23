//HomeScreen.tsx

// npm install @react-navigation/native @react-navigation/bottom-tabs react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/viewpager

import React from 'react';
import {View, Text, Pressable, StyleSheet, ImageBackground} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white', // Set text color to white for better visibility
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  return (
    <ImageBackground
      source={{
        uri: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/428613114_3527490130845806_5463851786386476094_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFFuZCr0ABQ0crCsBA_wmaipZMHxi4CMyKlkwfGLgIzIjqOmtKDkQr70174Yr9Vn_3CkbwWnI9qUnsFHXn0fpTB&_nc_ohc=3kKHVT3If8QAX-iRFoZ&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfAuS6UHrb5OrvEXTsik1jIXADtIEQHjLkuh41dsoliYkA&oe=65DD2ABD',
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Hyper Chat!</Text>
        <Pressable
          onPress={() => {
            console.log('Button pressed');
            navigation.navigate('Login');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;