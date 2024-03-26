import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { getQuizUrl } from "../../urls";
import {ReadyQuizzes} from "./ready-quizes";

export default function AvailableQuizzes() {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const quizUrl = getQuizUrl();
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // Hook to check if the screen is currently focused

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Quizzes",
            headerLeft: () => null // Hide the header left component
        });
    }, [navigation]);

    const getAllQuizzes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(quizUrl);
            setData(response.data);
        } catch (error) {
            Alert.alert("Error","Error fetching quizzes! Server may be down.")
            console.error("Error fetching quizzes:", error);
            // Handle error: Display an error message or retry option
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [quizUrl]);

    const handleRefresh = () => {
        setRefreshing(true);
        getAllQuizzes();
    };

    useEffect(() => {
        if (isFocused) {
            // Fetch quizzes when the screen is focused
            getAllQuizzes();
        }
    }, [isFocused, getAllQuizzes]);

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text>No quizzes available</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ReadyQuizzes
                    data={data}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={renderEmptyComponent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
