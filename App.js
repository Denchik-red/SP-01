import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Login_page from './screens/Login_page'
import CreateProfile_page from './screens/CreateProfile_page';
import CreatePassword_page from './screens/CreatePassword_page';
import InterAccessPassword_page from './screens/InterAccessPassword._page';
import CreateAccessPassword_page from './screens/CreateAccessPassword_page';
import { Text } from 'react-native'


const Stack = createNativeStackNavigator();

const Profile = () => {
    return (
        <Text>Profile</Text>
    )
}

export default function App() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Registration' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Login" component={Login_page} />
                    <Stack.Screen name="Registration" component={CreateProfile_page} />
                    <Stack.Screen name="CreatePassword" component={CreatePassword_page} />
                    <Stack.Screen name="InterAccessPassword" component={InterAccessPassword_page} />
                    <Stack.Screen name="CreateAccessPassword" component={CreateAccessPassword_page} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}