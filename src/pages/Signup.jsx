import { useState } from "react";
import { account, ID } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Wand2 } from "lucide-react";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
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
            // 2. Create Session (Automatic Login)
            await account.createEmailPasswordSession(formData.email, formData.password);
            // 3. Update Global Context
            const userDetails = await account.get();
            setUser(userDetails);
            navigate("/");
        } catch (err) {
            setError(err.message || "The initiation could not be completed at this time.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#0A1A10] overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md z-10">
                {/* Branding */}
                <div className="text-center mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-4">
                        <Sparkles className="w-3 h-3" /> Spiritual Initiation
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter italic font-serif">
                        New <span className="text-emerald-400">Aspirant</span>
                    </h1>
                    <p className="text-white/30 text-xs font-bold tracking-[0.4em] uppercase font-serif">Begin your journey in the circle</p>
                </div>

                {/* Glass Card */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 via-orange-500/10 to-emerald-500/20 rounded-[40px] blur opacity-75 group-focus-within:opacity-100 transition duration-1000"></div>
                    
                    <form 
                        onSubmit={handleSignup} 
                        className="relative bg-[#0A1A10]/80 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 space-y-6"
                    >
                        {error && (
                            <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[11px] font-bold text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest ml-2 font-serif">
                                    <User className="w-3 h-3" /> Full Identity
                                </label>
                                <input 
                                    type="text" required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                    placeholder="e.g. Arjuna Das"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest ml-2 font-serif">
                                    <Mail className="w-3 h-3" /> Email Address
                                </label>
                                <input 
                                    type="email" required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                    placeholder="seeker@wisdom.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest ml-2 font-serif">
                                    <Lock className="w-3 h-3" /> Choose Secret Key
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        required minLength={8}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                        placeholder="Min. 8 characters"
                                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-emerald-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-emerald-500 text-[#0A1A10] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 shadow-[0_20px_40px_rgba(16,185,129,0.2)] mt-4"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>Forging Identity...</>
                                ) : (
                                    <>Begin My Journey <Wand2 className="w-4 h-4" /></>
                                )}
                            </span>
                        </button>

                        <div className="text-center">
                            <p className="text-white/30 text-xs font-serif italic">
                                Already part of the circle?{" "}
                                <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors not-italic ml-1">
                                    Access the Sanctum
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}