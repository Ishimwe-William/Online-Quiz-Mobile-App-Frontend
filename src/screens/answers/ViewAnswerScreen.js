import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {editAnswersUrl, getQuizUrl, setQuestionAnswersUrl} from "../../urls";
import axios from "axios"; // You can use any icon library you prefer

const EditAnswerScreen = ({route, navigation}) => {
    // Extract the answer details from the route params
    const {answer, question, quizId} = route.params;
    console.log(question, quizId)


    // State variables to hold the edited answer details
    const [editedText, setEditedText] = useState(answer.text);
    const [editedIsCorrect, setEditedIsCorrect] = useState(answer.is_correct);
    const [editMode, setEditMode] = useState(false);

    // Function to handle saving the edited answer
    const handleSave = async () => {
        try {
            if (!editedText.trim()) {
                // Show an error message to the user
                Alert.alert('Error', 'Answer cannot be empty.');
                return;
            }

            // Send a request to update the answer
            await axios.patch(editAnswersUrl(quizId, question.id, answer.id), {
                text: editedText,
                is_correct: editedIsCorrect,
            });

            // Navigate back
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert("Error updating answer")
        }

        // After saving, exit edit mode
        setEditMode(false);
    };

    // Function to handle canceling editing
    const handleCancel = () => {
        // Reset edited text and is_correct to original values
        setEditedText(answer.text);
        setEditedIsCorrect(answer.is_correct);
        // Exit edit mode
        setEditMode(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.updatedText}>Question: {question.text}:</Text>
            {!editMode && (
                <>
                    <Text style={styles.label}>Answer Details:</Text>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Text:</Text>
                        <Text style={styles.detailText}>{editedText}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Is Correct:</Text>
                        <TouchableOpacity style={styles.checkbox} disabled={true}>
                            {editedIsCorrect ? (
                                <Icon name="check-box" size={24} color="#007bff"/>
                            ) : (
                                <Icon name="check-box-outline-blank" size={24} color="#007bff"/>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {editMode && (
                <>
                    <Text style={styles.label}>Edit Answer:</Text>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Text:</Text>
                        <TextInput
                            style={styles.input}
                            value={editedText}
                            onChangeText={setEditedText}
                        />
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Is Correct:</Text>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => setEditedIsCorrect(!editedIsCorrect)}
                        >
                            {editedIsCorrect ? (
                                <Icon name="check-box" size={24} color="#007bff"/>
                            ) : (
                                <Icon name="check-box-outline-blank" size={24} color="#007bff"/>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <View style={styles.buttonContainer}>
                {editMode && (
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.button, editMode ? styles.saveButton : styles.editButton]}
                    onPress={editMode ? handleSave : () => setEditMode(true)}
                >
                    <Text style={styles.buttonText}>{editMode ? 'Save' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    detailText: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
    },
    saveButton: {
        backgroundColor: '#28a745',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    checkbox: {
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 5,
        padding: 5,
    },
    updatedText: {
        fontSize: 12,
        color: "gray",
        alignSelf: 'center',
    },
});

export default EditAnswerScreen;
