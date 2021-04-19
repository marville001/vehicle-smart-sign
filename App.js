import React from "react";

import Feed from "./app/screens/Feed";
import Details from "./app/screens/Details";

import screen1 from "./app/screens/drawer/screen1";
import screen2 from "./app/screens/drawer/screen2";
import screen3 from "./app/screens/drawer/screen3";

import Tab1 from "./app/screens/tabs/Tab1";
import Tab2 from "./app/screens/tabs/Tab2";
import Tab3 from "./app/screens/tabs/Tab3";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTab = createBottomTabNavigator();

export default function App() {
  const createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={createHomeStack} />
        <Drawer.Screen name="Contacts" component={screen1} />
        <Drawer.Screen name="Favorites" component={screen2} />
        <Drawer.Screen name="Settings" component={screen3} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
