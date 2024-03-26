import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export const QuizDescription = ({ id, title, created_at, updated_at }) => {
    const [expanded, setExpanded] = useState(false);

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


    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={toggleExpansion}>
            <Text style={{ fontSize: 20, color: 'black' }}>{title}</Text>
            {expanded && (
                <View>
                    <Text>Last Updated: {formatDateTime(updated_at)}</Text>
                    {/* Add more description fields here */}
                </View>
            )}
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
