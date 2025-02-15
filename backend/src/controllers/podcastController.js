const { Podcast } = require("../models");

exports.createPodcast = async (req, res) => {
    try {
        const { title, script, audioURL } = req.body;
        const podcast = await Podcast.create({ title, script, audioURL, userId: req.user.id });
        res.status(201).json(podcast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.findAll({ where: { userId: req.user.id } });
        res.json(podcasts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePodcast = async (req,res) => {
    try {
        await Podcast.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.json({ message: "podcast deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}