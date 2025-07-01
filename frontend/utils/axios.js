import axiosLib from "axios";
import { getToken } from "./services/TokenService";
import { Platform } from "react-native";

const baseURL = 'https://filhub.unifil.tech/api';
//  const baseURL = Platform.OS === 'web' ? "http://localhost:8000/api/" : "http://10.0.2.2:8000/api/"
 
const axios = axiosLib.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json"
    }
});

axios.interceptors.request.use(async (req) => {
    const token = await getToken();
    if (token !== null) {
        req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
});

export default axios;
