import { StyleSheet, Text, View, Pressable, ScrollView, Keyboard } from 'react-native'
import mainStyles from '../styles/mainStyle.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmailInputCustom, TextInputCustom, GenderPickerCustom, DateInputCustom } from '../components/TextInputCustom.js'
import { useState, useEffect } from 'react'

export default function CreateProfile_page({ navigation }) {



    const [name, setName] = useState("")
    const [nameValid, setNameValid] = useState(false)
    const [surname, setSurname] = useState("")
    const [surnameValid, setSurnameValid] = useState(false)
    const [patronymic, setPatronymic] = useState("")
    const [birthdayDate, setBirthdayDate] = useState("")
    const [birthdayDateValid, setBirthdayDateValid] = useState(false)
    const [gender, setGender] = useState("")
    const [genderValid, setGenderValid] = useState(false)
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false)

    const [keyboardHeight, setKeyboardHeight] = useState(0)

    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (event) => {
            setKeyboardHeight(event.endCoordinates.height)

        }
    )

    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardHeight(0)
        }
    )



    const onRegisterPressed = () => {
        if (nameValid && surnameValid && birthdayDateValid && genderValid && emailValid) {
            console.log("Registration successful! Navigating to CreatePassword...")
            navigation.navigate("CreatePassword", {
                name,
                surname,
                patronymic,
                birthdayDate,
                gender,
                email
            })
        } else {
            console.log("Registration failed. Please check your credentials.")
        }
    }

    return (
        <SafeAreaView style={{ ...mainStyles.container, paddingTop: 20 }}>
            <View style={{ marginBottom: Math.floor(keyboardHeight) + 20 }}>
                <ScrollView>

                    <View
                        style={{
                            alignItems: 'center',
                            width: '100%',
                            gap: 23,
                        }}>
                        <Text style={mainStyles.title}>Создание Профиля</Text>
                        <Text style={mainStyles.subtitle}>Без профиля вы не сможете создавать проекты.</Text>
                        <Text style={mainStyles.subtitle}>В профиле будут храниться результаты проектов и ваши описания.</Text>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}
                    >
                        <TextInputCustom placeholder="Имя" value={name} onChangeText={(newValue) => {
                            setName(newValue)
                            setNameValid(newValue.length > 0)
                        }} />
                        <TextInputCustom placeholder="Фамилия" value={surname} onChangeText={(newValue) => {
                            setSurname(newValue)
                            setSurnameValid(newValue.length > 0)
                        }} />
                        <TextInputCustom placeholder="Отчество" value={patronymic} onChangeText={(newValue) => {
                            setPatronymic(newValue)
                        }} />
                        <DateInputCustom placeholder="Дата рождения (ДД.ММ.ГГГГ)" value={birthdayDate} onChangeText={setBirthdayDate} setIsDateValid={setBirthdayDateValid} />
                        <GenderPickerCustom value={gender} onValueChange={setGender} setGenderValid={setGenderValid} />
                        <EmailInputCustom value={email} onChangeText={setEmail} setIsEmailValid={setEmailValid} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={onRegisterPressed}
                            disabled={!(emailValid && birthdayDateValid && nameValid && surnameValid && genderValid)}
                            style={({ pressed }) => [
                                styles.button,
                                (emailValid && birthdayDateValid && nameValid && surnameValid && genderValid) ? styles.buttonActive : styles.buttonDisabled,
                                pressed && styles.buttonPressed,
                            ]}>
                            <Text style={styles.buttonText}>Далее</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{
                                    color: "#2074F2",
                                    fontSize: 16,
                                }}>Войти</Text>
                        </Pressable>
                    </View>

                </ScrollView>
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
})