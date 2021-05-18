import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import Search from '../../screens/Search/Search';

const SearchStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Search" component={Search}  />
        </Stack.Navigator>
    )
}

export default SearchStack
