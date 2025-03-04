import React, { createContext, useState, useEffect } from "react";
import axios from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser({ token });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            return true;
        } catch (error) {
            console.error("Login error", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};