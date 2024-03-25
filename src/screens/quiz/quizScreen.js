import React, {useEffect, useState, useCallback, useLayoutEffect} from "react";
import {View, StyleSheet, Text, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {QuizList} from "../components/quiz-list";
import ActionButton from 'react-native-action-button';
import {useNavigation, useIsFocused} from "@react-navigation/native";
import axios from "axios";
import {getQuizUrl} from "../urls";

export default function QuizScreen() {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const quizUrl = getQuizUrl();
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // Hook to check if the screen is currently focused
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Quizzes",
            headerLeft: () => (
                <Text></Text>
            )
        })
    })

    const getAllQuizzes = useCallback(async () => {
        try {
            const quizzes = await axios.get(quizUrl);
            setData(quizzes.data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    }, [quizUrl]);

    const handleRefresh = () => {
        setRefreshing(true);
        getAllQuizzes();
    };

    useEffect(() => {
        if (isFocused) {
            // If the screen is focused, refresh the data
            getAllQuizzes();
        }
    }, [isFocused, getAllQuizzes]);

    const handleAddQuiz = () => {
        navigation.navigate('AddQuiz');
        console.log('Add new quiz');
    };

    const handleEditQuiz = (quiz) => {
        // Navigate to EditQuizScreen with the selected quiz's ID
        navigation.navigate("EditQuiz", {quizId: quiz.id, quizTitle: quiz.title});
    };

    const handleDeleteQuiz = async (quiz) => {
        // Navigate to DeleteQuizScreen with the selected quiz's ID
        navigation.navigate("DeleteQuiz", {quizId: quiz.id, quizTitle: quiz.title});
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <View style={styles.container}>
                    <QuizList
                        data={data}
                        onEdit={handleEditQuiz}
                        onDelete={handleDeleteQuiz}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                    <ActionButton
                        buttonColor="#007bff"
                        onPress={handleAddQuiz}
                        offsetY={20}
                        offsetX={20}
                        renderIcon={() => <Icon name="add" style={styles.actionButtonIcon}/>}
                    />
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
