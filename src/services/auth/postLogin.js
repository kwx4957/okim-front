import {authApi} from "@/api";

export const login = async (email, password) => {
    try {
        const response = await authApi.post('/api/v1/authenticate', { email, password });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};