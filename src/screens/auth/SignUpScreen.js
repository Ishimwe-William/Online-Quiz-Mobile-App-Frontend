import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { StackScreenProps } from '@react-navigation/stack';
import { authentication } from "../../config/firebaseweb.config";
import axios from 'axios';
import { registerUrl } from "../../urls";
import {HeaderBackButton} from "@react-navigation/elements";

// Initialize Firebase auth
const auth = getAuth(authentication);

const SignUpScreen= ({ navigation }) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Sign Up",
            headerLeft: ()=>(
                <HeaderBackButton
                    tintColor={"black"}
                    onPress={()=>{
                        navigation.goBack()
                    }}
                />
            )
        })
    })

    const [value, setValue] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        error: ''
    });
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        // Validate input fields
        if (value.email === '' || value.password === '' || value.firstname === '' || value.lastname === '' || value.username === '') {
            setValue({
                ...value,
                error: 'All fields are mandatory.'
            });
            return;
        }

        try {
            setLoading(true);

            // Save credentials on the server first
            const serverError = await saveCredentialsOnServer(value.email, value.password, value.firstname, value.lastname, value.username);

            // If there was an error saving credentials on the server, set the error and return
            if (serverError) {
                setValue({
                    ...value,
                    error: serverError,
                });
                return;
            }

            // Only create user in Firebase if server request was successful
            try {
                // Create user with email and password
                await createUserWithEmailAndPassword(auth, value.email, value.password);
                // Navigate to sign-in screen after successful sign-up
                navigation.navigate("SignIn");
                // Show success message
                console.log('Sign-up successful.');
            } catch (firebaseError) {
                // Handle Firebase specific errors
                if (firebaseError.code === 'auth/email-already-in-use') {
                    setValue({
                        ...value,
                        error: 'This email is already in use. Please choose a different one.',
                    });
                } else {
                    // Handle other Firebase errors
                    setValue({
                        ...value,
                        error: 'An error occurred. Please try again later.',
                    });
                }
            }
        } catch (error) {
            // Handle other sign-up errors
            setValue({
                ...value,
                error: 'An error occurred. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    const saveCredentialsOnServer = async (email, password, firstname, lastname, username) => {
        try {
            const regUrl = registerUrl();
            // Send POST request to server endpoint
            const response = await axios.post(regUrl, {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                username: username,
            });
            // Check response status
            if (!response.status === 200) {
                throw new Error('Failed to save credentials on server');
            }
        } catch (error) {
            console.log(error.response.status);
            // Handle server request errors
            if (error.response && error.response.status === 400) {
                // Extract the error message from the response
                const responseData = error.response.data;

                // Check if the 'username' field exists in the response data
                if (responseData.username) {
                    // Access the first error message within the 'username' field
                    const errorMessage = responseData.username[0];

                    // Return the error message
                    return errorMessage;
                }
                // Check if the 'username' field exists in the response data
                if (responseData.email) {
                    // Access the first error message within the 'username' field
                    const errorMessage = responseData.email[0];

                    // Return the error message
                    return errorMessage;
                }

                // If 'username' field doesn't exist, return a generic error message
                return 'An error occurred. Please try again later.';
            } else {
                // Handle other errors
                return 'An error occurred. Please try again later.';
            }
        }
    };

    // Render sign-up screen components
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Create an Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    value={value.firstname}
                    onChangeText={(text) => setValue({ ...value, firstname: text })}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    value={value.lastname}
                    onChangeText={(text) => setValue({ ...value, lastname: text })}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={value.username}
                    onChangeText={(text) => setValue({ ...value, username: text })}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                />

                {!!value.error && <Text style={styles.error}>{value.error}</Text>}

                <Button
                    title="Sign up"
                    onPress={signUp}
                    loading={loading}
                    disabled={loading}
                    buttonStyle={styles.button}
                />

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.loginLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// Styles for sign-up screen components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 5,
    },
    error: {
        color: '#d9534f',
        marginBottom: 10,
        textAlign: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        marginRight: 5,
    },
    loginLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

// Export the SignUpScreen component
export default SignUpScreen;
