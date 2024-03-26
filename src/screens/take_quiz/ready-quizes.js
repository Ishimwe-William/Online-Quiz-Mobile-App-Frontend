import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { QuizDescription } from "./SingleQuiz";

export const ReadyQuizzes = ({ data, refreshing, onRefresh, onSelectQuiz }) => {
    const [searchText, setSearchText] = useState('');

    const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <QuizDescription id={item.id} title={item.title} created_at={item.created_at} updated_at={item.updated_at} />
                <TouchableOpacity style={styles.selectButton} onPress={() => onSelectQuiz(item)}>
                    <Text style={styles.selectButtonText}>Take Quiz</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search quizzes..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#007bff']}
                    />
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    card: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        backgroundColor: "#fff",
        elevation: 3,
    },
    selectButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        alignItems: "center",
    },
    selectButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
});
