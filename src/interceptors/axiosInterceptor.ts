import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants/app.constant.ts";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
});

const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) return null;

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
            refreshToken,
        });
        return response.data;
    } catch (err) {
        return null;
    }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const result = await refreshToken();
            if (result?.accessToken && result?.refreshToken) {

                localStorage.setItem(ACCESS_TOKEN, result.accessToken);
                localStorage.setItem(REFRESH_TOKEN, result.refreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${result.accessToken}`;
                axios.defaults.headers.common["Authorization"] = `Bearer ${result.accessToken}`;

                return axiosInstance(originalRequest);
            } else {

                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;




