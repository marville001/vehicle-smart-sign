import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import Addvehicle from '../../screens/AddVehicle';

const AddVehicleStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          
        >
          <Stack.Screen name="AddVehicle" component={Addvehicle}  />
        </Stack.Navigator>
    )
}

export default AddVehicleStack
