import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Login_page from './screens/Login_page'
import CreateProfile_page from './screens/CreateProfile_page';
import CreatePassword_page from './screens/CreatePassword_page';
import InterAccessPassword_page from './screens/InterAccessPassword._page';
import CreateAccessPassword_page from './screens/CreateAccessPassword_page';
import Profile_page from './screens/Profile_page';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Profile"
                component={Profile_page}
                options={{ tabBarLabel: 'Профиль' }}
            />
        </Tab.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='CreateAccessPassword' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile_page} options={{ headerShown: true }} />
            <Stack.Screen name="Login" component={Login_page} />
            <Stack.Screen name="Registration" component={CreateProfile_page} />
            <Stack.Screen name="CreatePassword" component={CreatePassword_page} />
            <Stack.Screen
                name="CreateAccessPassword"
                component={CreateAccessPassword_page}
            />
            <Stack.Screen
                name="InterAccessPassword"
                component={InterAccessPassword_page}
            />
        </Stack.Navigator>
    )
}



function AppNavigator() {
    const { isAuthorized, setIsAuthorized } = useAuth()
    return (
        <NavigationContainer>
            {isAuthorized ? <MainTab /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default function App() {

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <AppNavigator/>
            </AuthProvider>
        </SafeAreaProvider>
    );
}