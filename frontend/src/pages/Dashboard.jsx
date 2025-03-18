import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PodcastCard from "../components/PodcastCard";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [podcasts, setPodcasts] = useState([]);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/podcasts`, {
                   headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                   },
                });

                if (!response.ok) 
                    throw new Error("Failed to fetch podcasts.");
                const data = await response.json();
                setPodcasts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcasts ();
    }, []);

    const handlePlay = (audioURL) => {
        if (playingAudio) {
            playingAudio.pause();
        }
        const audio = new Audio(audioURL);
        setPlayingAudio(audio);
        audio.play();
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/podcasts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete podcast.");
            setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-card-dash">
                <h2>Welcome to Your Dashboard</h2>

                {error && <p>{error}</p>}

                <div>
                    {podcasts.length > 0 ? (
                        podcasts.map((podcast) => (
                            <PodcastCard 
                            key={podcast.id} 
                            podcast={podcast}
                            onPlay={handlePlay}
                            onDelete={handleDelete}
                             />
                        ))
                    ) : (
                         <p>No podcasts found.</p>
                    )}
                </div>
                         <div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
            </div>
        </div>
    );
};

export default Dashboard;