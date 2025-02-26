import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name || "Guest"}</p>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;