import { useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import { Query } from "appwrite";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Home() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch All Courses
                const courseRes = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID, 
                    'courses' 
                );
                setCourses(courseRes.documents);

                // 2. Fetch Enrollments ONLY if user is logged in
                if (user) {
                    const enrollRes = await databases.listDocuments(
                        import.meta.env.VITE_DATABASE_ID,
                        'enrollments',
                        [Query.equal("userId", user.$id)]
                    );
                    setEnrollments(enrollRes.documents);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("The sacred archives are temporarily unreachable.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    return (
        <div className="min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden">
                {/* Decorative background glow for Hero */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/10 blur-[120px] rounded-full -z-10"></div>
                
                <div className="container mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                            Ascend Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 italic font-serif">
                                Intellect
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            Access a curated collection of premium wisdom. 
                            Built for those who seek knowledge beyond the ordinary.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a 
                            href="#course-list" 
                            className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                        >
                            Explore Courses
                        </a>
                        <div className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white/80 text-sm font-bold">
                            ✨ {courses.length}+ Modules Available
                        </div>
                    </div>
                </div>
            </section>

            {/* --- COURSES SECTION --- */}
            <section id="course-list" className="py-24 container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <p className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">The Curriculum</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {user ? "Continue Your Journey" : "Sacred Archives"}
                        </h2>
                    </div>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent mb-3 hidden md:block ml-8"></div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs animate-pulse">Consulting the Oracle...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-md mx-auto bg-red-500/10 backdrop-blur-xl border border-red-500/20 p-8 rounded-[32px] text-center shadow-2xl">
                        <span className="text-4xl mb-4 block">⚠️</span>
                        <p className="text-red-200 font-bold">{error}</p>
                    </div>
                )}

                {/* Grid Content */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <CourseCard 
                                    key={course.$id} 
                                    course={course} 
                                    enrollments={enrollments} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                                <p className="text-white/30 italic text-lg">The archives are currently empty.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- FOOTER DECORATION --- */}
            <div className="py-20 text-center">
                <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8"></div>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
                    School of Rupanugas • Divine Education
                </p>
            </div>
        </div>
    );
}