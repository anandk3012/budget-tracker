import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.API_URL || 'https://budget-tracker-gmw2.onrender.com/'
})

// Transactions
export const getTransactions = async () => {
    try {
        const response = await API.get(`/transactions`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};


export const addTransaction = async (transaction) => {
    try {
        const response = await API.post(`/transactions`, transaction);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

// Users
export const addUser = async (userData) => {
    try {
        const response = await API.post(`/register`, userData);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await API.post(`/login`, { email, password });
        // Update context with user data
        console.log('User logged in successfully:', response.data);
        return response;
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
}

export const getUser = async (userId) => {
    try {
        const response = await API.post(`/users/${userId}`, userId);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getUserTransactions = async (userId) => {
    console.log(userId)
    try {
        const response = await API.get(`/transactions/${userId}`);
        return response.data;
    } catch (error) {   
        console.log(error);
    }
}