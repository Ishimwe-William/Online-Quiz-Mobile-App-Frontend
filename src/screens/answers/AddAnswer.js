import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import {setQuestionAnswersUrl} from "../../urls";
import {CheckBox} from 'react-native-elements';

const AddAnswer = ({navigation, route}) => {
    const {questionId, quizId} = route.params;
    const [answers, setAnswers] = useState([{text: '', isCorrect: false}, {text: '', isCorrect: false}]);

    const handleAddAnswer = async () => {
        try {
            if (answers.length < 2) {
                Alert.alert('Error', 'At least two answers are required.');
                return;
            }

            if (answers.some(answer => !answer.text.trim())) {
                Alert.alert('Error', 'Answer text cannot be empty.');
                return;
            }

            await Promise.all(answers.map(answer =>
                axios.post(setQuestionAnswersUrl(quizId, questionId), {text: answer.text, is_correct: answer.isCorrect})
            ));
            console.log('New answers added successfully!');

            navigation.navigate("Quiz-Details",{ quiz_id:"",title:"", updated_at:""});
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
        if (answers.length > 2) {
            const newAnswers = [...answers];
            newAnswers.splice(index, 1);
            setAnswers(newAnswers);
        } else {
            Alert.alert('Error', 'At least two answers are required.');
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
                    {answers.length > 2 &&
                        <Button title="Remove" onPress={() => handleRemoveAnswer(index)}/>
                    }
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Add Answer" onPress={handleAddAnswer}/>
                <Button title="Add Another Answer" onPress={handleAddAnotherAnswer}/>
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

export default AddAnswer;
