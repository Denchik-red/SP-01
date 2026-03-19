import { Platform } from 'react-native';
import Cookies from 'js-cookie';
import * as SecureStore from 'expo-secure-store';


export async function saveItem(key, value) {
    try {
        if (Platform.OS === "web") {
            Cookies.set(key, value)
            console.log("Item saved securely!");
            console.log(Cookies.get(key))
        } else {
            if (Platform.OS === "android") {
                await SecureStore.setItemAsync(key, value);
                console.log("Item saved securely!");
                console.log(await SecureStore.getItemAsync(key))
            }
        }
    } catch (e) {
        console.error("Error saving token:", e);
    }


}

export async function getItem(key) {
    try {
        if (Platform.OS === "web") {
            const value = Cookies.get(key);
            if (value) {
                console.log(`${key} found in cookies: `, value);
                return value;
            } else {
                console.log(`No ${key} found in cookies.`);
                return null;
            }
        } else {
            if (Platform.OS === "android") {
                const value = await SecureStore.getItemAsync(key);
                if (value) {
                    console.log(`${key} found in SecureStore:`, value);
                    return value;
                } else {
                    console.log(`No ${key} found in SecureStore.`);
                    return null;
                }
            }
        }
    } catch (e) {
        console.error("Error getting token:", e);
        return null;
    }
   
}