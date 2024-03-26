import React from "react";
import { View, StyleSheet, Text, FlatList, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { QuizItem } from "./quiz-item";

export const QuizList = ({ data, onEdit, onDelete, refreshing, onRefresh }) => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <QuizItem id={item.id} title={item.title} created_at={item.created_at} updated_at={item.updated_at}/>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => onEdit(item)}>
                        <Icon name="create-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(item)}>
                        <Icon name="trash-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 5,
        margin: 10,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonDelete: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        marginLeft: 5,
    },
});
