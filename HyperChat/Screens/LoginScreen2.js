import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';

export default function LoginScreen2({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate('Main');
    console.log('Back to main');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      paddingTop: 100,
    },
    welcome: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      width: '80%',
      height: 50,
      backgroundColor: '#24786D',
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
      <Pressable
        style={{position: 'absolute', top: 30, left: 30}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={require('../Images/Icon/Back.png')}
        />
      </Pressable>

      <Image
        style={{width: 300, height: 100, resizeMode: 'contain'}}
        source={require('../Images/Icon/Login2hc.png')}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          Welcome back! Sign in using your social
        </Text>
        <Text style={{fontSize: 20}}>account or email to continue us</Text>
      </View>

      <View style={{flexDirection: 'row', marginVertical: 20}}>
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
            source={require('../Images/Icon/apple2.png')}
          />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{width: '35%', height: 1, borderBottomWidth: 1, borderColor: 'grey'}} />
        <Text style={{fontSize: 16, textAlign: 'center', marginHorizontal: 10}}>
          OR
        </Text>
        <View style={{width: '35%', height: 1, borderBottomWidth: 1, borderColor: 'grey'}} />
      </View>

      <View style={{width: '100%', marginTop: 30, marginBottom: 150}}>
        <View
          style={{
            width: '100%',
            alignItems: 'start',
            justifyContent: 'center',
          }}>
          <View style={{paddingHorizontal: 40}}>
            <Text style={{fontSize: 18, color: '#24786D'}}>Your email</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'start',
            justifyContent: 'center',
          }}>
          <View style={{paddingHorizontal: 40}}>
            <Text style={{fontSize: 18, color: '#24786D'}}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>

      <Pressable>
        <Text style={{marginTop: 10, color: '#24786D', fontSize: 18}}>
          Forgot password?
        </Text>
      </Pressable>
    </View>
  );
}
