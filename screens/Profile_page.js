import { Text, View, ActivityIndicator, Image, Switch, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.js';
import * as apiItem from '../util/apiItem.js';
import api from '../util/getApi.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyles from '../styles/mainStyle.js'




export default function Profile_page() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    const [isEnabled, setIsEnabled] = useState(false);

    const { setIsAuthorized } = useAuth()

    function onExitBtnPress() {
        apiItem.removeItem("userId")
        apiItem.removeItem("token")
        setIsAuthorized(false)

    }

    useEffect(() => {
        const getUserData = async () => {
            const userId = await apiItem.getItem("userId")
            if (userId) {
                const res = await api.get(`/collections/users/records/${userId}`)
                setUserData(res.data)
                setLoading(false)
            }

        }
        getUserData()
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={mainStyles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <View>
                <View style={{
                    paddingTop: 30,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        textAlign: 'start',
                    }}>
                        {userData.first_name}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#666',
                        textAlign: 'start',
                        paddingHorizontal: 20,
                    }}>
                        {userData.email}
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginTop: 40,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../assets/orders.png')}
                            style={{
                                width: 40,
                                height: 40,
                                margin: 10,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                marginStart: 15,
                            }}
                        >
                            Мои заказы
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../assets/notifications.png')}
                            style={{
                                width: 40,
                                height: 40,
                                margin: 10,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                marginStart: 15,
                            }}
                        >
                            Уведомления
                        </Text>
                        <View style={{
                            justifyContent: 'flex-end',
                            width: '100%',
                            flexDirection: 'row',
                            flex: 1,
                            paddingEnd: 20,
                        }}>
                            <Switch
                                value={isEnabled}
                                onValueChange={setIsEnabled}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            padding: 50,
                            alignContent: 'center',
                            height: '100%',
                            width: '100%',
                            gap: 20,
                        }}
                    >
                        <Pressable>
                            <Text style={{
                                color: '#939396',
                                textAlign: 'center'
                            }}>
                                Политика конфиденциальности
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={{
                                color: '#939396',
                                textAlign: 'center'
                            }}>Политика конфиденциальности</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { onExitBtnPress() }}
                        >
                            <Text style={{
                                color: '#FD3535',
                                textAlign: 'center'
                            }}>Выход</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )

}