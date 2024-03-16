import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import {firebase} from '../firebase';

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate('Main');
    console.log('Go to main');
  };

  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
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
          console.log('Back to main');
        }}>
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={require('../Images/Icon/Back.png')}
        />
      </Pressable>

      <Image
        style={{width: 300, height: 100, resizeMode: 'contain'}}
        source={require('../Images/Icon/Signup.png')}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Get chatting with friends and family</Text>
        <Text style={{fontSize: 20}}>
          today by signing up for our chat app!
        </Text>
      </View>

      <View style={{width: '100%', marginTop: 30, marginBottom: 150}}>
        <View
          style={{
            width: '100%',
            alignItems: 'start',
            justifyContent: 'center',
          }}>
          <View style={{paddingHorizontal: 40}}>
            <Text style={{fontSize: 18, color: '#24786D'}}>Your name</Text>
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
            <Text style={{fontSize: 18, color: '#24786D'}}>Your email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
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
        <View
          style={{
            width: '100%',
            alignItems: 'start',
            justifyContent: 'center',
          }}>
          <View style={{paddingHorizontal: 40}}>
            <Text style={{fontSize: 18, color: '#24786D'}}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPwd}
              onChangeText={setConfirmPwd}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Create an account</Text>
      </Pressable>
    </View>
  );
}
