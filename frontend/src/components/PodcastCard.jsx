import { FaPlay, FaTrash } from "react-icons/fa";

const PodcastCard = ({ podcast, onPlay, onDelete }) => {
    return (
        <div>
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>

            <div>
                <button onClick={() => onPlay(podcast.audioURL)}>
                    <FaPlay /> <span>Play</span>
                </button>

                <button onClick={() => onDelete(podcast.id)}>
                    <FaTrash /> <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default PodcastCard;