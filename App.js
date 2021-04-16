import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/Routes";
import { StatusBar } from "react-native";
export default function App() {
  return (    
    <>
    <StatusBar backgroundColor="#000" barStyle="light-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      </>
  );
}
