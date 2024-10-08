import axios from "axios";
import {useStateContext} from "./contexts/ContextProvider.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error)

    try {
        const {response} = error;
        console.log(response)
        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    
    } catch (e) {
        console.error(e);
    }
    
    throw error;
})

export default axiosClient;