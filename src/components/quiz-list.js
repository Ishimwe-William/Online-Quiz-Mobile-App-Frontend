import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { QuizItem } from "./quiz-item";

export const QuizList = ({data}) => {
    const renderItem = ({ item }) => {
        return <QuizItem id={item.id} title={item.title} />;
    };

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => console.log("refreshing...")}
                    />
                }
            />
        </View>
    );
};
