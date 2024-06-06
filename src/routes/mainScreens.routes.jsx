import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entrega from "../pages/Entrega";
import Rastreio from "../pages/Rastreio";
import Historico from "../pages/Historico";
import Home from "../pages/Home";
import {Ionicons} from '@expo/vector-icons'



export default MainScreens = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Entrega" screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Entrega') {
                    iconName = focused ? 'car' : 'car-outline';

                } else if (route.name === 'Rastreio') {
                    iconName = focused ? 'map' : 'map-outline';

                } else if (route.name === 'Historico') {
                    iconName = focused ? 'time' : 'time-outline';

                } else if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;

            },

            tabBarActiveTintColor: '#FFff',
            tabBarInactiveBackgroundColor: '#CC5803',    
            tabBarActiveBackgroundColor: '#CC5803',
            tabBarInactiveTintColor: '#fff',


        })}> 

        <Tab.Screen name="Home" component={Home}  options={{headerShown: false}} /> 
        <Tab.Screen name="Entrega" component={Entrega}  options={{headerShown: false}} />
        <Tab.Screen name="Rastreio" component={Rastreio}  options={{headerShown: false}}/>
        <Tab.Screen name="Historico" component={Historico}  options={{headerShown: false}} /> 


        </Tab.Navigator>
    )
}