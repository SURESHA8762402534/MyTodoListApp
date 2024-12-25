import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useContext(AuthContext);

    const getPasswordStrength = () => {
        let count = 0;
        if (passwordLength()) {
            count++;
        }
        if (passwordLowerCase()) {
            count++;
        }
        if (passwordUpperCase()) {
            count++;
        }
        if (passwordDigit()) {
            count++;
        }
        return count;
    }

    const passwordLowerCase = () => {
        return /[a-z]/.test(password);
    }

    const passwordUpperCase = () => {
        return /[A-Z]/.test(password);
    }

    const passwordLength = () => {
        return password.length > 7
    }

    const passwordDigit = () => {
        return /\d/.test(password)
    }

    const handleLogin = async () => {
        if (username && password) {
            await AsyncStorage.setItem('userSession', JSON.stringify({ username }));
            login(username);
        } else {
            if (Platform.OS === 'web') {
                console.log('hi')
            }
            Alert.alert('Invalid credentials', 'Please enter valid username and password');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Text style={styles.passwordstrengthText}>
                {!passwordDigit() && 'password must contain a number, '}
                {!passwordLength() && 'password must be 8 digits or more, '}
                {!passwordLowerCase() && 'password must contain a lower case letter,'}
                {!passwordUpperCase() && 'password must contain a upper case letter'} </Text>
            <Button title="Login"
                onPress={handleLogin}
                disabled={Number(getPasswordStrength()) < 4} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },

    passwordstrengthText: {
        fontSize: 12,
        color: 'red',
        alignSelf: 'flex-start'
    },
    input: { width: '100%', padding: 10, marginVertical: 10, borderWidth: 1, borderRadius: 5 },
});

export default LoginScreen;
