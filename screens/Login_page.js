import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import mainStyles from '../styles/mainStyle.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PasswordInputCustom, EmailInputCustom } from '../components/TextInputCustom.js';
import { useState, useEffect } from 'react'
import api from '../util/getApi.js';
import * as apiToken from '../util/apiToken.js';



export default function Login_page({ navigation }) {

    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)

    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false)

    useEffect(() => {
        const checkToken = async () => {
            const token = await apiToken.getToken();
        }
        checkToken()
    }, []);

    const onLoginPressed = async () => {
        console.log(email, password)
        if (emailValid && passwordValid) {
            console.log("Login successful!");

            try {
                const res = await api.post("/collections/users/auth-with-password", {
                    identity: email,
                    password: password,
                })
                console.log(res)
                if (res.data?.token) {
                    apiToken.saveToken(res.data.token)
                }
            } catch (e) {
                console.error("Login error:", e);
            }

        } else {
            console.log("Login failed. Please check your credentials.");
        }
    }

    return (
        <SafeAreaView style={{ ...mainStyles.container, paddingTop: 103 }}>
            <ScrollView>
                <View
                    style={{
                        alignItems: 'center',
                        width: '100%',
                        gap: 23,
                    }}>
                    <Text style={mainStyles.title}>Добро пожаловать!</Text>
                    <Text style={mainStyles.subtitle}>Войдите, чтобы пользоваться функциями приложения</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: "#7E7E9A",
                                paddingBottom: 4,
                            }}
                        >Вход по E-mail</Text>
                        <EmailInputCustom value={email} onChangeText={setEmail} setIsEmailValid={setEmailValid}></EmailInputCustom>
                    </View>

                    <View>
                        <Text
                            style={{
                                color: "#7E7E9A",
                                paddingBottom: 4,
                            }}
                        >Пароль</Text>
                        <PasswordInputCustom value={password} onChangeText={setPassword} setIsPasswordValid={setPasswordValid}></PasswordInputCustom>
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={onLoginPressed}
                        disabled={!(emailValid && passwordValid)}
                        style={({ pressed }) => [
                            styles.button,
                            (emailValid && passwordValid) ? styles.buttonActive : styles.buttonDisabled,
                            pressed && styles.buttonPressed,
                        ]}>
                        <Text style={styles.buttonText}>Далее</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Registration')}
                    >
                        <Text
                            style={{
                                color: "#2074F2",
                                fontSize: 16,
                            }}>Зарегистрироваться</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 10,
        alignItems: "center"
    },
    button: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonActive: {
        backgroundColor: '#007BFF',
    },
    buttonDisabled: {
        backgroundColor: '#a1a1aa',
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});