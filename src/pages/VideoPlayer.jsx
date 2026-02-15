import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { databases, Query } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";
import { 
    ChevronLeft, 
    ChevronRight, 
    LayoutList, 
    ShieldAlert, 
    PlayCircle, 
    Info, 
    Loader2 
} from "lucide-react";

export default function VideoPlayer() {
    const { courseId, lessonId, videoIndex } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(parseInt(videoIndex) || 0);

    useEffect(() => {
        const checkAccessAndFetch = async () => {
            try {
                setLoading(true);
                setVideoError(false);

                // 1. Verify Enrollment Status
                const enrollment = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    "enrollments",
                    [
                        Query.equal("courseId", courseId),
                        Query.equal("userId", user.$id),
                        Query.equal("status", "Verified") // Only allow if admin verified
                    ]
                );

                if (enrollment.total === 0) {
                    setHasAccess(false);
                    return;
                }

                setHasAccess(true);

                // 2. Fetch Data in Parallel
                const [lessonData, courseData] = await Promise.all([
                    databases.getDocument(import.meta.env.VITE_DATABASE_ID, "lessons", lessonId),
                    databases.getDocument(import.meta.env.VITE_DATABASE_ID, "courses", courseId)
                ]);

                setLesson(lessonData);
                setCourse(courseData);
            } catch (error) {
                console.error("Error loading lesson:", error);
                setVideoError(true);
            } finally {
                setLoading(false);
            }
        };

        if (user) checkAccessAndFetch();
    }, [courseId, lessonId, user]);

    // Handle smooth transition between video parts
    const handleVideoChange = (index) => {
        setCurrentVideoIndex(index);
        setVideoError(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1A10]">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-emerald-400/40 font-black uppercase tracking-[0.3em] text-[10px]">Retrieving Sacred Media...</p>
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A1A10]">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[40px] text-center max-w-lg shadow-2xl">
                    <ShieldAlert className="w-16 h-16 text-amber-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest font-serif italic">Sanctum Locked</h2>
                    <p className="text-white/40 italic leading-relaxed mb-8 font-serif">
                        Your access to this teaching is pending verification. Please contact the administrator if you have already completed your contribution.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A10] px-8 py-3 rounded-2xl font-black uppercase tracking-widest transition-all">
                        Return to Archives
                    </Link>
                </div>
            </div>
        );
    }

    const youtubeIds = lesson?.youtubeIds || [];
    const currentVideoId = youtubeIds[currentVideoIndex];

    return (
        <div className="min-h-screen bg-[#0A1A10] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-8">
                
                {/* Navigation & Title */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60">
                        <Link to={`/watch/${courseId}`} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                            <LayoutList className="w-3 h-3" /> Syllabus
                        </Link>
                        <span>/</span>
                        <span className="text-white/30">{course?.title}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white font-serif italic tracking-tighter">
                        {lesson.title}
                    </h1>
                </div>

                {/* Main Player UI */}
                <div className="grid grid-cols-1 gap-8">
                    
                    {/* The Player Container */}
                    <div className="relative group p-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                        <div className="bg-black rounded-[31px] overflow-hidden relative pt-[56.25%] shadow-inner">
                            {videoError || !currentVideoId ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1A10]">
                                    <PlayCircle className="w-20 h-20 text-white/5 mb-4" />
                                    <h3 className="text-xl font-bold text-white/40 font-serif italic">Media stream unavailable</h3>
                                </div>
                            ) : (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1&color=white`}
                                    title={`${lesson.title} - Part ${currentVideoIndex + 1}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>

                    {/* Progress & Controls */}
                    <div className="flex flex-col md:flex-row items-center gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] p-6">
                        <button
                            onClick={() => handleVideoChange(currentVideoIndex - 1)}
                            disabled={currentVideoIndex === 0}
                            className="w-full md:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 disabled:opacity-10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5 flex items-center justify-center gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>

                        <div className="flex-1 w-full space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-400/60 px-1">
                                <span>Module Progress</span>
                                <span>Part {currentVideoIndex + 1} / {youtubeIds.length}</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-emerald-500 h-full transition-all duration-700 ease-out"
                                    style={{ width: `${((currentVideoIndex + 1) / youtubeIds.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => handleVideoChange(currentVideoIndex + 1)}
                            disabled={currentVideoIndex === youtubeIds.length - 1}
                            className="w-full md:w-auto px-6 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-10 text-[#0A1A10] rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Meta Info */}
                    <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="flex items-center gap-2 text-white font-serif italic text-2xl">
                                <Info className="w-5 h-5 text-emerald-500" /> Lesson Discourse
                            </h3>
                            <p className="text-white/50 leading-relaxed font-medium">
                                {lesson.description || "No description provided for this teaching."}
                            </p>
                        </div>
                        
                        <div className="bg-emerald-500/5 rounded-[32px] p-8 border border-emerald-500/10 h-fit">
                            <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-4">Quick Navigation</h4>
                            <div className="space-y-2">
                                {youtubeIds.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleVideoChange(idx)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                            currentVideoIndex === idx 
                                            ? "bg-emerald-500 text-[#0A1A10]" 
                                            : "text-white/40 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        Part {idx + 1} {currentVideoIndex === idx && "• Watching"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}