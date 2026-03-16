import { TextInput, View, Pressable, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react-native'
import mainStyles from '../styles/mainStyle.js';



export function PasswordInputCustom({ value, onChangeText, setIsPasswordValid, customError = "" }) {

    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("")

    function onPasswordInput(newValue) {
        let clearValue = newValue.trim()
        onChangeText(clearValue)

        if (clearValue.length < 3 || clearValue.length > 20) {
            setPasswordErrorText(clearValue == "" ? "" : "Пароль должен содержать от 3 до 20 символов")
            setIsPasswordValid(false)
        } else {
            setPasswordErrorText("")
            setIsPasswordValid(true)
        }
    }

    return (
        <View>
            <View
                style={{
                    display: "relative",
                    width: '100%',
                }}>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onPasswordInput}
                    style={styles.input}
                />

                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: "50%",
                        transform: [{ translateY: -17 }]
                    }}
                >
                    {showPassword ? (
                        <EyeOff size={20} color="#a1a1aa" />
                    ) : (
                        <Eye size={20} color="#a1a1aa" />
                    )}
                </Pressable>
            </View>
            <View className="min-h-5 mt-2" style={{ width: '200%', minHeight: 20 }}>
                <Text
                    style={{
                        color: "red"
                    }}
                >{(passwordErrorText ? passwordErrorText + '\n' : '') + customError}</Text>
            </View>

        </View>
    )
}

export function EmailInputCustom({ value, onChangeText, setIsEmailValid, customError = "" }) {

    const [emailErrorText, setEmailErrorText] = useState("")

    function onEmailInput(newValue) {
        let clearValue = newValue.trim()
        onChangeText(clearValue)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValueValidEmail = emailRegex.test(clearValue);
        if (!isValueValidEmail) {
            setEmailErrorText(clearValue == "" ? "" : "Введите корректный email")
            setIsEmailValid(false)
        } else {
            setEmailErrorText("")
            setIsEmailValid(true)
        }
    }

    return (
        <View
            style={{
                display: "relative",
                width: '100%',
            }}
        >
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onEmailInput}
                style={styles.input} />
            <View 
                style={{
                    minHeight: 20,
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >{(emailErrorText ? emailErrorText + '\n' : '') + customError}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        backgroundColor: "#F5F5F9",
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        placeholderTextColor: "#7E7E9A",

    },

});