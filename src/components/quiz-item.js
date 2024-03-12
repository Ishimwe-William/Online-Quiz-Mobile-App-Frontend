import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";

export const QuizItem = ({id, title,created_at,updated_at}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.card} onPress={() =>
            navigation.navigate("Quiz-Details", {quiz_id: id, title,created_at,updated_at})}>
            <Text style={{fontSize: 20, color: 'black'}}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5,
        padding: 5,
    },
});
