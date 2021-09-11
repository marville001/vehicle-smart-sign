import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import RegSignIn from '../../screens/RegisterAndSignIn/RegSignIn';

const RegSignInStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="RegSignIn" component={RegSignIn}  />
        </Stack.Navigator>
    )
}

export default RegSignInStack
