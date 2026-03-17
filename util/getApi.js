import axios from 'axios'
import * as apiToken from '../util/apiToken.js';
// import { useNavigation } from '@react-navigation/native';


// const navigation = useNavigation();

const api = axios.create({
    baseURL: "http://2.nntc.nnov.ru:8900/api/",
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    async (config) => {
        const token = await apiToken.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            // navigation.navigate("Login")
        } else {
            return Promise.reject(error);
        }
    }
)
export default api