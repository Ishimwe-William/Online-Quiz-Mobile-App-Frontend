import React, {useLayoutEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import {getQuizUrl} from "../../urls";
import {HeaderBackButton} from "@react-navigation/elements";

const EditQuizScreen = ({ route, navigation }) => {
    const { quizId,quizTitle } = route.params;
    let quizUrl = getQuizUrl();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Delete Quiz",
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

    // Function to handle save button press
    const handleConfirm = async () => {
        try {
            // Send a PATCH request to update the quiz title

            await axios.delete(`${quizUrl}${quizId}/`);

            // Log success message
            console.log(`Successfully deleted quiz ${quizId} with title: ${quizTitle}`);

            // Navigate back to QuizScreen or any other desired screen
            navigation.navigate("Quiz-Stack");
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error deleting quiz:", error);
        }
    };


    // Function to handle cancel button press
    const handleCancel = () => {
        // Navigate back to QuizScreen without saving changes
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Are you sure you want to delete Quiz with ID: {quizId}</Text>
            <Text>{quizTitle}</Text>
            {/* Confirm and cancel buttons */}
            <View style={styles.buttonContainer}>
                <Button title="Confirm" onPress={handleConfirm} color="red" />
                <Button title="Cancel" onPress={handleCancel} color="#007bff" />
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
        width: 200,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 200,
    },
});

export default EditQuizScreen;
