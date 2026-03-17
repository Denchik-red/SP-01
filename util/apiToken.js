import { Platform } from 'react-native';
import Cookies from 'js-cookie';
import * as SecureStore from 'expo-secure-store';


export async function saveToken(token) {
    try {
        if (Platform.OS === "web") {
            Cookies.set("token", token)
            console.log("Token saved securely!");
            console.log(Cookies.get("token"))
        } else {
            if (Platform.OS === "android") {
                await SecureStore.setItemAsync("token", token);
                console.log("Token saved securely!");
                console.log(await SecureStore.getItemAsync("token"))
            }
        }
    } catch (e) {
        console.error("Error saving token:", e);
    }


}

export async function getToken() {
    try {
        if (Platform.OS === "web") {
            const token = Cookies.get("token");
            if (token) {
                console.log("Token found in cookies:", token);
                return token;
            } else {
                console.log("No token found in cookies.");
                return null;
            }
        } else {
            if (Platform.OS === "android") {
                const token = await SecureStore.getItemAsync("token");
                if (token) {
                    console.log("Token found in SecureStore:", token);
                    return token;
                } else {
                    console.log("No token found in SecureStore.");
                    return null;
                }
            }
        }
    } catch (e) {
        console.error("Error getting token:", e);
        return null;
    }
   
}