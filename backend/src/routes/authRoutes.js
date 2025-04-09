const express = require("express");
const { register, login } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validators");
const handleValidation = require("../middleware/handleValidation");

const router = express.Router();

router.post("/register", validateRegister, handleValidation, register);
router.post("/login",  validateLogin, handleValidation, login);

module.exports = router;