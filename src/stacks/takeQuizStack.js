import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {navOptions} from "../utils/options";
import AvailableQuizzes from "../screens/take_quiz/AvaliableQuizzes";

const Stack = createStackNavigator();

export const TakeQuizStack = ()=> {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="AvailableQuizzesStack" component={AvailableQuizzes}  />
        </Stack.Navigator>
    );
}
