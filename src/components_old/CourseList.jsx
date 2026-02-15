import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../lib/appwrite";
import { Query } from "appwrite";
import { useAuth } from "../context/AuthContext";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                // Fetch Courses
                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID, 
                    'courses'
                );
                setCourses(res.documents);

                // Fetch User Enrollments for status badges
                if (user) {
                    const enrollRes = await databases.listDocuments(
                        import.meta.env.VITE_DATABASE_ID,
                        'enrollments',
                        [Query.equal("userId", user.$id)]
                    );
                    setEnrollments(enrollRes.documents);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [user]);

    return (
        <div className="container mx-auto px-6 py-24">
            {/* Header Section with 3D Text Shadow */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                    Sacred <span className="text-amber-400">Knowledge</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4"></div>
            </div>

            {/* The Grid - Responsive: 1 col on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map(course => {
                    const status = enrollments.find(e => e.courseId === course.$id)?.status;
                    const isVerified = status === "Verified";
                    const isPending = status === "Pending";

                    return (
                        <div 
                            key={course.$id} 
                            className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/30 to-transparent hover:from-amber-400/50 transition-all duration-500 shadow-2xl"
                        >
                            {/* Inner Glass Card */}
                            <div className="relative bg-white/10 backdrop-blur-2xl rounded-[31px] p-6 h-full border border-white/20 flex flex-col overflow-hidden">
                                
                                {/* Image Wrapper with floating effect */}
                                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video border border-white/10 shadow-2xl">
                                    <img 
                                        src={course.thumbnailUrl || "https://via.placeholder.com/400x225"} 
                                        alt={course.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Glass Badges */}
                                    {isVerified && (
                                        <span className="absolute top-3 right-3 bg-emerald-500/80 backdrop-blur-md text-[10px] font-black text-white px-3 py-1 rounded-full border border-emerald-400/50 uppercase tracking-tighter">
                                            Premium Access
                                        </span>
                                    )}
                                    {isPending && (
                                        <span className="absolute top-3 right-3 bg-amber-500/80 backdrop-blur-md text-[10px] font-black text-white px-3 py-1 rounded-full border border-amber-400/50 uppercase animate-pulse">
                                            Pending Sir's Approval
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors">
                                    {course.title}
                                </h3>
                                
                                <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-2">
                                    {course.description || "Divine teachings waiting for your presence."}
                                </p>

                                {/* Price and Action Section */}
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-black text-amber-500/70 tracking-[0.2em]">Exchange</span>
                                        <span className="text-2xl font-black text-white">₹{course.price}</span>
                                    </div>

                                    <button 
                                        onClick={() => navigate(isVerified ? `/watch/${course.$id}` : `/course/${course.$id}`)}
                                        className="relative overflow-hidden px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                                                   bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-amber-400/50 
                                                   shadow-[0_10px_20px_rgba(0,0,0,0.3)] active:scale-95 group-hover:shadow-amber-500/20"
                                    >
                                        <span className="relative z-10">
                                            {isVerified ? "Start Learning" : "View Details"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}