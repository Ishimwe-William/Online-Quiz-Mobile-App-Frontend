import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/logo.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <Text style={styles.title}>Welcome to Bunsen Online Quiz!</Text>

                <View style={styles.buttons}>
                    <Button
                        title="Sign In"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate("SignIn")}
                    />

                    <Button
                        title="Sign Up"
                        type="outline"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate("SignUp")}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttons: {
        width: '80%',
        marginBottom: 50,
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
    },
});

export default WelcomeScreen;
