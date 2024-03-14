import QuizScreen from "./screens/quizScreen";
import QuizDetailsScreen from "./screens/quiz-details";
import {createStackNavigator} from "@react-navigation/stack";
import AddQuizScreen from "./screens/AddQuizScreen";
import EditQuizScreen from "./screens/EditQuizScreen";
import DeleteQuizScreen from "./screens/DeleteQuizScreen";
import EditDeleteQuestion from "./screens/questions/EditDeleteQuestion";
import AddQuestion from "./screens/questions/AddQuestion";
import AddAnswer from "./screens/answers/AddAnswer";
import AddNewAnswer from "./screens/answers/AddNewAnswer";
import EditAnswerScreen from "./screens/answers/ViewAnswerScreen";
import {useNavigation} from "@react-navigation/native";
import {navOptions} from "./options";

const Stack = createStackNavigator();

export const QuizStack = ()=> {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Quiz-Stack" component={QuizScreen}  />
            <Stack.Screen name="Quiz-Details" component={QuizDetailsScreen} />
            <Stack.Screen name="AddQuiz" component={AddQuizScreen} />
            <Stack.Screen name="EditQuiz" component={EditQuizScreen} />
            <Stack.Screen name="DeleteQuiz" component={DeleteQuizScreen} />

            <Stack.Screen name="EditDeleteQuestion" component={EditDeleteQuestion} />
            <Stack.Screen name="AddQuestion" component={AddQuestion} />

            <Stack.Screen name="AddAnswer" component={AddAnswer} />
            <Stack.Screen name="AddNewAnswer" component={AddNewAnswer} />
            <Stack.Screen name="EditAnswerScreen" component={EditAnswerScreen} />

        </Stack.Navigator>
    );
}
