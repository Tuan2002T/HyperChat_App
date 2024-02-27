import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';

export default function LoginScreen({navigation}: {navigation: any}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate('Main');
    console.log('Logging in...');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      width: '80%',
      height: 50,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    circle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 1,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={{width: 300, height: 100, resizeMode: 'contain'}}
        source={require('../Images/logo.png')}
      />

      <View
        style={{
          width: '100%',
          paddingLeft: 50,
          alignItems: 'flex-start',
          marginBottom: 10,
        }}>
        <Text style={styles.welcome}>Connect</Text>
        <Text style={styles.welcome}>friends</Text>
        <Text style={styles.welcome}>easily &</Text>
        <Text style={styles.welcome}>quickly</Text>
      </View>

      <View
        style={{
          width: '100%',
          paddingLeft: 50,
          alignItems: 'flex-start',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 24}}>Our chat app is the perfect way to</Text>
        <Text style={{fontSize: 24}}>stay connected with friends and</Text>
        <Text style={{fontSize: 24}}>family.</Text>
      </View>

      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Pressable style={styles.circle}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../Images/Icon/facebook.png')}
          />
        </Pressable>
        <Pressable style={styles.circle}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../Images/Icon/google.png')}
          />
        </Pressable>
        <Pressable style={styles.circle}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../Images/Icon/apple.png')}
          />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{width: '35%', height: 1, borderBottomWidth: 1}} />
        <Text style={{fontSize: 16, textAlign: 'center', marginHorizontal: 10}}>
          OR
        </Text>
        <View style={{width: '35%', height: 1, borderBottomWidth: 1}} />
      </View>

      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign up with mail</Text>
      </Pressable>
    </View>
  );
}
