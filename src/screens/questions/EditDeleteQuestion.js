import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { setQuestionAnswersUrl } from "../../urls";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";

const EditDeleteQuestion = ({ navigation }) => {
    const route = useRoute();
    const { question, quizId, quizTitle } = route.params;
    const [answers, setAnswers] = useState([]);
    const [fetchingAnswers, setFetchingAnswers] = useState(true);
    const answersUrl = setQuestionAnswersUrl(quizId, question.id)
    const isFocused = useIsFocused(); // Hook to check if the screen is currently focused

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Quiz Questions",
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


    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        return new Date(dateTimeString).toLocaleString("en-US", options);
    };

    useEffect(() => {
        fetchAnswers();
    }, []);

    useEffect(() => {
        if (isFocused) {
            // If the screen is focused, refresh the data
            fetchAnswers();
        }
    }, [isFocused, fetchAnswers]);

    const fetchAnswers = async () => {
        try {
            const response = await axios.get(answersUrl);
            setAnswers(response.data);
        } catch (error) {
            console.error('Error fetching answers:', error);
            Alert.alert('Error', 'Failed to fetch answers.');
        } finally {
            setFetchingAnswers(false);
        }
    };

    const handleAnswerEdit = (answer) => {
        console.log("Edit answer:", answer.id);
        navigation.navigate("EditAnswerScreen", { quizId, question, answer });
    };
    // const handleViewAnswer = (answer) => {
    //     // Navigate to a screen to view the details of the selected answer
    //     console.log("View answer:", answer.id);
    //     navigation.navigate("EditAnswerScreen", { quizId, question, answer });
    // };

    const handleAnswerDelete = async (answer) => {
        try {
            // Show confirmation alert
            Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete this answer?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            let deleteUrl = answersUrl + `${answer.id}/`;
                            console.log(deleteUrl);
                            await axios.delete(deleteUrl);
                            console.log('Answer deleted successfully!');
                            // After successful deletion, fetch the updated list of answers
                            fetchAnswers();
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error deleting answer:', error);
            // Handle error, show a message, etc.
            Alert.alert('Error', 'Failed to delete answer.');
        }
    };


    const handleAddNewAnswer = () => {
        navigation.navigate("AddNewAnswer", { quizId, questionId: question.id, existingAnswers: answers });
    };

    const renderAnswerItem = ({ item, index }) => {
        if (index === 0) { // Render header row for the first item
            return (
                <View style={[styles.answerItem, styles.headerRow]}>
                    <Text style={styles.headerText}>S/N</Text>
                    <Text style={styles.headerText}>Answer</Text>
                    <Text style={styles.headerText}>Correct</Text>
                    <Text style={styles.headerText}>Actions</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.answerItem}>
                    <Text>{index}</Text>
                    <Text>{item.text}</Text>
                    <Text>{item.is_correct ? 'True' : 'False'}</Text>
                    <View style={styles.answerButtonContainer}>
                        {/*<TouchableOpacity onPress={() => handleViewAnswer(item)}>*/}
                        {/*    <Icon name="eye-outline" size={24} color="green" />*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity onPress={() => handleAnswerEdit(item)}>
                            <Icon name="create-outline" size={24} color="#007bff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAnswerDelete(item)}>
                            <Icon name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{question.text}</Text>
                <Text style={styles.updatedText}>Quiz: {quizTitle}</Text>
            </View>
            {fetchingAnswers ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <FlatList
                        data={answers}
                        renderItem={renderAnswerItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <Text style={styles.updatedText}>Updated: {formatDateTime(question.updated_at)}</Text>
                </>
            )}
            <ActionButton buttonColor="#007bff" onPress={handleAddNewAnswer} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
    },
    header: {
        alignItems: "center",
        paddingVertical: 20,
    },
    answerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRightWidth: 1, // Add border to the right side
        borderRightColor: '#ddd', // Border color
    },
    answerButtonContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    updatedText: {
        fontSize: 12,
        color: "gray",
        marginTop: 'auto',
        alignSelf: 'center',
    },
    headerRow: {
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontWeight: 'bold',
    },
});

export default EditDeleteQuestion;
