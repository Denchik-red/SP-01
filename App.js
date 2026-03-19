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
import Main_page from './screens/Main_page';
import Catalog_page from './screens/Catalog_page';
import Projects_page from './screens/Projects_page';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false, tabBarIconStyle: { width: 30, height: 30} }}>
            <Tab.Screen
                name="Main"
                component={Main_page}
                options={{
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Image
                                source={require('./assets/home.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#007BFF' : '#999'
                                }}
                                resizeMode="contain"
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Catalog"
                component={Catalog_page}
                options={{
                    tabBarLabel: 'Каталог',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Image
                                source={require('./assets/catalog.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#007BFF' : '#999'
                                }}
                                resizeMode="contain"
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Projects"
                component={Projects_page}
                options={{
                    tabBarLabel: 'Проекты',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Image
                                source={require('./assets/projects.png')}
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? '#007BFF' : '#999'
                                }}
                                resizeMode="contain"
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile_page}
                options={{
                    tabBarLabel: 'Профиль',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Image
                                source={require('./assets/profile.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#007BFF' : '#999'
                                }}
                                resizeMode="contain"
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
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
                <AppNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}