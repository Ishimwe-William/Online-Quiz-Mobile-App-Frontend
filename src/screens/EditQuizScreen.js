import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { getQuizUrl } from "../urls";

const EditQuizScreen = ({ route, navigation }) => {
    const { quizId, quizTitle } = route.params;
    const quizUrl = getQuizUrl();

    // State for the edited quiz title
    const [editedTitle, setEditedTitle] = useState(quizTitle);

    // Function to handle save button press
    const handleSave = async () => {
        try {
            // Send a PATCH request to update the quiz title
            await axios.patch(`${quizUrl}${quizId}/`, { title: editedTitle });

            // Log success message
            console.log(`Successfully updated quiz ${quizId} with title: ${editedTitle}`);

            // Navigate back to QuizScreen or any other desired screen
            navigation.navigate("Quiz");
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error updating quiz:", error);
        }
    };

    // Function to handle cancel button press
    const handleCancel = () => {
        // Navigate back to QuizScreen without saving changes
        navigation.navigate("Quiz");
    };

    return (
        <View style={styles.container}>
            <Text>Edit Quiz with ID: {quizId}</Text>
            {/* TextInput for editing quiz title */}
            <TextInput
                style={styles.input}
                placeholder="Enter new title"
                value={editedTitle}
                onChangeText={setEditedTitle}
            />
            {/* Save and Cancel buttons */}
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={handleCancel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
        width: 250,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 200,
    },
});

export default EditQuizScreen;
