import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h1>Podcast Generator</h1>
            <div>
                <Link>Home</Link>
                <Link>Login</Link>
                <Link>Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;