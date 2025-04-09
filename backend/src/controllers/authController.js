const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const isStrongPassword = (password) => {
    return (
        password.length >= 10 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required."});
        }
        const emailRegex = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return  res.status(400).json({ error: "Invalid email format."});
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({
                error: "Password must be at 10 characters long and include uppercase, lowercase, number, and special character.",
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};