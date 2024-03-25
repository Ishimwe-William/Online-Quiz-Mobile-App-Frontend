import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {useAuthentication} from "./src/screens/auth/hooks/useAuthentication";
import Drawers from "./src/drawer";
import AuthStack from "./src/stacks/authStack";

export default function App() {
    const { userLoggedIn } = useAuthentication();

    return (
        <NavigationContainer>
            {userLoggedIn ? <Drawers /> : <AuthStack />}
            <StatusBar style="dark" />
        </NavigationContainer>
    );
}
