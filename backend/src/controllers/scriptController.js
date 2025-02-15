const axios = require("axios");

exports.generateScript = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${apiKey}`;

        const response = await axios.post(apiURL, {
            prompt: { text: prompt },
        });

        const generatedScript = response.data.candidates?.[0]?.output || "no script generated.";
        res.json({ script: generatedScript })
    } catch (error) {
        console.error("Error generating script:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate script." });
    }
};
