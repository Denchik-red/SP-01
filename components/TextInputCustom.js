import { TextInput, View, Pressable, Text, StyleSheet, Modal } from 'react-native'
import { useState } from 'react'
import { Eye, EyeOff, ChevronDown } from 'lucide-react-native'
import mainStyles from '../styles/mainStyle.js';
import { Ionicons } from '@expo/vector-icons';

export function SearchBar({setSearchText}) {
    return (
        <View style={serchStyles.container}>
            <Ionicons name="search" size={20} color="#999" style={serchStyles.icon} />
            <TextInput
                style={serchStyles.input}
                placeholder="Искать описания"
                placeholderTextColor="#999"
                onChangeText={setSearchText}
            />
        </View>
    );
}

const serchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginHorizontal: 16,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 0,
    },
});


export function PasswordInputCustom({ value, onChangeText, setIsPasswordValid, customError = "" }) {

    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("")

    function onPasswordInput(newValue) {
        let clearValue = newValue.trim()
        onChangeText(clearValue)

        if (clearValue.length < 8 || clearValue.length > 20) {
            setPasswordErrorText(clearValue == "" ? "" : "Пароль должен содержать от 8 до 20 символов")
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

export function TextInputCustom({ value, onChangeText, customError = "", placeholder = ""}) {

    function onTextInput(newValue) {
        let clearValue = newValue.trim()
        onChangeText(clearValue)
    }

    return (
        <View
            style={{
                display: "relative",
                width: '100%',
            }}
        >
            <TextInput
                placeholder={placeholder}
                keyboardType="default"
                autoCapitalize="none"
                value={value}
                onChangeText={onTextInput}
                style={styles.input} 
                
                />
            <View 
                style={{
                    minHeight: 20,
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >{customError}</Text>
            </View>
        </View>
    )
}

export function DateInputCustom({ value, onChangeText, setIsDateValid, customError = "", placeholder = ""}) {
    const [dateError, setDateError] = useState("");

    const handleDateChange = (text) => {
        const cleaned = text.replace(/[^\d]/g, '');
        const length = cleaned.length;
        let formattedText = cleaned;
        if (length > 2) {
            formattedText = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
        }
        if (length > 4) {
            formattedText = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4, 8)}`;
        }

        onChangeText(formattedText);

        if (formattedText.length === 10) {
            const parts = formattedText.split('.');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month - 1, day);

            if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                setDateError("");
                setIsDateValid(true);
            } else {
                setDateError("Введите корректную дату");
                setIsDateValid(false);
            }
        } else {
            setDateError(text ? "Дата должна быть в формате ДД.ММ.ГГГГ" : "");
            setIsDateValid(false);
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
                placeholder={placeholder}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value}
                onChangeText={handleDateChange}
                style={styles.input}
                
                />
            <View 
                style={{
                    minHeight: 20,
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >{dateError || customError}</Text>
            </View>
        </View>
    )
}

export function GenderPickerCustom({ value, onValueChange, customError = "", setGenderValid}) {
    const [modalVisible, setModalVisible] = useState(false);
    const options = ["Мужской", "Женский"];

    const handleSelect = (option) => {
        onValueChange(option);
        setModalVisible(false);
        setGenderValid(true)
    };

    return (
        <View style={{ width: '100%' }}>
            <Pressable onPress={() => setModalVisible(true)} style={styles.input}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ paddingTop: 16, fontSize: 16, color: value ? '#000' : '#7E7E9A' }}>{value || "Пол"}</Text>
                    <ChevronDown size={20} color="#a1a1aa" style={{ paddingTop: 15 }} />
                </View>
            </Pressable>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        {options.map((option, index) => (
                            <Pressable key={index} style={styles.option} onPress={() => handleSelect(option)}>
                                <Text style={{ fontSize: 18 }}>{option}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
            <View
                style={{
                    minHeight: 20,
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >{customError}</Text>
            </View>
        </View>
    );
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    option: {
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});