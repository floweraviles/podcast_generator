import React, { useState } from "react";
import axios from "../services/api";

const GenerateScript = () => {
    const [prompt, setPrompt] = useState("");
    const [script, setScript] = useState("");

    const generateScript = async () => {
        try {
            const response = await axios.post ("/scripts/generate", { prompt });
            setScript(response,data,script);
        } catch (error) {
            console.error("Error generating script:", error);
        }
    };
    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-card-gs">
                <h2>Generate Podcast Script</h2>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a topic..." />
                <button onClick={generateScript}>Generate</button>
                <div>
                    <h3>Gnerated Script:</h3>
                    <p>{script}</p>
                </div>
            </div>

        </div>        
    );
};

export default GenerateScript;
