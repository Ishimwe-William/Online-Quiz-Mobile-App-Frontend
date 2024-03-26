import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { getQuizQuestionsUrl, setQuestionAnswersUrl } from "../../urls";
import { HeaderBackButton } from "@react-navigation/elements";
import { Alert } from 'react-native';

const TakeQuizPage = ({ navigation }) => {
    const route = useRoute();
    const { quiz } = route.params; // Assuming you pass quiz as a parameter
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${quiz.title}`,
            headerLeft: () => (
                <HeaderBackButton
                    tintColor={"black"}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            )
        })
    })

    useEffect(() => {
        // Fetch quiz data including questions and options
        const fetchQuestionData = async () => {
            try {
                const response = await axios.get(getQuizQuestionsUrl(quiz.id));
                const fetchedQuestions = response.data;

                // Fetch options for each question
                const questionsWithOptions = await Promise.all(
                    fetchedQuestions.map(async question => {
                        try {
                            const optionsResponse = await axios.get(setQuestionAnswersUrl(quiz.id, question.id));
                            return { ...question, options: optionsResponse.data };
                        } catch (error) {
                            console.error(`Error fetching options for question ${question.id}:`, error);
                            // Handle error (e.g., show a message, set default options, etc.)
                            return { ...question, options: [] }; // Assuming empty options for now
                        }
                    })
                );

                setQuestions(questionsWithOptions);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuestionData();
    }, [quiz.id]);

    const handleAnswerSelection = (questionId, answerId, pointValue) => {
        console.log(pointValue)
        setSelectedAnswers(prevSelectedAnswers => {
            const isAnswerSelected = prevSelectedAnswers[questionId] === answerId;
            const newSelectedAnswers = { ...prevSelectedAnswers };

            if (isAnswerSelected) {
                delete newSelectedAnswers[questionId];
            } else {
                newSelectedAnswers[questionId] = answerId;
            }

            return newSelectedAnswers;
        });
    };

    const handleSubmitQuiz = async () => {
        try {
            let totalPoints = 0;

            // Iterate through selected answers
            for (const [questionId, selectedOptionId] of Object.entries(selectedAnswers)) {
                // Find the question corresponding to the selected answer
                const question = questions.find(question => question.id.toString() === questionId);

                if (question) {
                    // Find the selected option in the question's options
                    const selectedOption = question.options.find(option => option.id === selectedOptionId);

                    if (selectedOption && selectedOption.is_correct) {
                        // Add the point value of the question to the total points if the selected option is correct
                        totalPoints += question.point_value;
                    }
                }
            }

            // Show confirmation popup
            Alert.alert(
                "Submit Quiz",
                `Are you sure you want to submit the quiz? Your total points: ${totalPoints}`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Submit",
                        onPress: async () => {
                            try {
                                // Send data to backend endpoint
                                await axios.post(`http://127.0.0.1:8000/api/${quiz.id}/take-quiz/`, {
                                    selectedAnswers,
                                    totalPoints
                                });
                                // Show success message or navigate to another screen
                            } catch (error) {
                                console.error('Error submitting quiz:', error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {questions !== null && questions.length > 0 ? (
                <>
                    {questions.map(question => (
                        <View key={question.id} style={styles.questionContainer}>
                            <Text style={styles.questionText}>{question.text}</Text>
                            {question.options.map(option => (
                                <TouchableOpacity
                                    key={option.id}
                                    style={[styles.optionButton, { backgroundColor: selectedAnswers[question.id] === option.id ? '#28a745' : '#007bff' }]}
                                    onPress={() => handleAnswerSelection(question.id, option.id, option.point_value)}
                                >
                                    <Text style={styles.optionText}>{option.text}</Text>
                                </TouchableOpacity>
                            ))}
                            {question.options.length === 0 && <Text>No answer</Text>}
                        </View>
                    ))}
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            {questions !== null && questions.length > 0 && <Button title="Submit Quiz" onPress={handleSubmitQuiz} />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TakeQuizPage;
