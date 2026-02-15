import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { databases, Query } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";

export default function LessonDetail() {
    const { courseId } = useParams();
    const { user } = useAuth();
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccessAndFetch = async () => {
            try {
                setLoading(true);
                const enrollment = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    "enrollments",
                    [
                        Query.equal("courseId", courseId),
                        Query.equal("userId", user.$id),
                        Query.equal("status", "Verified")
                    ]
                );

                if (enrollment.total > 0) {
                    setHasAccess(true);
                    const lessonData = await databases.listDocuments(
                        import.meta.env.VITE_DATABASE_ID,
                        "lessons",
                        [
                            Query.equal("courseId", courseId),
                            Query.orderAsc("order")
                        ]
                    );
                    setLessons(lessonData.documents);
                    setSelectedLesson(lessonData.documents[0]);
                }
            } catch (error) {
                console.error("Error loading lessons:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) checkAccessAndFetch();
    }, [courseId, user]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white/5 backdrop-blur-3xl border border-red-500/30 p-12 rounded-[40px] text-center max-w-lg shadow-2xl">
                    <span className="text-6xl mb-6 block">🔒</span>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Seal Intact</h2>
                    <p className="text-white/60 italic leading-relaxed mb-8">
                        This content is locked. Ensure your offering is verified by the Academy Admin.
                    </p>
                    <Link to="/" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-400 transition-all">
                        Return to Archives
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen pt-20">
            {/* --- SIDEBAR: LESSON NAVIGATION --- */}
            <aside className="w-full lg:w-96 lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 bg-white/5 backdrop-blur-2xl border-r border-white/10 overflow-y-auto">
                <div className="p-8 border-b border-white/10">
                    <h2 className="text-xs font-black text-amber-500 uppercase tracking-[0.3em]">Curriculum</h2>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Course Content</h3>
                </div>
                
                <nav className="p-4 space-y-3">
                    {lessons.map((lesson) => (
                        <button
                            key={lesson.$id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full text-left p-5 rounded-[20px] transition-all duration-300 group ${
                                selectedLesson?.$id === lesson.$id
                                    ? "bg-amber-500 text-slate-950 shadow-[0_10px_20px_rgba(245,158,11,0.2)] scale-[1.02]"
                                    : "hover:bg-white/10 text-white/70 hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-black px-2 py-1 rounded-md border ${
                                    selectedLesson?.$id === lesson.$id ? "border-slate-900/20 bg-slate-900/10" : "border-white/10 bg-white/5"
                                }`}>
                                    {lesson.order}
                                </span>
                                <span className="text-sm font-bold tracking-tight leading-tight">{lesson.title}</span>
                            </div>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- MAIN CONTENT: THE THEATER --- */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                {selectedLesson ? (
                    <div className="max-w-5xl mx-auto space-y-10">
                        <header className="space-y-2">
                            <span className="text-amber-500 font-black text-xs uppercase tracking-widest">Currently Viewing</span>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter drop-shadow-xl italic">
                                {selectedLesson.title}
                            </h1>
                        </header>
                        
                        <div className="space-y-12">
                            {selectedLesson.youtubeIds?.map((id, index) => (
                                <div key={index} className="group relative">
                                    {/* Glass Frame for Video */}
                                    <div className="relative p-[1px] rounded-[35px] bg-gradient-to-br from-white/30 via-transparent to-white/5 shadow-2xl overflow-hidden">
                                        <div className="bg-slate-950 rounded-[34px] overflow-hidden">
                                            <div className="relative pt-[56.25%] bg-black"> 
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white`}
                                                    title={`Video ${index + 1}`}
                                                    allowFullScreen
                                                />
                                            </div>
                                            {/* Video Metadata Bar */}
                                            <div className="bg-white/5 backdrop-blur-md p-4 px-8 flex justify-between items-center border-t border-white/10">
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                    Part {index + 1} of {selectedLesson.youtubeIds.length}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-bold text-white/60">HD Quality Access</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-bounce">
                            <span className="text-3xl">👈</span>
                        </div>
                        <p className="text-white/30 font-bold tracking-widest uppercase text-sm">Select a lesson to begin your ascent</p>
                    </div>
                )}
            </main>
        </div>
    );
}