import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
// Use named import { Navbar } if Navbar.jsx uses 'export const Navbar'
import { Navbar } from "./components/Navbar"; 

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Contact from "./components/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Scene3D from "./components/Scene3d";
import ForegroundTrees from "./components/ForegroundTrees";
// Admin & Content Pages
import AdminPortal from "./pages/AdminPortal";
import AdminVerify from "./pages/AdminVerify";
import LessonDetail from "./pages/LessonDetail";
import VideoPlayer from "./pages/VideoPlayer";

function AppRoutes() {
    const { user, loading } = useAuth();

    // While checking if the user is logged in, show a loading spinner
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    // Define Admin Access
    const adminEmails = ["schoolofrupanugas@gmail.com", "mam@gmail.com"]; 
    const isAdmin = user && adminEmails.includes(user.email);

    return (
        <>
            <Navbar />
            {/* Added some padding-top so content doesn't hide behind a sticky navbar */}
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Student Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        {/* Page to view course info and upload payment screenshot */}
                        <Route path="/course/:id" element={<CourseDetail />} />
                        
                        {/* List of lessons for a course */}
                        <Route path="/watch/:courseId" element={<LessonDetail />} />

                        {/* Dedicated video player page */}
                        <Route path="/video/:courseId/:lessonId/:videoIndex" element={<VideoPlayer />} />
                    </Route>

                    {/* Admin Routes - Locked by Email check */}
                    <Route 
                        path="/admin" 
                        element={isAdmin ? <AdminPortal /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/admin/verify" 
                        element={isAdmin ? <AdminVerify /> : <Navigate to="/" />} 
                    />

                    {/* Catch-all: Redirect unknown URLs to Home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <Scene3D />
                <ForegroundTrees />
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;