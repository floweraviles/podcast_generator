import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="cyberpunk-bg">
            <div className="cyberpunk-card-home">
                <h1>Podcast Generator</h1>
                <p>Create AI-generated podcasts effortlessly.</p>

                <div>
                    <Link className="res-button" to="/register">Get Started</Link>
                    <Link className="log-button" to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;