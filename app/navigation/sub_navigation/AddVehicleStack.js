import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import Addvehicle from '../../screens/AddVehicle';
import Addvehicle1 from '../../screens/AddVehicle1';

const AddVehicleStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          
        >
          <Stack.Screen name="AddVehicle" component={Addvehicle1}  />
        </Stack.Navigator>
    )
}

export default AddVehicleStack
