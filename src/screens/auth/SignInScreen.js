import React, {useLayoutEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import {Button} from 'react-native-elements';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {loginUrl} from "../../urls";
import {HeaderBackButton} from "@react-navigation/elements";

const auth = getAuth();

const SignInScreen = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Sign In",
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
        error: ''
    });
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            });
            return;
        }

        try {
            setLoading(true);
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
            const idToken = await userCredential.user.getIdToken(); // Get ID token from Firebase

            // Send the ID token to the server to authenticate
            const response = await axios.post(loginUrl(), {
                idToken: idToken,
            });

            // Check if the server is available and handle response accordingly
            if (response.status === 200) {
                const userData = response.data;

                // Save authentication token to AsyncStorage
                await AsyncStorage.setItem('authToken', idToken);
                // console.log('Authentication token stored in AsyncStorage:', idToken);

                // Save user data to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                // console.log('User data stored in AsyncStorage:', userData);

            } else {
                Alert.alert('Error', "Server unavailable")
            }
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign In</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={value.password}
                    onChangeText={(text) => setValue({...value, password: text})}
                    secureTextEntry={true}
                />

                {!!value.error && <Text style={styles.error}>{value.error}</Text>}

                <Button
                    title="Sign in"
                    onPress={signIn}
                    loading={loading}
                    disabled={loading}
                    buttonStyle={styles.button}
                />

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        marginRight: 5,
    },
    signupLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default SignInScreen;
