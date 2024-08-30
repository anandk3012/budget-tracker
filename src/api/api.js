import axios from 'axios'
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';

// Transactions
export const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};


export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${API_URL}/transactions`, transaction);
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
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        // Update context with user data
        console.log('User logged in successfully:', response.data);
        return response;
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
}

export const getUser = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}`, userId);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getUserTransactions = async (userId) => {
    console.log(userId)
    try {
        const response = await axios.get(`${API_URL}/transactions/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}