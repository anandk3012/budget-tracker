import { createContext, useState, useContext, useEffect } from 'react'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('user')? true:false;
    });
    const [user, setUser] = useState(null);

    const login = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        localStorage.setItem('login',true);
        localStorage.setItem('user',JSON.stringify(user));
    }
    
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('login',false);
        localStorage.removeItem('user');
        setUser(null);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser((storedUser));
        }
    },[]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

