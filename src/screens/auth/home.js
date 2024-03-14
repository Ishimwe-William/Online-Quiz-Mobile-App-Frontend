import React, {useLayoutEffect} from 'react';
import {Button, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";

const HomeScreen = () => {
    const image = require('../../img/logo.jpg');
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Home",
            headerLeft: ()=>(
                <Text></Text>
            )
        })
    })

    function handleLogin() {
        // Navigate to the login screen
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Welcome to Bunsen Quiz</Text>
                <Button title={"Login"} onPress={handleLogin}/>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});

export default HomeScreen;
