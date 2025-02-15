const express = require("express");
const { createPodcast, getPodcasts, deletePodcast } = require("../controllers/podcastController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPodcast);
router.get("/", authMiddleware, getPodcasts);
router.delete("/:id", authMiddleware, deletePodcast);

module.exports = router;