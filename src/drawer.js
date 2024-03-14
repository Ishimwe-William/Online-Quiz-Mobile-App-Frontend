import {createDrawerNavigator} from '@react-navigation/drawer';
import {QuizStack} from "./stack";
import {HomeStack} from "./homeStack";

const Drawer = createDrawerNavigator();

export default function Drawers() {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{title: 'Home'}}/>
            <Drawer.Screen name="QuizStack" component={QuizStack} options={{title: 'Quiz'}}/>
        </Drawer.Navigator>
    );
}
