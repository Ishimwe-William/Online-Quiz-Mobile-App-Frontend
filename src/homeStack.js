import QuizScreen from "./screens/quizScreen";
import QuizDetailsScreen from "./screens/quiz-details";
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {navOptions} from "./options";
import {LoginScreen} from "./screens/auth/login";
import HomeScreen from "./screens/auth/home";

const Stack = createStackNavigator();

export const HomeStack = ()=> {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen}  />
        </Stack.Navigator>
    );
}
