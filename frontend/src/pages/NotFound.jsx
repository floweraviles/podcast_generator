import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Oops! The page you're looking for does not exist</p>

            <Link>
                Return Home
            </Link>
        </div>
    );
};

export default NotFound;