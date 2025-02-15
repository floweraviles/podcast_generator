const express = require("express");
const { generateScript } = require("../controllers/scriptController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateScript);

module.exports = router; 
