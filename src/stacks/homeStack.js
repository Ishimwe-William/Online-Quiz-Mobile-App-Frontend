import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "../utils/options";
import HomeScreen from "../screens/auth/HomeScreen";
import {useNavigation} from "@react-navigation/native";

const Stack = createStackNavigator();


export const HomeStack = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
