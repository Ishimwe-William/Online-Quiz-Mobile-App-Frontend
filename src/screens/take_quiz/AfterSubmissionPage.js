// AfterSubmissionPage.js
import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";

const AfterSubmissionPage = ({ route }) => {
    const navigation = useNavigation();
    const { totalPoints,totalQuizMarks } = route.params; // Assuming you pass totalPoints as a parameter

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${"Quiz Results"}`,
            headerLeft: () => (
                <HeaderBackButton
                    tintColor={"black"}
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                />
            )
        })
    })

    const goToQuizzes = () => {
        navigation.navigate('AvailableQuizzesStack');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Submitted Successfully!</Text>
            <Text style={styles.result}>Your Total Score: {totalPoints}/{totalQuizMarks}</Text>
            {/* You can display additional information here if needed */}
            <TouchableOpacity onPress={goToQuizzes} style={styles.selectButton} >
                <Text>Go to Quizzes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    result: {
        fontSize: 18,
        marginBottom: 10,
    },
    selectButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        alignItems: "center",
    },
});

export default AfterSubmissionPage;
