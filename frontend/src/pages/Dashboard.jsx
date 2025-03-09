import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-card">
                <h1 className="cyberpunk-heading-blue">Dashboard</h1>
                    <p className="cyberpunk-text">Welcome, <span className="font-semibold text-neonPink"> {user?.name || "Guest"}</span></p>
                        <div className="flex justify-center">
                            <button className="cyberpunk-button-purple" onClick={handleLogout}>Logout</button>
                        </div>
            </div>
        </div>
    );
};

export default Dashboard;