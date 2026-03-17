import { StyleSheet, Text, View, Pressable } from 'react-native'
import mainStyles from '../styles/mainStyle.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PasswordInputCustom } from '../components/TextInputCustom.js';
import { useState } from 'react'
import api from '../util/getApi.js'
import * as apiToken from '../util/apiToken.js';


export default function CreatePassword_page({ navigation, route }) {

    const { name, surname, patronymic, birthdayDate, gender, email } = route.params;

    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)

    const [apiError, setApiError] = useState("")

    async function updateUserProfile({ first_name, last_name, patronymic, birthday, gender }, userId) {
        const updateProfileRes = await api.patch(`/collections/users/records/${userId}`, {
            first_name,
            last_name,
            patronymic,
            birthday,
            gender
        })
        return updateProfileRes
    }

    const onRegisterPressed = async () => {
        setApiError("")
        if (passwordValid && confirmPasswordValid && email) {
            console.log("Form is valid, attempting to register...")

            try {
                const res = await api.post("/collections/users/records", {
                    email: email,
                    password: password,
                    passwordConfirm: confirmPassword
                })
                console.log(res)

                const authRes = await api.post("/collections/users/auth-with-password", {
                    identity: email,
                    password: password,
                })
                console.log(authRes)
                if (authRes.data?.token) {
                    apiToken.saveToken(authRes.data.token)
                    const updateProfileRes = await api.patch(`/collections/users/records/${res.data.id}`, {
                        first_name: name,
                        last_name: surname,
                        patronymic: patronymic,
                        birthday: parceDate(birthdayDate),
                        gender: gender
                    })
                    console.log(updateProfileRes.data)
                }

            } catch (error) {
                console.log(error.response.data)
                if (error.response.data.data.email.message == "Value must be unique.") {
                    setApiError("Пользователь с таким email уже существует.")
                } else {
                    setApiError("Не удалось подключиться к серверу.")
                }
            }
        } else {
            console.log("Login failed. Please check your credentials.")
        }
    }

    return (
        <SafeAreaView style={{ ...mainStyles.container, paddingTop: 103 }}>
            <View
                style={{
                    alignItems: 'center',
                    width: '100%',
                    gap: 23,
                }}>
                <Text style={mainStyles.title}>Создание пароля</Text>
                <Text style={mainStyles.subtitle}>Введите пароль</Text>
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
                    >Пароль</Text>
                    <PasswordInputCustom value={password} onChangeText={setPassword} setIsPasswordValid={setPasswordValid} customError={password !== confirmPassword ? "Пароли не совпадают" : ""}></PasswordInputCustom>
                </View>

                <View>
                    <Text
                        style={{
                            color: "#7E7E9A",
                            paddingBottom: 4,
                        }}
                    >Повторите пароль</Text>
                    <PasswordInputCustom value={confirmPassword} onChangeText={setConfirmPassword} setIsPasswordValid={setConfirmPasswordValid} customError={password !== confirmPassword ? "Пароли не совпадают" : ""}></PasswordInputCustom>
                </View>
                {apiError ? (
                    <Text
                        style={{
                            color: "red",
                            textAlign: "center",
                            marginTop: 10,
                        }}>{apiError}</Text>
                ) : null}

            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={onRegisterPressed}
                    disabled={!(confirmPasswordValid && passwordValid && password === confirmPassword)}
                    style={({ pressed }) => [
                        styles.button,
                        (confirmPasswordValid && passwordValid && password === confirmPassword) ? styles.buttonActive : styles.buttonDisabled,
                        pressed && styles.buttonPressed,
                    ]}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </Pressable>
            </View>
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

function parceDate(date) {
    const dateList = date.split('.')
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`
}