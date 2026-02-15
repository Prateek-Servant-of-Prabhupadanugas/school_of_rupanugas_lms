import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, storage, ID, Query } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";

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
                // 1. Fetch Course Content
                const courseData = await databases.getDocument(
                    import.meta.env.VITE_DATABASE_ID,
                    "courses",
                    id
                );
                setCourse(courseData);

                // 2. Check Enrollment Status (Only if user identity is confirmed)
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

        // Re-run whenever auth completes or course ID changes
        fetchInitialData();
    }, [id, user, authLoading]);

    const handlePaymentSubmit = async () => {
        if (!user) return alert("Your session is not active. Please log in.");
        if (!file) return alert("Please upload payment screenshot");

        setUploading(true);
        try {
            // Upload Proof to Appwrite Storage
            const upload = await storage.createFile(
                import.meta.env.VITE_BUCKET_ID, 
                ID.unique(), 
                file
            );
            
            // Create Enrollment Record
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
            
            alert("👑 Offering Received. Verification in progress.");
            navigate("/"); 
        } catch (err) {
            console.error(err);
            alert("Failed to submit. Please try again.");
        } finally { 
            setUploading(false); 
        }
    };

    // --- Master Loading State ---
    if (pageLoading || authLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return <div className="text-white text-center py-20 bg-slate-950 min-h-screen">Archives empty.</div>;

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950">
            <div className="max-w-6xl mx-auto">
                
                {/* HERO SECTION: Glass & Gradient */}
                <div className="relative group rounded-[40px] overflow-hidden border border-white/20 shadow-2xl mb-12">
                    <img 
                        src={course.thumbnailUrl} 
                        className="w-full h-[300px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                        alt={course.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
                            Sacred Curriculum
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl italic">
                            {course.title}
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* LEFT SIDE: Content Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[35px] shadow-inner">
                            <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                                <span className="text-3xl">📖</span> The Essence
                            </h3>
                            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap font-medium italic">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Payment Vault */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-[2px] rounded-[35px] bg-gradient-to-b from-amber-400/40 to-transparent shadow-2xl">
                            <div className="bg-slate-900/90 backdrop-blur-3xl p-8 rounded-[34px] border border-white/10 text-center">
                                
                                {enrollmentStatus === "Pending" ? (
                                    <div className="py-10 space-y-4">
                                        <div className="text-5xl animate-pulse">⏳</div>
                                        <h3 className="text-xl font-bold text-white">Verification Active</h3>
                                        <p className="text-white/40 text-sm italic leading-relaxed">
                                            The Temple Guardians are currently validating your offering. Access will open shortly.
                                        </p>
                                    </div>
                                ) : enrollmentStatus === "Verified" ? (
                                    <div className="py-10 space-y-6">
                                        <div className="text-5xl">✨</div>
                                        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Entry Granted</h3>
                                        <button 
                                            onClick={() => navigate(`/lesson/${course.$id}`)} 
                                            className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-400 transition-colors"
                                        >
                                            Enter Classroom
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Claim Access</h3>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-6">Lifetime Wisdom Exchange</p>
                                        
                                        <div className="text-5xl font-black text-white mb-8">
                                            <span className="text-amber-500 text-xl mr-1">₹</span>
                                            {course.price}
                                        </div>

                                        <div className="space-y-6 text-left">
                                            <div className="relative group">
                                                <label className="block text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] mb-3 ml-2">
                                                    Payment Receipt
                                                </label>
                                                <div className="relative">
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={e => setFile(e.target.files[0])} 
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="bg-white/5 border-2 border-dashed border-white/10 group-hover:border-amber-500/50 py-6 rounded-2xl transition-all text-center">
                                                        <span className="text-white/40 text-xs font-bold">
                                                            {file ? `✓ ${file.name.substring(0, 15)}...` : "Choose Screenshot"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={handlePaymentSubmit} 
                                                disabled={uploading} 
                                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] active:scale-95 disabled:opacity-50"
                                            >
                                                {uploading ? "Submitting..." : "Verify Offering"}
                                            </button>
                                            
                                            <p className="text-[10px] text-white/30 text-center italic leading-relaxed">
                                                Please scan the QR code in the sanctuary group and provide proof of the successful transaction.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}