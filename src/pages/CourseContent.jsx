import { useState, useEffect } from "react";
import { databases, Query } from "../lib/appwrite";

export default function CourseContent({ courseId, userId }) {
    const [hasAccess, setHasAccess] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        Query.equal("courseId", courseId)
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
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!hasAccess) return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white/5 backdrop-blur-3xl border border-red-500/30 p-12 rounded-[40px] text-center max-w-lg shadow-2xl">
                <span className="text-6xl mb-6 block">🔒</span>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Access Restricted</h2>
                <p className="text-white/60 italic leading-relaxed">
                    The sacred knowledge within is reserved for verified seekers. 
                    Please ensure your payment is completed and wait for the Royal Admin's blessing.
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
                
                {lessons.length > 0 ? (
                    lessons.map((lesson, idx) => (
                        <section key={lesson.$id} className="relative">
                            {/* Lesson Number & Title Badge */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-amber-500 text-slate-950 w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                                    {idx + 1}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
                                    {lesson.title}
                                </h2>
                            </div>

                            {/* Video Grid */}
                            <div className="grid grid-cols-1 gap-8">
                                {lesson.youtubeIds.map((vidId, vIdx) => (
                                    <div key={vidId} className="group relative p-[1px] rounded-[32px] bg-gradient-to-br from-white/20 via-transparent to-white/5 shadow-2xl">
                                        <div className="bg-black/40 backdrop-blur-3xl rounded-[31px] overflow-hidden border border-white/10">
                                            {/* Aspect Ratio Box for Video */}
                                            <div className="aspect-video w-full relative group">
                                                <iframe 
                                                    src={`https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1`} 
                                                    className="w-full h-full" 
                                                    allowFullScreen 
                                                    title={`${lesson.title} - Part ${vIdx + 1}`}
                                                />
                                            </div>
                                            
                                            {/* Sub-label for multiple videos in one lesson */}
                                            {lesson.youtubeIds.length > 1 && (
                                                <div className="px-6 py-3 bg-white/5 flex justify-between items-center">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                        Part {vIdx + 1} of {lesson.youtubeIds.length}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-amber-500/60 italic">Academy Exclusive Content</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-[40px] border border-dashed border-white/10 backdrop-blur-sm">
                        <p className="text-white/30 font-bold italic tracking-widest text-lg">Knowledge is being prepared. Check back soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}