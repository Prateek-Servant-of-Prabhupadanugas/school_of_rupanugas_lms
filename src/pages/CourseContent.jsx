import { useState, useEffect } from "react";
import { databases, Query } from "../lib/appwrite";
import { Play, Lock, ChevronRight, BookOpen, Sparkles } from "lucide-react";

export default function CourseContent({ courseId, userId }) {
    const [hasAccess, setHasAccess] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLessonIdx, setActiveLessonIdx] = useState(0);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const enroll = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, "enrollments", [
                    Query.equal("courseId", courseId),
                    Query.equal("userId", userId),
                    Query.equal("status", "Verified")
                ]);
                
                if (enroll.total > 0) {
                    setHasAccess(true);
                    const les = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, "lessons", [
                        Query.equal("courseId", courseId),
                        Query.orderAsc("order") // Ensure lessons are in order
                    ]);
                    setLessons(les.documents);
                }
            } catch (err) {
                console.error("Access check failed", err);
            } finally {
                setLoading(false);
            }
        };
        checkAccess();
    }, [courseId, userId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
    );

    if (!hasAccess) return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-12 rounded-[40px] text-center max-w-lg shadow-2xl">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-red-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 italic font-serif">Gate Restricted</h2>
                <p className="text-white/70 leading-relaxed font-medium">
                    The sacred knowledge within is reserved for verified seekers. 
                    Wait for the blessing of the Royal Admin.
                </p>
                <button 
                    onClick={() => window.history.back()}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 font-bold tracking-widest text-xs uppercase"
                >
                    Return to Library
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* LEFT: Lesson Navigation Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-6 sticky top-32">
                            <h3 className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Curriculum
                            </h3>
                            <div className="space-y-3">
                                {lessons.map((lesson, idx) => (
                                    <button
                                        key={lesson.$id}
                                        onClick={() => setActiveLessonIdx(idx)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                                            activeLessonIdx === idx 
                                            ? "bg-emerald-500/20 border-emerald-400/50 text-white" 
                                            : "bg-white/5 border-transparent text-white/40 hover:bg-white/10"
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                            activeLessonIdx === idx ? "bg-emerald-500 text-emerald-950" : "bg-white/10"
                                        }`}>
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-sm text-left line-clamp-1">{lesson.title}</span>
                                        {activeLessonIdx === idx && <ChevronRight className="ml-auto w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Video Player & Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {lessons.length > 0 ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="mb-8">
                                    <h2 className="text-4xl font-black text-white italic font-serif mb-2 tracking-tight">
                                        {lessons[activeLessonIdx].title}
                                    </h2>
                                    <p className="text-emerald-400/80 font-bold text-xs uppercase tracking-widest">
                                        Lesson {activeLessonIdx + 1} of {lessons.length}
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    {lessons[activeLessonIdx].youtubeIds.map((vidId, vIdx) => (
                                        <div key={vidId} className="group relative">
                                            {/* Glow effect behind video */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                                            
                                            <div className="relative bg-white/5 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-white/20 shadow-2xl">
                                                <div className="aspect-video w-full">
                                                    <iframe 
                                                        src={`https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1&autoplay=0`} 
                                                        className="w-full h-full" 
                                                        allowFullScreen 
                                                        title={`${lessons[activeLessonIdx].title} - Part ${vIdx + 1}`}
                                                    />
                                                </div>
                                                
                                                <div className="px-8 py-5 bg-white/5 flex justify-between items-center border-t border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">
                                                            {lessons[activeLessonIdx].youtubeIds.length > 1 ? `Part ${vIdx + 1}` : "Full Session"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-emerald-400/50">
                                                        <Play className="w-3 h-3" />
                                                        <span className="text-[10px] font-bold italic uppercase tracking-tighter">Verified Content</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-40 bg-white/5 rounded-[40px] border border-dashed border-white/10 backdrop-blur-sm">
                                <p className="text-white/30 font-bold italic tracking-widest text-lg">Knowledge is being prepared.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}