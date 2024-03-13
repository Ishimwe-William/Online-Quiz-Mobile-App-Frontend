import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { getQuizQuestionsUrl } from "../../urls";
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

const AddQuestion = ({ navigation }) => {
    const [questionText, setQuestionText] = useState('');
    const route = useRoute(); // Use the useRoute hook to access the route's params
    const { quizId, quizTitle } = route.params;

    const handleAddQuestion = async () => {
        try {
            // Check if questionText is empty
            if (!questionText.trim()) {
                // Show an error message to the user
                Alert.alert('Error', 'Question cannot be empty.');
                return;
            }

            // Send a request to add a new question
            const questionResponse = await axios.post(getQuizQuestionsUrl(quizId), { text: questionText, point_value: 1 }); // Pass quizId to getQuizQuestionsUrl
            console.log('New question added successfully:', questionResponse.data);

            // Navigate to AddAnswer screen with the created question ID
            navigation.navigate('AddAnswer', { questionId: questionResponse.data.id,quizId, quizTitle });
        } catch (error) {
            console.error('Error adding question:', error);
            // Handle error, show a message, etc.
        }
    };

    const handleCancel = () => {
        // Navigate back to the QuizDetailsScreen without adding a question
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>{quizTitle}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter question"
                value={questionText}
                onChangeText={setQuestionText}
            />
            <View style={styles.buttonContainer}>
                <Button title="Add Question" onPress={handleAddQuestion} />
                <Button title="Cancel" onPress={handleCancel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: 250,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
    },
});

export default AddQuestion;
