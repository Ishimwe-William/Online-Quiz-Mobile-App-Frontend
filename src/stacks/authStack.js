import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from "../welcome";
import SignInScreen from "../signIn";
import SignUpScreen from "../signUp";




export default function AuthStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
    );
}
