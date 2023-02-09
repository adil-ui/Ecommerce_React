import axios from "axios";
import { API_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'true'
    }
})

export default axiosInstance;