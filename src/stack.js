import QuizScreen from "./screens/quizScreen";
import QuizDetailsScreen from "./screens/quiz-details";
import {createStackNavigator} from "@react-navigation/stack";
import AddQuizScreen from "./screens/AddQuizScreen";
import EditQuizScreen from "./screens/EditQuizScreen";
import DeleteQuizScreen from "./screens/DeleteQuizScreen";

const Stack = createStackNavigator();

export const QuizStack = ()=> {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Quiz-Details" component={QuizDetailsScreen} />
            <Stack.Screen name="AddQuiz" component={AddQuizScreen} />
            <Stack.Screen name="EditQuiz" component={EditQuizScreen} />
            <Stack.Screen name="DeleteQuiz" component={DeleteQuizScreen} />
        </Stack.Navigator>
    );
}
