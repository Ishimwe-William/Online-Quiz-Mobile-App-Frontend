import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from "react-native";


export const navOptions = (nav) => {
    return {
        headerTintColor: 'darkblue',
        headerStyle: {
            backgroundColor: 'lightgray'
        },
        headerRight: () => (
            <Icon
                name={"menu"}
                size={32}
                color={"darkblue"}
                onPress={() => nav.toggleDrawer()}
                style={{paddingRight:10}}
            />
        ),
        headerLeft: () => (
            <Text style={{color:"black", fontSize:20,paddingLeft:10}}>Logo</Text>
        )
    }
}
