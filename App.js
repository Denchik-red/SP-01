import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Login_page from './screens/Login_page'
import CreateProfile_page from './screens/CreateProfile_page';
import CreatePassword_page from './screens/CreatePassword_page';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='CreatePassword' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login_page} />
                    <Stack.Screen name="Registration" component={CreateProfile_page} />
                    <Stack.Screen name="CreatePassword" component={CreatePassword_page} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}