import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Dimensions, ScrollView } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../../config/firebaseweb.config";
import { useUserData } from "./hooks/useUserData";
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen({ navigation }) {
    const { userData, loading } = useUserData();
    const [coordinates, setCoordinates] = useState(null);
    const [mapDimensions, setMapDimensions] = useState({
        width: Dimensions.get('window').width,
        height: 300, // Set the desired map height
    });

    useEffect(() => {
        // Set "my home" coordinates
        setCoordinates({
            latitude: -1.962751,
            longitude: 30.047578,
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Home",
            headerLeft: () => null
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
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <View style={styles.content}>
                    {userData ? (
                        <>
                            <View style={styles.userInfoContainer}>
                                {coordinates && (
                                    <MapView
                                        style={mapDimensions}
                                        initialRegion={{
                                            latitude: coordinates.latitude,
                                            longitude: coordinates.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        <Marker
                                            coordinate={coordinates}
                                            title="My Home"
                                        />
                                    </MapView>
                                )}
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
                        </>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                    <Button
                        title="Sign Out"
                        buttonStyle={styles.signOutButton}
                        onPress={handleSignOut}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Use flexGrow instead of flex to allow ScrollView to work properly
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
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
        marginBottom: 20,
        borderRadius: 10,
    },
    avatarContainer: {
        marginTop: 10,
        marginBottom: 10, // Add margin to separate Avatar from other elements
    },
    initialsStyle: {
        backgroundColor: 'purple',
        color: 'white'
    },
});
