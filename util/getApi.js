import axios from 'axios'
import * as apiItem from '../util/apiItem.js';

const api = axios.create({
    baseURL: "http://2.nntc.nnov.ru:8900/api/",
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    async (config) => {
        const token = await apiItem.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const userId = await apiItem.getItem('userId');
        if (userId) {
            config.params = { ...config.params, userId }   
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