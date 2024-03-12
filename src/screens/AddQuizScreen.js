import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { getQuizUrl } from '../urls';

const AddQuizScreen = ({ navigation }) => {
    const [quizTitle, setQuizTitle] = useState('');

    const handleCreateQuiz = async () => {
        try {
            // Send a request to create a new quiz
            await axios.post(getQuizUrl(), { title: quizTitle });
            console.log(quizTitle)

            // Navigate back to the QuizScreen
            navigation.goBack();
        } catch (error) {
            console.log(error);
            // Handle error, show a message, etc.
        }
    };

    const handleCancel = () => {
        // Navigate back to the QuizScreen without creating a quiz
        navigation.goBack();
    };

    return (
        <View>
            {/* Add UI components for the quiz form */}
            <TextInput
                placeholder="Quiz Title"
                value={quizTitle}
                onChangeText={setQuizTitle}
            />
            <Button title="Create Quiz" onPress={handleCreateQuiz} />
            <Button title="Cancel" onPress={handleCancel} />
        </View>
    );
};

export default AddQuizScreen;
