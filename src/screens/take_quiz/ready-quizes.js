import React from "react";
import { View, StyleSheet, Text, FlatList, RefreshControl, TouchableOpacity, Animated, Easing } from "react-native";
import { QuizItem } from "../../components/quiz-item";

export const ReadyQuizzes = ({ data, refreshing, onRefresh, onSelectQuiz }) => {
    const renderItem = ({ item, index }) => {
        // Animation for quiz items
        const scale = new Animated.Value(0);
        Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        return (
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <QuizItem id={item.id} title={item.title} created_at={item.created_at} updated_at={item.updated_at} />
                <TouchableOpacity style={styles.selectButton} onPress={() => onSelectQuiz(item)}>
                    <Text style={styles.selectButtonText}>Take Quiz</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <FlatList
            data={data}
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
    );
};

const styles = StyleSheet.create({
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
});
