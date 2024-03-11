import {createDrawerNavigator} from "@react-navigation/drawer";
import QuizScreen from "./screens/quizScreen";


const Drawer = createDrawerNavigator();

export default function Drawers() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Quizes" component={QuizScreen} />
        </Drawer.Navigator>
    );
}
