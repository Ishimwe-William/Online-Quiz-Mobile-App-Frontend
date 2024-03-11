import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {QuizStack} from "./src/stack";

export default function App() {
  return (
      <NavigationContainer>
        <QuizStack/>
      </NavigationContainer>
  );
}
