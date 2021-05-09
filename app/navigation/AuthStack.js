import React from 'react'

import Login from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack"
import AppTabScreen from './main_navigation/AppTabScreen';

const AuthStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={AppTabScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
