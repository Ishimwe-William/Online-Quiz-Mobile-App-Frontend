import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../../config/firebaseweb.config";
import { useUserData } from "./hooks/useUserData";
import {HeaderBackButton} from "@react-navigation/elements";

export default function HomeScreen({ navigation }) {
    const { userData, loading } = useUserData();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Home",
            headerLeft: ()=>null
        })
    })

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('authToken');
            await signOut(auth);
        } catch (error) {
            Alert.alert('Sign out error')
            console.error("Sign out error:", error);
        }
    };

    const getUserInitials = (firstname, lastname) => {
        const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : '';
        const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : '';
        return `${firstInitial}${lastInitial}` || ''; // Return an empty string if both initials are empty
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <View style={styles.content}>
                    {userData ? (
                        <>
                            <View style={styles.userInfoContainer}>
                                <Avatar
                                    rounded
                                    size={100}
                                    title={getUserInitials(userData.firstname, userData.lastname)}
                                    containerStyle={[styles.avatarContainer, { backgroundColor: 'purple' }]}
                                    titleStyle={{ color: 'white' }}
                                />

                                <Text style={styles.welcomeText}>Welcome, {userData.lastname} {userData.firstname}</Text>
                                <Text style={styles.userDetails}>{userData.username}</Text>
                                <Text style={styles.userDetails}>{userData.email}</Text>
                                <Text style={styles.userType}>Type: {userData.is_superuser ? 'Admin' : 'Normal'}</Text>
                            </View>
                            <Button
                                title="Sign Out"
                                buttonStyle={styles.signOutButton}
                                onPress={handleSignOut}
                            />
                        </>
                    ) : (
                        <Text>No user data available</Text>
                    )}
                </View>
            )}
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    userInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userDetails: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    userType: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    signOutButton: {
        marginTop: 30,
        backgroundColor: '#007bff',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    avatarContainer: {
        marginBottom: 20, // Add margin to separate Avatar from other elements
    },
    initialsStyle: {
        backgroundColor: 'purple',
        color: 'white'
    },
});
