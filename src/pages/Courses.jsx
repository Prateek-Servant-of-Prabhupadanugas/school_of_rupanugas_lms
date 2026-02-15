import { useState, useEffect } from "react";
import { databases, Query } from "../lib/appwrite"; // Using the centralized import
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { Search, Filter, BookOpen, Sparkles, Compass } from "lucide-react";

export default function Courses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch all courses
                const courseRes = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID, 
                    'courses' 
                );
                setCourses(courseRes.documents);

                // Fetch user enrollments if logged in
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
                setError("The archives are temporarily unreachable. Please try again soon.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const filteredCourses = courses.filter(course => {
        const title = course.title?.toLowerCase() || "";
        const desc = course.description?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        
        const matchesSearch = title.includes(search) || desc.includes(search);
        const matchesCategory = filterCategory === "all" || course.category === filterCategory;
        
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...new Set(courses.map(c => c.category).filter(Boolean))];

    return (
        <section className="min-h-screen py-32 px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[0.5em]">
                        <Compass className="w-4 h-4 animate-spin-slow" /> Path of the Seekers
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white italic font-serif tracking-tighter">
                        Sacred <span className="text-emerald-400">Archives</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl mx-auto font-medium leading-relaxed italic">
                        "The vessel of wisdom is filled one drop at a time." <br/>
                        Explore the curated teachings of the Rupanuga line.
                    </p>
                </div>

                {/* Interactive Search & Filter */}
                <div className="max-w-4xl mx-auto mb-20 space-y-8">
                    <div className="relative group">
                        {/* Input Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-[30px] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
                        
                        <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 pr-4 focus-within:border-emerald-500/50 transition-all">
                            <div className="pl-6 pr-4">
                                <Search className="text-emerald-400 w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by title or teaching..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent py-4 text-white placeholder:text-white/20 focus:outline-none font-medium text-lg"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="text-white/20 hover:text-white transition-colors">
                                    <Sparkles className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Pills */}
                    {categories.length > 1 && (
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setFilterCategory(category)}
                                    className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border ${
                                        filterCategory === category
                                            ? "bg-emerald-500 text-emerald-950 border-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.3)] scale-105"
                                            : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:bg-white/10"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Course Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="mt-6 text-white/20 font-black text-xs uppercase tracking-[0.4em]">Unrolling Scrolls...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/5 border border-red-500/20 rounded-[40px] p-16 text-center max-w-2xl mx-auto backdrop-blur-3xl">
                        <div className="text-4xl mb-4 text-red-500/50">⚠️</div>
                        <p className="text-white font-serif italic text-xl">{error}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => {
                                const isEnrolled = enrollments.some(e => e.courseId === course.$id);
                                return (
                                    <div key={course.$id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                        <CourseCard 
                                            course={course} 
                                            enrolled={isEnrolled}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-32 bg-white/5 rounded-[50px] border border-dashed border-white/10">
                                <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-6" />
                                <h3 className="text-white/60 text-2xl font-serif italic">No teachings match your search.</h3>
                                <button 
                                    onClick={() => {setSearchTerm(""); setFilterCategory("all")}}
                                    className="mt-6 text-emerald-400 font-bold text-xs uppercase tracking-widest hover:text-emerald-300"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}