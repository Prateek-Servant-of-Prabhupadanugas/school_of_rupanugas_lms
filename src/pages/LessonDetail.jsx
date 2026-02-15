import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { databases, Query } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";

export default function LessonDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState(null);
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

                    // Fetch course info
                    const courseData = await databases.getDocument(
                        import.meta.env.VITE_DATABASE_ID,
                        "courses",
                        courseId
                    );
                    setCourse(courseData);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-950 to-emerald-950">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-orange-950 to-emerald-950">
                <div className="bg-orange-950/60 backdrop-blur-3xl border border-red-500/30 p-12 rounded-[40px] text-center max-w-lg shadow-2xl">
                    <span className="text-6xl mb-6 block">🔒</span>
                    <h2 className="text-2xl font-black text-orange-100 mb-4 uppercase tracking-widest font-serif">Access Denied</h2>
                    <p className="text-orange-100/60 italic leading-relaxed mb-8 font-serif">
                        This content is locked. Your enrollment must be verified by the Academy Admin.
                    </p>
                    <Link to="/" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest transition-all">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-950 to-emerald-950 pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <Link to={`/course/${courseId}`} className="text-emerald-400 hover:text-emerald-300 font-bold mb-4 inline-block transition-colors">
                        ← Back to Course
                    </Link>
                    <h1 className="text-5xl lg:text-6xl font-black text-orange-50 font-serif drop-shadow-lg mb-2">
                        {course?.title}
                    </h1>
                    <p className="text-orange-100/70 text-lg font-serif">
                        {lessons.length} Lesson{lessons.length !== 1 ? 's' : ''} • Tap a lesson to begin watching
                    </p>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => {
                            const videoCount = lesson.youtubeIds?.length || 0;
                            return (
                                <Link
                                    key={lesson.$id}
                                    to={`/video/${courseId}/${lesson.$id}/0`}
                                    className="group block p-6 lg:p-8 rounded-2xl bg-orange-950/40 hover:bg-orange-950/60 border border-orange-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        {/* Left Side - Lesson Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-4 mb-3">
                                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 font-black group-hover:bg-emerald-500/50 transition-all">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-2xl font-bold text-orange-50 group-hover:text-emerald-300 transition-colors font-serif">
                                                    {lesson.title}
                                                </h3>
                                            </div>

                                            {lesson.description && (
                                                <p className="text-orange-100/70 font-serif ml-14 mb-4 line-clamp-2">
                                                    {lesson.description}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-4 ml-14">
                                                <div className="flex items-center gap-2 text-orange-100/60 text-sm font-medium">
                                                    <span className="text-xl">🎬</span>
                                                    <span>{videoCount} Video{videoCount !== 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Action */}
                                        <div className="flex flex-col items-end gap-3">
                                            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 group-hover:bg-emerald-500/40 transition-all">
                                                <span className="text-emerald-100 font-bold text-sm">Play →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📚</div>
                            <p className="text-orange-100/60 text-lg font-serif">No lessons available yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}