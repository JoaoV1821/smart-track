import React, { useState } from 'react';
import { MainStackNavigator } from './src/routes/mainScreens.routes';
import { NavigationContainer } from '@react-navigation/native';
import Entrega from './src/pages/Entrega';
import Rastreio from './src/pages/Rastreio';


const App = () => {
    return (
        <NavigationContainer>
            <MainStackNavigator/>
        </NavigationContainer>
   
    )
   
};

export default App;
