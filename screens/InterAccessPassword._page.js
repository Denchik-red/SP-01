import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Text, Pressable } from "react-native"
import mainStyles from "../styles/mainStyle.js"
import { useState } from "react"


export default function InterAccessPassword_page() {

    const insertPasswordCount = 0
    const [code, setCode] = useState(["", "", "", ""])

    return (
        <SafeAreaView>
            <ScrollView>
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
                    {code.map((item, index) => {
                        return (
                            <View
                             key={`input-${index}`}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: item == "" ? "#F2F2F2" : "#1A6FEE",
                                    borderRadius: 10,
                                    borderColor: "#1A6FEE",
                                    borderWidth: 1,
                                }}
                            ></View>
                        )
                    })}
                </View>
                <View>
                    {
                        [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["", 0, "<"]].map((row, rowIndex) => {
                            return (
                                <View key={`inputRow-${rowIndex}`} style={{flexDirection:"row"}}>
                                    {
                                        row.map((button, buttonIndex) => {
                                            return (
                                                <Pressable
                                                    key={`InputButton-${rowIndex}-${buttonIndex}`}
                                                    onPress={() => { }}
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        margin: 5,
                                                        backgroundColor: '#fff',
                                                        borderRadius: 30,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        shadowColor: "#000",
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: 0.25,
                                                        shadowRadius: 3.84,
                                                        elevation: 5,
                                                    }}
                                                >
                                                    <Text>
                                                        {button}
                                                    </Text>
                                                </Pressable>
                                            )
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