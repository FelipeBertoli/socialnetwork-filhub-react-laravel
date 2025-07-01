import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

let token = null;

export async function setToken(newToken) {
    try {
        if (Platform.OS === 'web') {
            localStorage.setItem("token", newToken);
        } else {
            token = newToken;
            await SecureStore.setItemAsync("token", String(token));
        }
    } catch (e) {
        console.log("Erro ao setar token:", e);
    }
}

export async function getToken() {
    try {
        if (Platform.OS === 'web') {
            return localStorage.getItem("token");
        } else {
            return await SecureStore.getItemAsync("token");
        }
    } catch (e) {
        console.log("Erro ao obter token:", e);
        return null;
    }
}
