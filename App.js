import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {QuizStack} from "./src/stack";
import Drawers from "./src/drawer";
import {StatusBar} from "expo-status-bar";
import {ThemeProvider} from "react-native-elements";
import RootNavigation from "./src/screens/auth";

export default function App() {
  return (
      <NavigationContainer>
        {/*<Drawers/>*/}
          <RootNavigation/>
          <StatusBar style={'dark'}/>
      </NavigationContainer>

  );
}
