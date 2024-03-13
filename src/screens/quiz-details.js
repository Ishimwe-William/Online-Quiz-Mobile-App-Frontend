import React, {useState, useEffect} from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity,
    ActivityIndicator, RefreshControl, ScrollView, Alert
} from 'react-native';
import axios from 'axios';
import {getQuizQuestionsUrl} from "../urls";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute} from "@react-navigation/native";

export default function QuizDetailsScreen({navigation}) {
    const route = useRoute();
    const {quiz_id, title, updated_at} = route.params;

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        return new Date(dateTimeString).toLocaleString("en-US", options);
    };

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const questionUrl = getQuizQuestionsUrl(quiz_id);

    const getAllQuestions = async () => {
        try {
            const response = await axios.get(questionUrl);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            Alert.alert('Error', 'Failed to fetch questions.');
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(questionUrl);
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getAllQuestions();
    }, []);

    const handleAddQuestion = () => {
        navigation.navigate("AddQuestion", {quizId: quiz_id, quizTitle: title});
    };

    const handleEditQuestion = (question) => {
        navigation.navigate("EditDeleteQuestion", {question, quizId: quiz_id, quizTitle: title});
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            // Show confirmation alert
            Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete this question?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            let deleteUrl = questionUrl + `${questionId}/`;
                            await axios.delete(deleteUrl);
                            console.log('Question deleted successfully!');
                            getAllQuestions(); // Fetch updated questions after deletion
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error deleting question:', error);
            Alert.alert('Error', 'Failed to delete question.');
        }
    };

    const renderItem = ({item}) => {
        return (
            <View style={styles.questionItem}>
                <ScrollView horizontal>
                    <TouchableOpacity onPress={() => handleEditQuestion(item)}>
                        <Text style={styles.questionText}>{item.text}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleEditQuestion(item)}>
                            <Icon name="create-outline" size={24} color="blue" style={styles.iconButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteQuestion(item.id)}>
                            <Icon name="trash-outline" size={24} color="red" style={styles.iconButton}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quiz: {title}</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.quest}>Questions:</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    />
                </>
            )}
            <ActionButton buttonColor="#007bff" onPress={handleAddQuestion}/>
            <Text style={styles.updatedText}>Updated: {formatDateTime(updated_at)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        alignItems: "center",
        paddingVertical: 20,
    },
    quest: {
        fontSize: 19,
        fontWeight: "bold",
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    updatedText: {
        fontSize: 12,
        color: "gray",
        marginTop: 'auto',
        alignSelf: 'center',
    },
    questionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    questionText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
    },
});
