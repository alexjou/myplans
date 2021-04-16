import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Address from "../pages/Address";
import Map from "../pages/Map";
import Plans from "../pages/Plans";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Plans" component={Plans} />
    </Stack.Navigator>
  );
}
