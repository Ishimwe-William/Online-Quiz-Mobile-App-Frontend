import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QuizStack } from "./stacks/quizStack";
import { HomeStack } from "./stacks/homeStack";
import { TakeQuizStack } from "./stacks/takeQuizStack";
import { useUserData } from "./screens/auth/hooks/useUserData";
import { ActivityIndicator } from "react-native";

const Drawer = createDrawerNavigator();

export default function Drawers() {
    const { userData, loading } = useUserData();

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" />;
    }

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
            {userData && userData.is_superuser ? (
                <>
                    <Drawer.Screen name="QuizStack" component={QuizStack} options={{ title: 'Create Quiz' }} />
                    <Drawer.Screen name="TakeQuizStack" component={TakeQuizStack} options={{ title: 'Take Quiz' }} />
                </>
            ) : (
                <Drawer.Screen name="TakeQuizStack" component={TakeQuizStack} options={{ title: 'Take Quiz' }} />
            )}
        </Drawer.Navigator>
    );
}
