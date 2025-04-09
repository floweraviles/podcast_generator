import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../styles/global.css";

const GenerateScript = () => {
    const [prompt, setPrompt] = useState(""); 
    const [script, setScript] = useState(""); 
    const [customText, setCustomText] = useState(""); 
    const [audioURL, setAudioURL] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 

    const navigate = useNavigate(); 

    
    const generateScript = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt to generate a script.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in.");
            return;

        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/scripts/generate`,
                { prompt },
                { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Generated Script Response:", response.data);

            if (response.data.script) {
                setScript(response.data.script);
            } else {
                setError("Failed to generate script.");
            }
        } catch (error) {
            console.error("Error generating script:", error);
            setError("An error occurred while generating the script.");
        } finally {
            setLoading(false);
        }
    };


    const generateAudio = async (useCustomText = false) => {
        const textToConvert = useCustomText ? customText.trim() : script.trim();

        if (!textToConvert) {
            setError("No text available for audio generation.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("user not authenicated. please log in.");
            return;
        }

    
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/scripts/audio`, 
                { script: textToConvert },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            console.log("Audio response:", response.data);

            if (response.data.audioURL) {
                const audioFullURL = `${import.meta.env.VITE_API_BASE_URL}${response.data.audioURL}`;
                console.log("Constructed Audio URL:", audioFullURL);
                setAudioURL(audioFullURL);
            } else {
                setError("Failed to generate audio.");
            }
        } catch (error) {
            console.error("Error generating audio:", error);
            setError("An error occurred while generating the audio.");
        } finally {
            setLoading(false);
        }
    };

    
    const handleSavePodcast = async () => {
        if (!title.trim() || !audioURL.trim()) {
            setError("All fields (Title and Audio) are required to save a podcast.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to save a podcast.");
            return;
        }

        
        setError("");
        const podcastData = { title, script: script || customText, audioURL };
        console.log("Sending podcast data:", podcastData);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/podcast`,
                podcastData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Podcast saved successfully:", response.data);

            
            navigate("/dashboard"); 
        } catch (error) {
            console.error("Failed to save podcast:", error);
            setError("Failed to save podcast.");
        }
    };

    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-container">
            <h2>Generate Podcast Script & Audio</h2>

            {error && <p className="error-message">{error}</p>}

            {/* User enters prompt for AI-generated script */}
            <textarea className="prompt-box"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt to generate a podcast script..."
            />
            <button className="generate-script-button" onClick={generateScript} disabled={loading}>
                {loading ? "Generating Script..." : "Generate Script"}
            </button>

            {/* Display AI-generated script */}
            {script && (
                <div className="script-display">
                    <h3>Generated Script</h3>
                    <p>{script}</p>
                </div>
            )}

            {/* Custom text box for user-entered script */}
            <textarea className="custom-text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Or enter your own text to convert into audio..."
            />

            {/* Buttons to generate audio from AI script or custom text */}
            {script && (
                <button className="generate-audio" onClick={() => generateAudio(false)} disabled={loading}>
                    {loading ? "Generating Audio..." : "Generate Audio from AI Script"}
                </button>
            )}
            {customText && (
                <button className="generate-audio" onClick={() => generateAudio(true)} disabled={loading}>
                    {loading ? "Generating Audio..." : "Generate Audio from Custom Text"}
                </button>
            )}

            {/* Display audio player if audio is generated */}
            {audioURL && (
                <div className="audio-container">
                    <h3>Generated Audio</h3>
                    <audio controls>
                        <source src={audioURL} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            {/* Input field for title and save podcast button */}
            {audioURL && (
                <>
                    <input
                        type="text"
                        placeholder="Enter podcast title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={handleSavePodcast}>
                        Save Podcast
                    </button>
                </>
            )}

            </div>
        </div>
    );
};

export default GenerateScript;

