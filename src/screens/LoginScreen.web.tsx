import React, { useState, useContext } from 'react';
import { StyleSheet, Alert, Platform } from 'react-native';
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
        <div style={styles.mainContainer}>
            <form onSubmit={handleLogin} style={styles.container}>
                <h2 style={styles.title}>Login</h2>
                <input
                    type='email'
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                />
                <p></p>
                <input
                    type='password'
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                />
                <p style={styles.passwordstrengthText}>
                    {!passwordDigit() && 'password must contain a number, '}
                    {!passwordLength() && 'password must be 8 digits or more, '}
                    {!passwordLowerCase() && 'password must contain a lower case letter,'}
                    {!passwordUpperCase() && 'password must contain a upper case letter'} </p>
                <button
                    style={{ padding: 10, backgroundColor: 'lightlue', borderRadius: 4 }}
                    type='submit'
                    onClick={handleLogin}
                    disabled={Number(getPasswordStrength()) < 4} >Login</button>
            </form>
        </div>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { padding: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'blue' },

    passwordstrengthText: {
        fontSize: 12,
        color: 'red',
        alignSelf: 'flex-start',
        width: '20%'
    },
    input: { width: '20%', padding: 10, marginVertical: 30, borderWidth: 1, borderRadius: 5 },
});

export default LoginScreen;
