import React from "react";
import { FaPlay, FaTrash } from "react-icons/fa";
import "../styles/global.css";

const PodcastCard = ({ podcast, onPlay, onDelete }) => {
    return (
        <div className="cyberpunk-card">
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            
            <div>
                <button className="cyberpunk-button-blue" onClick={() => onPlay(podcast.audioURL)}>
                    <FaPlay className="inline-block mr-2" /> <span>Play</span>
                </button>

                <button className="cyberpunk-button-purple" onClick={() => onDelete(podcast.id)}>
                    <FaTrash className="inline-block mr-2" /> <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default PodcastCard;