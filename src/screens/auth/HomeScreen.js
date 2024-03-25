import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from './utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authentication} from "../../config/firebaseweb.config";

export default function HomeScreen({ navigation }) {
    const { user } = useAuthentication();
    const auth = getAuth(authentication);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString !== null) {
                    const userData = JSON.parse(userDataString);
                    setFirstname(userData.firstname);
                    setLastname(userData.lastname);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        getUserData();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts


    const handleSignOut = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('authToken');

            // Sign out
            await signOut(auth);

            // Navigate to Welcome screen
            navigation.navigate('Welcome');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {lastname} {firstname}</Text>
            <Button title="Sign Out" style={styles.button} onPress={handleSignOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 10
    }
});
