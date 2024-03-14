import {SafeAreaView, Text} from "react-native";
import {HeaderBackButton} from "@react-navigation/elements";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const LoginScreen =()=>{
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Login",
            headerLeft: ()=>(
                <HeaderBackButton
                    tintColor={"black"}
                    onPress={()=>{
                        navigation.goBack()
                    }}
                />
            )
        })
    })



    return(
        <SafeAreaView>
            <Text>Login</Text>
        </SafeAreaView>
    )
}
