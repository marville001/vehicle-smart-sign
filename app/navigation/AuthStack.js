import { View, Text } from 'react-native'
import Login from "../scenes/Login";
import { createStackNavigator } from "@react-navigation/stack";
import AppDrawer from './AppDrawer';

const AuthStack = () => {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={AppDrawer} />
        </Stack.Navigator>
    )
}

export default AuthStack
