import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import RegSignIn from '../../screens/RegisterAndSignIn/RegSignIn';
import { colors } from '../../constants/theme';
import { Button } from 'react-native';



const RegSignInStack = ({navigation}) => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerBackTitle: "Add Vehicle"
          }}
        >
          <Stack.Screen 
          name="RegSignIn"
          options={{ 
            title: "Add Vehicle",
            headerStyle:{
              backgroundColor: colors.secondary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: ()=>(
              <Button
              onPress={() => navigation.navigate("Search Vehicle")}
              title="Back"
              color={colors.secondary}
              backgroundColor={colors.secondary}
            />
            )
          }}          
          component={RegSignIn}  />
        </Stack.Navigator>
    )
}

export default RegSignInStack
