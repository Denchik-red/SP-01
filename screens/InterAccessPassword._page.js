import { SafeAreaView } from "react-native-safe-area-context"
import { Animated, ScrollView, View, Text, Pressable, Platform } from "react-native"
import mainStyles from "../styles/mainStyle.js"
import { useState, useEffect, useRef } from "react"
import CircleButton from "../components/CircleButton.js"
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../contexts/AuthContext.js'


export default function InterAccessPassword_page({ navigation }) {

    const { setIsAuthorized } = useAuth()
    const [code, setCode] = useState([])
    const [error, setError] = useState(false)

    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true, }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true, }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true, })
            ]).start()
            setTimeout(() => {
                setError(false)
            }, 1000)
        }
    }, [error])


    useEffect(() => {
        const checkPin = async () => {
            if (code.length === 4) {
                const pin = code.join('');
                if (Platform.OS == "android") {
                    if (pin === await SecureStore.getItemAsync("pin")) {
                        console.log("Pin is correct!")
                        setIsAuthorized(true)
                    } else {
                        setError(true)
                        console.log("Pin is incorrect!")
                        setCode([])
                    }
                }
            }
        }
        checkPin();
    }, [code]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={mainStyles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    Назад
                </Text>
                <View
                    style={{
                        alignItems: 'center',
                        width: '100%',
                        gap: 23,
                        paddingTop: 103,
                    }}
                >
                    <Text style={mainStyles.title}>Введите пароль</Text>
                </View>
                <Animated.View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "row",
                        gap: 10,
                        paddingTop: 20,
                        transform: [{
                            translateX: shakeAnim
                        }]
                    }}
                >
                    {
                        [...Array(4)].map((_, index) => (
                            <View
                                key={index}
                                style={
                                    [
                                        {
                                            width: 15,
                                            height: 15,
                                            borderRadius: 10,
                                            backgroundColor: code[index] !== undefined ? "#007BFF" : "#D9D9D9",
                                        },
                                        error && { backgroundColor: "red" }
                                    ]
                                }
                            />
                        ))
                    }

                </Animated.View>
                <View style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingTop: 200,
                    padding: 60,
                    gap: 20,

                }}>
                    {
                        [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["", 0, "<"]].map((row, rowIndex) => {
                            return (
                                <View key={`inputRow-${rowIndex}`} style={{ flexDirection: "row", gap: 20 }}>
                                    {
                                        row.map((button, buttonIndex) => {
                                            return <CircleButton key={`InputButton-${rowIndex}-${buttonIndex}`} button={button} buttonIndex={buttonIndex} rowIndex={rowIndex} setCode={setCode}></CircleButton>
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}