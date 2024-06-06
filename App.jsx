import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/routes/mainStack.routes'

const App = () => {
    return (
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
    )
   
};

export default App;
