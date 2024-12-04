    import axios from "axios";
    import { useLogout } from "../hooks/useLogout.js";

    const getAuthToken = () => {
        const storedData = localStorage.getItem('token');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return parsedData.token;
        }
        return null; 
    };

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5189/api', 
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,  // Send only the token in the Authorization header
        },
    });

    axiosInstance.interceptors.response.use(
        (response) => response,  // Simply return the response if it's successful
        (error) => {
            console.log(error.response);
            
            if (error.response && error.response.status === 401) {
                const { logout } = useLogout();
                logout();
            }
            return Promise.reject(error);  // Return the error for further handling
        }
    );

    export const getAllPlayers = async () => {
        const response = await axiosInstance.get('/players');
        return response.data;
    };

    export const getPlayerById = async (id) => {
        const response = await axiosInstance.get(`/player/${id}`);    
        return response.data;
    };

    export const updatePlayer = async (id, playerData) => {
        const response = await axiosInstance.put(`/player/${id}`, playerData);
        return response.data;
    };

    export const updatePlayerStats = async (id, statsData) => {
        const response = await axiosInstance.put(`/player/stats/${id}`, statsData);
        return response.data;
    };
