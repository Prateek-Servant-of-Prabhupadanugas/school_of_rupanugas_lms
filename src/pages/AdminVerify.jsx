import { useState, useEffect } from "react";
import { databases, storage, Query } from "../lib/appwrite";
import { CheckCircle, Eye, User, Mail, ShieldCheck, XCircle, RefreshCw } from "lucide-react";

export default function AdminVerify() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPending = async () => {
        setRefreshing(true);
        try {
            const res = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, "enrollments", [
                Query.equal("status", "Pending")
            ]);
            setEnrollments(res.documents);
        } catch (err) {
            console.error(err);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchPending(); }, []);

    const approve = async (id) => {
        setLoading(true);
        try {
            await databases.updateDocument(import.meta.env.VITE_DATABASE_ID, "enrollments", id, { status: "Verified" });
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] mb-2">Royal Treasury</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic font-serif">
                            Payment <span className="text-emerald-400">Ledger</span>
                        </h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={fetchPending}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl backdrop-blur-md flex items-center gap-3">
                            <ShieldCheck className="text-emerald-400 w-5 h-5" />
                            <span className="text-white font-black text-xl">{enrollments.length}</span>
                            <span className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Ledger Cards */}
                <div className="grid gap-6">
                    {enrollments.length > 0 ? (
                        enrollments.map((e) => (
                            <div 
                                key={e.$id} 
                                className="group bg-white/5 hover:bg-white/[0.08] backdrop-blur-2xl border border-white/10 hover:border-emerald-500/40 p-6 md:p-8 rounded-[35px] transition-all duration-500 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
                            >
                                {/* Student Profile */}
                                <div className="flex items-center gap-6 w-full lg:w-1/3">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-transparent flex items-center justify-center border border-white/10 text-emerald-400 font-black text-2xl shadow-inner">
                                            {e.userName.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-4 border-[#0A1A10] flex items-center justify-center">
                                            <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-white font-bold text-xl truncate flex items-center gap-2">
                                            <User className="w-4 h-4 text-white/20" /> {e.userName}
                                        </h3>
                                        <p className="text-white/40 text-sm truncate flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> {e.userEmail}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Container */}
                                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
                                    {/* View Receipt */}
                                    <a 
                                        href={storage.getFileView(import.meta.env.VITE_BUCKET_ID, e.screenshotId)} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 text-white/80 text-xs font-black uppercase tracking-[0.15em] border border-white/10 hover:bg-white/10 transition-all hover:text-white"
                                    >
                                        <Eye className="w-4 h-4 text-emerald-400" /> View Offering
                                    </a>

                                    {/* Verify Button */}
                                    <button 
                                        onClick={() => approve(e.$id)}
                                        disabled={loading}
                                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_rgba(16,185,129,0.2)] active:scale-95 disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Verify & Grant Access
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-32 bg-white/5 rounded-[50px] border border-dashed border-white/10 backdrop-blur-md">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10 text-emerald-500/30" />
                            </div>
                            <h3 className="text-white/60 text-2xl font-serif italic">All offerings are accounted for.</h3>
                            <p className="text-white/20 text-sm font-bold uppercase tracking-widest mt-2">The Ledger is Clean</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}