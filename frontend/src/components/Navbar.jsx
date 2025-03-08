import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-cyberBlack p-4 shadow-lg flex justify-between items-center">
            <h1 className="text-neonBlue text-2xl font-bold">Podcast Generator</h1>
            <div className="flex space-x-4">
                <Link to="/" className="text-neonPurple hover:text-neonPink">Home</Link>
                <Link to="/login" className="text-neonPurple hover:text-neonPink">Login</Link>
                <Link to="/register" className="text-neonPurple hover:text-neonPink">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;