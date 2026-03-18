import { Pressable, Text, View, Platform} from 'react-native'

export default function CircleButton({ button, buttonIndex, rowIndex, setCode }) {
    if (button === "") {
        return (
            <View
                style={{
                    aspectRatio: 1,
                    flex: 1,
                    margin: 5,
                }}
            >
            </View>
        )
    }
    return (
        <Pressable
            key={`InputButton-${rowIndex}-${buttonIndex}`}
            onPress={() => {

                if (button === "<") {
                    setCode((prevCode) => prevCode.slice(0, -1));
                } else if (button !== "") {
                    setCode((prevCode) => {
                        if (prevCode.length < 4) {
                            return [...prevCode, button];
                        } else {
                            return prevCode;
                        }
                    });
                }
            }}
            style={({ pressed }) => [
                {
                    aspectRatio: 1,
                    flex: 1,
                    margin: 5,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                pressed && { opacity: 0.8, backgroundColor: '#007BFF' },
                Platform.OS === "web" && { width: 80, height: 80 }
            ]}
        >
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                }}
            >
                {button}
            </Text>
        </Pressable>
    )
}