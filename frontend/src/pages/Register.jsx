import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.taget.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Registration failed");

            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-card-register">
                <h2>Create an Account</h2>
                {error && <p>{error}</p>}

                 <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button>Register</button>
                </form>
            </div>
        </div>
    );

};

export default Register;
