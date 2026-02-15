import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // IMPORTANT: Wait for loading to finish before redirecting
    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;