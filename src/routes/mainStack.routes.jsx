import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Inicio from "../pages/Inicio";
import MainScreens from './mainScreens.routes'


export default MainStack = () => {
    const Stack = createNativeStackNavigator();
    
    return (

          <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name="Inicio" component={Inicio} options={{headerShown: false}}/>
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
              <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}} />
              <Stack.Screen name="MainScreens" component={MainScreens} options={{headerShown: false}} />
          </Stack.Navigator>
      )    
}
