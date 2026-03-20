import { Text, View, Pressable } from 'react-native'

export default function Basket_page({navigation}) {
    return (
        <View>
            <Text>Basket</Text>
            <Pressable
                onPress = {() => {
                    navigation.navigate("Main")
                }}
            >
                <Text>Go to main</Text>
            </Pressable>
        </View>
    )
}