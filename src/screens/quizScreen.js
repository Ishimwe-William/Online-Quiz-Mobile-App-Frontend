import { View} from "react-native";
import {QuizList} from "../components/quiz-list";
import {useEffect, useState} from "react";
import axios from "axios";
import {getQuizUrl} from "../urls";

export default function QuizScreen() {
    const [data, setData] = useState([])
    const quizUrl = getQuizUrl();

    useEffect(() => {
        async function getAllQuizes() {
            try {
                const quizes = await axios.get(quizUrl)
                console.log(quizes.data)
                setData(quizes.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllQuizes()
    }, [])

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <QuizList data={data} />
        </View>
    );
}

