const axios = require("axios");
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require("path");

const client = new textToSpeech.TextToSpeechClient();

exports.generateScript = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(apiURL, {
            contents: [ // Use "contents" array as top-level
                {
                    parts: [ // Use "parts" array inside contents
                        { text: prompt } // Use "text" to provide the prompt
                    ]
                }
            ]
        });

        const generatedScript = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "no script generated.";
        res.json({ script: generatedScript })
    } catch (error) {
        console.error("Error generating script:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate script." });
    }
};

exports.generateAudio = async (req, res) => {
    try {
        const { script } = req.body;
        if (!script) {
            return res.status(400).json({ error: "Script text is required." });
        }

        console.log("Generating audio for:", script);

        const request = {
            input: { text: script },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        const [response] = await client.synthesizeSpeech(request);

        
        const audioDir = path.join(__dirname, "../public/audio");
        if (!fs.existsSync(audioDir)) {
            fs.mkdirSync(audioDir, { recursive: true }); 
        }

        const audioFileName = `podcast-${Date.now()}.mp3`;
        const audioPath = path.join(audioDir, audioFileName);

        const writeFile = util.promisify(fs.writeFile);
        await writeFile(audioPath, response.audioContent, "binary");

        console.log("Audio file saved:", audioPath);

        res.status(200).json({ audioURL: `/audio/${audioFileName}` });
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    }
};