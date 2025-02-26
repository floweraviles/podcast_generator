import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Podcast Generator</h1>
            <p>Create AI-generated podcasts effortlessly.</p>

            <div>
                <Link to="/register">Get Started</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Home;