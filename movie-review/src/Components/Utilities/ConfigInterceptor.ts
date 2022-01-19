import axios from "axios"
import { getKeyToken } from "../Security/handleJwt";

export const ConfigInterceptor = () => {
    axios.interceptors.request.use(
        function (config) {
            const token = getKeyToken();
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    )
}