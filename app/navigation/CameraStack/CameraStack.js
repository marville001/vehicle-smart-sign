import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import Home from '../../scenes/Home';
import Confirm from '../../scenes/SignInSteps/Confirm';
import CameraScreen from '../../scenes/SignInSteps/CameraScreen';

const CameraStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Confirm" component={Confirm} />
        </Stack.Navigator>
    )
}

export default CameraStack
