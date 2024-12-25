import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    const login = async (username: string) => {
        setUser(username);
        await AsyncStorage.setItem('userSession', username);
        if (Platform.OS === 'web') {
            try {
                localStorage.setItem('userSession', JSON.stringify(username));
            } catch (err) {
                console.error('Error', err);
            }
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('userSession');
        await localStorage.clear()
    };

    const loadUserSession = async () => {
        let storedUser = await AsyncStorage.getItem('userSession');
        if (Platform.OS === 'web') {
            storedUser = await localStorage.getItem('userSession')
        }
        if (storedUser) {
            setUser(storedUser);
        }
    };

    useEffect(() => {
        loadUserSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
