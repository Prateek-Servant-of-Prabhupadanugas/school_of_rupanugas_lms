import { useState } from "react";
import { account, ID } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // 1. Create Account
            await account.create(ID.unique(), formData.email, formData.password, formData.name);
            // 2. Create Session (Login)
            await account.createEmailPasswordSession(formData.email, formData.password);
            // 3. Update Global State
            const userDetails = await account.get();
            setUser(userDetails);
            navigate("/");
        } catch (err) {
            setError(err.message || "An error occurred during initiation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Soft Ambient Glows */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>

            <div className="w-full max-w-md relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                        New <span className="text-amber-500 font-serif">Aspirant</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-black tracking-[0.5em] mt-3">JOIN THE CIRCLE OF WISDOM</p>
                </div>

                {/* Glass Slab Form */}
                <div className="p-[1px] rounded-[40px] bg-gradient-to-br from-white/30 via-transparent to-white/5 shadow-2xl">
                    <form 
                        onSubmit={handleSignup} 
                        className="bg-slate-950/40 backdrop-blur-3xl p-10 rounded-[39px] border border-white/10 space-y-5"
                    >
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[11px] font-bold text-center leading-tight">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-2">Spiritual Name / Full Name</label>
                                <input 
                                    type="text" required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-500/50 transition-all shadow-inner"
                                    placeholder="Arjuna Das"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-2">Email Identity</label>
                                <input 
                                    type="email" required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-500/50 transition-all shadow-inner"
                                    placeholder="seeker@wisdom.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-2">Choose Secret Key</label>
                                <input 
                                    type="password" required minLength={8}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-500/50 transition-all shadow-inner"
                                    placeholder="Minimum 8 characters"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-white hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-4"
                        >
                            {loading ? "Forging Identity..." : "Begin My Journey"}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-white/40 text-sm">
                                Already a member?{" "}
                                <Link to="/login" className="text-amber-500 font-bold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
