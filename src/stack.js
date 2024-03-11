import QuizScreen from "./screens/quizScreen";
import QuizDetailsScreen from "./screens/quiz-details";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const QuizStack = ()=> {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Quiz-Details" component={QuizDetailsScreen} />
        </Stack.Navigator>
    );
}
