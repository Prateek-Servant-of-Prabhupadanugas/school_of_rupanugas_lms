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
                const res = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID, 
                    'courses'
                );
                setCourses(res.documents);

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
        <div className="container mx-auto px-6 py-32 min-h-screen">
            {/* Header Section: Cleaned up the amber to a gold/white mix */}
            <div className="text-center mb-20 relative">
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.5em] mb-3">Path to Wisdom</p>
                <h2 className="text-5xl md:text-6xl font-black text-white italic font-serif drop-shadow-2xl">
                    Sacred <span className="text-emerald-300">Knowledge</span>
                </h2>
                <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto mt-6"></div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {courses.map(course => {
                        const enrollment = enrollments.find(e => e.courseId === course.$id);
                        const status = enrollment?.status;
                        const isVerified = status === "Verified";
                        const isPending = status === "Pending";

                        return (
                            <div 
                                key={course.$id} 
                                className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-transparent hover:from-emerald-400/40 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-emerald-500/20"
                            >
                                {/* Inner Glass Card: Pure white glass base */}
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-[31px] p-6 h-full border border-white/10 flex flex-col overflow-hidden transition-all duration-500 group-hover:bg-white/10">
                                    
                                    {/* Image Wrapper: Deeper shadows for 3D pop */}
                                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
                                        <img 
                                            src={course.thumbnailUrl || "https://placehold.co/600x400?text=Sacred+Teachings"} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                        
                                        {/* Dynamic Badges */}
                                        {isVerified && (
                                            <span className="absolute top-3 right-3 bg-emerald-500/40 backdrop-blur-xl text-[10px] font-black text-white px-3 py-1.5 rounded-full border border-emerald-300/30 uppercase tracking-widest shadow-2xl">
                                                Unlocked
                                            </span>
                                        )}
                                        {isPending && (
                                            <span className="absolute top-3 right-3 bg-white/10 backdrop-blur-xl text-[10px] font-black text-white px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-widest animate-pulse">
                                                Pending Approval
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors font-serif">
                                        {course.title}
                                    </h3>
                                    
                                    <p className="text-white/50 text-sm leading-relaxed mb-10 line-clamp-2 italic">
                                        {course.description || "Divine teachings waiting for your presence."}
                                    </p>

                                    {/* Footer Section: Clean Layout */}
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black text-emerald-400 tracking-[0.2em]">Investment</span>
                                            <span className="text-2xl font-black text-white font-serif">₹{course.price}</span>
                                        </div>

                                        <button 
                                            onClick={() => navigate(isVerified ? `/watch/${course.$id}` : `/course/${course.$id}`)}
                                            className="relative overflow-hidden px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all
                                                       bg-white/5 hover:bg-emerald-500 text-white hover:text-emerald-950 border border-white/20 hover:border-emerald-400
                                                       shadow-xl active:scale-95 group/btn"
                                        >
                                            <span className="relative z-10 transition-colors duration-300">
                                                {isVerified ? "Enter Class" : "Details"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}