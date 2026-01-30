import { useState, useEffect } from "react";
import { databases, storage, Query } from "../lib/appwrite";

export default function AdminVerify() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPending = async () => {
        const res = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, "enrollments", [
            Query.equal("status", "Pending")
        ]);
        setEnrollments(res.documents);
    };

    useEffect(() => { fetchPending(); }, []);

    const approve = async (id) => {
        setLoading(true);
        try {
            await databases.updateDocument(import.meta.env.VITE_DATABASE_ID, "enrollments", id, { status: "Verified" });
            alert("👑 Access Granted. Student Verified.");
            fetchPending();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-lg">
                            Payment <span className="text-emerald-400">Verifications</span>
                        </h2>
                        <p className="text-white/40 font-medium italic mt-1">Review the digital offerings of your students</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-md">
                        <span className="text-emerald-400 font-black text-xl">{enrollments.length}</span>
                        <span className="text-white/60 text-xs uppercase tracking-widest ml-3">Pending Requests</span>
                    </div>
                </div>

                {/* Ledger Table */}
                <div className="space-y-4">
                    {enrollments.length > 0 ? (
                        enrollments.map((e) => (
                            <div 
                                key={e.$id} 
                                className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 p-6 rounded-[28px] transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center border border-white/10 text-white font-black text-xl shadow-inner">
                                        {e.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-none">{e.userName}</h3>
                                        <p className="text-white/40 text-sm mt-1">{e.userEmail}</p>
                                    </div>
                                </div>

                                {/* Dynamic Action Box */}
                                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-center">
                                    {/* View Receipt Link as a Glass Button */}
                                    <a 
                                        href={storage.getFileView(import.meta.env.VITE_BUCKET_ID, e.screenshotId)} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-6 py-3 rounded-xl bg-white/5 text-white text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all active:scale-95"
                                    >
                                        View Receipt 👁️
                                    </a>

                                    {/* Verification Button */}
                                    <button 
                                        onClick={() => approve(e.$id)}
                                        disabled={loading}
                                        className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-emerald-500/40 active:scale-95 disabled:opacity-50"
                                    >
                                        Verify & Unlock
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10 backdrop-blur-md">
                            <p className="text-white/30 font-bold italic tracking-widest">The ledger is currently clear. No pending offerings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}