import React, {useLayoutEffect, useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { getQuizUrl } from '../urls';
import {HeaderBackButton} from "@react-navigation/elements";

const AddQuizScreen = ({ navigation }) => {
    const [quizTitle, setQuizTitle] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Add Quiz",
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

    const handleCreateQuiz = async () => {
        try {
            // Check if quizTitle is empty
            if (!quizTitle.trim()) {
                // Show an error message to the user
                Alert.alert('Error', 'Quiz title cannot be empty.');
                return;
            }

            // Send a request to create a new quiz
            await axios.post(getQuizUrl(), { title: quizTitle });
            console.log(quizTitle);

            // Navigate back to the QuizScreen
            navigation.goBack();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                Alert.alert("🚫 Not Authorized", "Please Login!");

            } else {
                // Handle other types of errors
                console.error('An error occurred:', error);
                Alert.alert('Error', 'Failed to create quiz. Please try again later.');
            }
        }
    };

    const handleCancel = () => {
        // Navigate back to the QuizScreen without creating a quiz
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Create Quiz</Text>
            {/* TextInput for editing quiz title */}
            <TextInput
                style={styles.input}
                placeholder="Enter new title"
                value={quizTitle}
                onChangeText={setQuizTitle}
            />
            {/* Save and Cancel buttons */}
            <View style={styles.buttonContainer}>
                <Button title="Create" onPress={handleCreateQuiz} />
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
        marginVertical: 20,
        width: 250,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
    },
});

export default AddQuizScreen;
