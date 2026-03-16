import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login_page from './screens/Login_page';
import Registration_page from './screens/Registration_page';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login_page} />
                    <Stack.Screen name="Registration" component={Registration_page} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}