import { useState } from "react";
import { databases, storage, ID } from "../lib/appwrite";

export default function CourseDetail({ course, user }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handlePaymentSubmit = async () => {
        if (!file) return alert("Please upload payment screenshot");
        setUploading(true);
        try {
            const upload = await storage.createFile(import.meta.env.VITE_BUCKET_ID, ID.unique(), file);
            
            await databases.createDocument(import.meta.env.VITE_DATABASE_ID, "enrollments", ID.unique(), {
                userId: user.$id,
                courseId: course.$id,
                status: "Pending",
                screenshotId: upload.$id,
                userName: user.name,
                userEmail: user.email
            });
            alert("👑 Offering Received. Please wait for verification.");
        } catch (err) {
            console.error(err);
        } finally { setUploading(false); }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Hero Section */}
                <div className="relative group rounded-[40px] overflow-hidden border border-white/20 shadow-2xl mb-12">
                    <img 
                        src={course.thumbnailUrl} 
                        className="w-full h-[300px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                        alt={course.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
                            Premium Curriculum
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                            {course.title}
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* Left Side: About */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[35px]">
                            <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                                <span className="text-3xl">📖</span> About this Wisdom
                            </h3>
                            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Payment Vault */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-[2px] rounded-[35px] bg-gradient-to-b from-amber-400/40 to-transparent shadow-2xl">
                            <div className="bg-slate-900/80 backdrop-blur-3xl p-8 rounded-[34px] border border-white/10 text-center">
                                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Enroll Today</h3>
                                <p className="text-white/40 text-sm mb-6">Exchange for Lifetime Access</p>
                                
                                <div className="text-4xl font-black text-white mb-8">
                                    <span className="text-amber-500 text-xl mr-1">₹</span>
                                    {course.price}
                                </div>

                                <div className="space-y-6">
                                    {/* Custom Styled File Input */}
                                    <div className="relative group">
                                        <label className="block text-xs font-black text-amber-500/60 uppercase tracking-widest mb-3">
                                            Upload Payment Proof
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                onChange={e => setFile(e.target.files[0])} 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="bg-white/5 border-2 border-dashed border-white/20 group-hover:border-amber-500/50 py-6 rounded-2xl transition-all">
                                                <span className="text-white/60 text-sm font-medium">
                                                    {file ? file.name : "Choose Screenshot"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handlePaymentSubmit} 
                                        disabled={uploading} 
                                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_15px_30px_rgba(245,158,11,0.3)] active:scale-95 disabled:opacity-50"
                                    >
                                        {uploading ? "Uploading Proof..." : "Verify Offering"}
                                    </button>
                                    
                                    <p className="text-[10px] text-white/30 italic">
                                        Scan the UPI QR in the WhatsApp group and upload the successful transaction screenshot here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}