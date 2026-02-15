import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, storage, ID, Query } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, Clock, Lock, BookOpen, UploadCloud } from "lucide-react";

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    const [course, setCourse] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [enrollmentStatus, setEnrollmentStatus] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const courseData = await databases.getDocument(
                    import.meta.env.VITE_DATABASE_ID,
                    "courses",
                    id
                );
                setCourse(courseData);

                if (!authLoading && user) {
                    const existing = await databases.listDocuments(
                        import.meta.env.VITE_DATABASE_ID,
                        "enrollments",
                        [
                            Query.equal("courseId", id),
                            Query.equal("userId", user.$id)
                        ]
                    );
                    if (existing.total > 0) {
                        setEnrollmentStatus(existing.documents[0].status);
                    }
                }
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchInitialData();
    }, [id, user, authLoading]);

    const handlePaymentSubmit = async () => {
        if (!user) return alert("Please log in to continue.");
        if (!file) return alert("Please upload your payment screenshot.");

        setUploading(true);
        try {
            const upload = await storage.createFile(
                import.meta.env.VITE_BUCKET_ID, 
                ID.unique(), 
                file
            );
            
            await databases.createDocument(
                import.meta.env.VITE_DATABASE_ID, 
                "enrollments", 
                ID.unique(), 
                {
                    userId: user.$id,
                    courseId: course.$id,
                    status: "Pending",
                    screenshotId: upload.$id,
                    userName: user.name,
                    userEmail: user.email
                }
            );
            
            alert("Offering Received. Verification in progress.");
            navigate("/courses"); 
        } catch (err) {
            console.error(err);
            alert("Failed to submit. Please try again.");
        } finally { 
            setUploading(false); 
        }
    };

    if (pageLoading || authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return <div className="text-white text-center py-40 font-serif italic text-2xl">The sacred archives are silent.</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* HERO SECTION: Glass & Vibrant Image */}
                <div className="relative rounded-[40px] overflow-hidden border border-white/20 shadow-2xl mb-12 bg-white/5 backdrop-blur-md">
                    <img 
                        src={course.thumbnailUrl} 
                        className="w-full h-[350px] md:h-[500px] object-cover" 
                        alt={course.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F1F] via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-emerald-500/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                {course.category || "Sacred Teaching"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl italic font-serif">
                            {course.title}
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    
                    {/* LEFT SIDE: Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[40px] shadow-2xl">
                            <h3 className="text-2xl font-bold text-emerald-300 mb-8 flex items-center gap-3 font-serif italic">
                                <BookOpen className="w-6 h-6" /> The Essence
                            </h3>
                            <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                {course.description || "Wisdom awaits the seeker."}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Payment Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-[1px] rounded-[40px] bg-gradient-to-b from-emerald-400/40 to-transparent">
                            <div className="bg-[#0A2F1F]/80 backdrop-blur-3xl p-8 rounded-[39px] border border-white/10 text-center">
                                
                                {enrollmentStatus === "Pending" ? (
                                    <div className="py-12 space-y-6">
                                        <Clock className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
                                        <h3 className="text-2xl font-bold text-white font-serif italic">Verification Active</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">
                                            The Temple Guardians are validating your offering. Access will open shortly.
                                        </p>
                                    </div>
                                ) : enrollmentStatus === "Verified" ? (
                                    <div className="py-12 space-y-8">
                                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                                        <h3 className="text-2xl font-bold text-white font-serif italic">Entry Granted</h3>
                                        <button 
                                            onClick={() => navigate(`/watch/${course.$id}`)} 
                                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl"
                                        >
                                            Start Learning
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Lifetime Access</div>
                                        <div className="text-5xl font-black text-white font-serif italic">₹{course.price}</div>
                                        
                                        <div className="h-[1px] bg-white/10 w-full my-6"></div>

                                        {/* Optional: Add a placeholder for your QR Code */}
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6">
                                            <p className="text-[10px] text-emerald-400 font-bold uppercase mb-2">Scan to Pay</p>
                                            <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
                                                <span className="text-white/20 text-xs italic">QR Code Placeholder</span>
                                            </div>
                                        </div>

                                        <div className="text-left space-y-4">
                                            <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-2">
                                                Upload Payment Proof
                                            </label>
                                            <div className="relative group">
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={e => setFile(e.target.files[0])} 
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="bg-white/5 border-2 border-dashed border-white/10 group-hover:border-emerald-500/50 py-6 rounded-2xl transition-all flex flex-col items-center gap-2">
                                                    <UploadCloud className="w-6 h-6 text-white/20 group-hover:text-emerald-400 transition-colors" />
                                                    <span className="text-white/40 text-xs font-bold">
                                                        {file ? file.name : "Select Screenshot"}
                                                    </span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={handlePaymentSubmit} 
                                                disabled={uploading} 
                                                className="w-full bg-white hover:bg-emerald-500 text-emerald-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                            >
                                                {uploading ? "Verifying..." : "Confirm Offering"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}