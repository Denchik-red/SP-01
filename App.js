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
import Basket_page from './screens/Basket_page';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Image } from 'react-native';


const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName='Catalog' screenOptions={{ headerShown: false, tabBarIconStyle: { width: 30, height: 30 } }} >
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

function MainStackNavigator() {
    return (
        <MainStack.Navigator initialRouteName='Basket'>
            <MainStack.Screen name="Main" component={MainTabNavigator} />
            <MainStack.Screen name="Basket" component={Basket_page} />
        </MainStack.Navigator>
    )
}


function AuthStackNavigator() {
    return (
        <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Profile" component={Profile_page} options={{ headerShown: true }} />
            <AuthStack.Screen name="Login" component={Login_page} />
            <AuthStack.Screen name="Registration" component={CreateProfile_page} />
            <AuthStack.Screen name="CreatePassword" component={CreatePassword_page} />
            <AuthStack.Screen
                name="CreateAccessPassword"
                component={CreateAccessPassword_page}
            />
            <AuthStack.Screen
                name="InterAccessPassword"
                component={InterAccessPassword_page}
            />
        </AuthStack.Navigator>
    )
}



function AppNavigator() {
    const { isAuthorized, setIsAuthorized } = useAuth()
    return (
        <NavigationContainer>
            {isAuthorized ? <MainStackNavigator /> : <AuthStackNavigator />}
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