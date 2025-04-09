const express = require("express");
const { generateScript, generateAudio } = require("../controllers/scriptController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateScript);
router.post("/audio", authMiddleware, generateAudio);

module.exports = router; 
