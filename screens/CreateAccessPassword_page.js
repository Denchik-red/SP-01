import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Text, Pressable, Platform } from "react-native"
import mainStyles from "../styles/mainStyle.js"
import { useState, useEffect, use } from "react"
import CircleButton from "../components/CircleButton.js"
import * as SecureStore from 'expo-secure-store';


export default function CreateAccessPassword_page({ navigation }) {

    const [code, setCode] = useState([])
    const [firstPassword, setFirstpassword] = useState("")
    const [error, setError] = useState(false)


    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 1000)
        }
    }, [error])

    useEffect(() => {
        if (code.length === 4) {
            const pin = code.join('');
            console.log("Введенный пин-код:", pin);
            if (firstPassword == "") {
                console.log("firstPassword ", firstPassword)
                setFirstpassword(pin)
                setCode([])
                return
            } else {
                if (pin !== firstPassword) {
                    setError(true)
                    setCode([])
                    setFirstpassword("")
                    return
                } else {
                    if (Platform.OS === "android") {
                        SecureStore.setItemAsync("pin", pin);
                        navigation.navigate("Profile")
                    }
                }
            }
        }
    }, [code]);

    return (
        <SafeAreaView>
            <View
                style={{
                    alignItems: 'center',
                    width: '100%',
                    gap: 23,
                    paddingTop: 103,
                }}
            >
                <Text style={mainStyles.title}>{firstPassword == "" ? "Создайте пароль" : "Введите пароль еще раз"}</Text>
                <Text style={mainStyles.subtitle}>Для защиты ваших персональных данных</Text>
            </View>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    gap: 10,
                    paddingTop: 20,
                }}
            >
                {
                    [...Array(4)].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                {
                                    width: 15,
                                    height: 15,
                                    borderRadius: 10,
                                    backgroundColor: code[index] !== undefined ? "#007BFF" : "#D9D9D9",
                                },
                                error && { backgroundColor: "red" }
                            ]}
                        />
                    ))
                }

            </View>
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

        </SafeAreaView>
    )
}