import axiosLib from 'axios';
import { getToken } from './services/TokenService';
import { Platform } from "react-native";

//  const baseURL = Platform.OS === 'web' ? "http://localhost:8000/api/" : "http://10.0.2.2:8000/api/"
const baseURL = 'https://filhub.unifil.tech/api';

const axiosUpload = axiosLib.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});

axiosUpload.interceptors.request.use(async (req) => {
    const token = await getToken();
    if (token !== null) {
        req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
});

export default axiosUpload;
