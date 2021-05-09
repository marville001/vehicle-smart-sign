import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import Confirm from '../../screens/SignInSteps/Confirm';
import CameraScreen from '../../screens/SignInSteps/CameraScreen';

const EntryStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          
        >
          <Stack.Screen name="EntryHome" component={CameraScreen}  />
          <Stack.Screen name="Confirm" component={Confirm} />
        </Stack.Navigator>
    )
}

export default EntryStack
