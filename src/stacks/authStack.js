import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import {useNavigation} from "@react-navigation/native";
import {authOptions} from "../utils/options";

const Stack = createStackNavigator();

export default function AuthStack() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={()=>authOptions(navigation)}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
    );
}
