import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
    return (
        <nav className="cyberpunk-navbar">
            <h1 >Podcast Generator</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/login" className="pink-hover">Login</Link>
                <Link to="/register" className="green-hover">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;