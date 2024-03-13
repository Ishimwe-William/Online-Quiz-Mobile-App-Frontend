import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import {setQuestionAnswersUrl} from "../../urls";
import {CheckBox} from 'react-native-elements';

const AddNewAnswer = ({navigation, route}) => {
    const {questionId, quizId} = route.params;
    const [answers, setAnswers] = useState([{text: '', isCorrect: false}]);

    const handleAddAnswer = async () => {
        try {
            // Filter out empty answers
            const nonEmptyAnswers = answers.filter(answer => answer.text.trim() !== '');

            if (nonEmptyAnswers.length === 0) {
                Alert.alert('Error', 'At least one answer is required.');
                return;
            }

            // Post non-empty answers
            await Promise.all(nonEmptyAnswers.map(answer =>
                axios.post(setQuestionAnswersUrl(quizId, questionId), {text: answer.text, is_correct: answer.isCorrect})
            ));
            console.log('New answer(s) added successfully!');

            navigation.goBack();
        } catch (error) {
            console.error('Error adding answers:', error);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleAnswerTextChange = (index, text) => {
        const newAnswers = [...answers];
        newAnswers[index].text = text;
        setAnswers(newAnswers);
    };

    const handleCheckboxChange = (index) => {
        const newAnswers = [...answers];
        newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
        setAnswers(newAnswers);
    };

    const handleAddAnotherAnswer = () => {
        setAnswers([...answers, {text: '', isCorrect: false}]);
    };

    const handleRemoveAnswer = (index) => {
        if (answers.length > 1) {
            const newAnswers = [...answers];
            newAnswers.splice(index, 1);
            setAnswers(newAnswers);
        } else {
            Alert.alert('Error', 'At least one answer is required.');
        }
    };


    return (
        <View style={styles.container}>
            {answers.map((answer, index) => (
                <View key={index} style={styles.answerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter answer ${index + 1}`}
                        value={answer.text}
                        onChangeText={text => handleAnswerTextChange(index, text)}
                    />
                    <CheckBox
                        title='Is Correct'
                        checked={answer.isCorrect}
                        onPress={() => handleCheckboxChange(index)}
                        containerStyle={styles.checkboxContainer}
                    />
                    {answers.length > 1 &&
                        <Button title="Remove" onPress={() => handleRemoveAnswer(index)}/>
                    }
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleAddAnswer}/>
                <Button title="Add Answer Field" onPress={handleAddAnotherAnswer}/>
                <Button title="Cancel" onPress={handleCancel}/>
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
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});

export default AddNewAnswer;
