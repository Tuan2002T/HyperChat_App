import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }: { navigation: any }) { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Perform login logic here
        navigation.navigate("Main");
        console.log("Logging in...");
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        welcome: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
        },
        input: {
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        button: {
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to Login Screen!</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}