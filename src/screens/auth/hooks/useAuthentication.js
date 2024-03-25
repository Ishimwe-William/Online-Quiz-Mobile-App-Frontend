import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../../config/firebaseweb.config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

export function useAuthentication() {
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is already authenticated when the app starts
        const checkUserAuth = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setUserLoggedIn(true);
                }
            } catch (error) {
                console.log('Error retrieving user from AsyncStorage:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUserAuth();

        // Listen for changes in the authentication state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setUserLoggedIn(true);
                try {
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                } catch (error) {
                    console.log('Error storing user in AsyncStorage:', error);
                }
            } else {
                setUser(null);
                setUserLoggedIn(false);
                try {
                    await AsyncStorage.removeItem('user');
                } catch (error) {
                    console.log('Error removing user from AsyncStorage:', error);
                }
            }
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    return { user, userLoggedIn, loading };
}
