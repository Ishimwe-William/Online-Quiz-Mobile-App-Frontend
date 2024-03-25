import React, {useState, useEffect, useLayoutEffect} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from "react-native";
import axios from "axios";
import {getQuizUrl} from "../../urls";
import {HeaderBackButton} from "@react-navigation/elements";

const EditQuizScreen = ({route, navigation}) => {
    const {quizId, quizTitle} = route.params;
    const quizUrl = getQuizUrl();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Edit Quiz",
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

    // State for the edited quiz title
    const [editedTitle, setEditedTitle] = useState(quizTitle);

    // Function to handle save button press
    const handleSave = async () => {
        try {
            // Check if quizTitle is empty
            if (!editedTitle.trim()) {
                // Show an error message to the user
                Alert.alert('Error', 'Quiz title cannot be empty.');
                return;
            }

            // Send a PATCH request to update the quiz title
            const response = await axios.patch(`${quizUrl}${quizId}/`, { title: editedTitle });

            // Log success message
            console.log(`Successfully updated quiz ${quizId} with title: ${editedTitle}`, response.data);

            // Navigate back to QuizScreen or any other desired screen
            navigation.navigate("Quiz-Stack");
        } catch (error) {
            // Log the error details
            console.error("Error updating quiz:", error);

            // You can also show an alert with the error message
            Alert.alert('Error', 'Failed to update quiz. Please try again.');
        }
    };


    // Function to handle cancel button press
    const handleCancel = () => {
        // Navigate back to QuizScreen without saving changes
        navigation.navigate("Quiz-Stack");
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
                <Button title="Save" onPress={handleSave}/>
                <Button title="Cancel" onPress={handleCancel}/>
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
