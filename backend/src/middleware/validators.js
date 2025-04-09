const { body } = require("express-validator");

exports.validateRegister = [
    body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email.")
    .normalizeEmail(),

    body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 10 characters.")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/).withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character.")
];

exports.validateLogin = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please enter a vaild email.")
    .normalizeEmail(),

    body("password")
    .notEmpty(),withMessage("Password is required."),
];