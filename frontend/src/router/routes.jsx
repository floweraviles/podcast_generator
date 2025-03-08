import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Route for Dashboard */}
                <Route 
                    path="/dashboard"
                    element={
                        <ProtectedRoute user={user}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-All Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;