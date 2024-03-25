import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import HomeScreen from "./screens/auth/home";


export const HomeStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={navOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
