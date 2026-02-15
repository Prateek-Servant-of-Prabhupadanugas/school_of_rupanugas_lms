import { useState } from "react";
import { account } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Key, Mail, Eye, EyeOff, Sparkles, ChevronRight } from "lucide-react";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Appwrite: Create session
            await account.createEmailPasswordSession(formData.email, formData.password);
            const userDetails = await account.get();
            setUser(userDetails);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("The credentials provided do not match our records.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#0A1A10] overflow-hidden">
            {/* Sacred Geometry / Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-orange-500/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md z-10">
                {/* Branding */}
                <div className="text-center mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-4">
                        <Sparkles className="w-3 h-3" /> Digital Ashram
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter italic font-serif">
                        Rupanuga <span className="text-emerald-400">Gate</span>
                    </h1>
                    <p className="text-white/30 text-xs font-bold tracking-[0.4em] uppercase font-serif">Secure Access to Wisdom</p>
                </div>

                {/* Glass Card */}
                <div className="relative group">
                    {/* Decorative Border Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500/30 to-orange-500/20 rounded-[40px] blur opacity-75 group-focus-within:opacity-100 transition duration-1000"></div>
                    
                    <form 
                        onSubmit={handleLogin} 
                        className="relative bg-[#0A1A10]/80 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 space-y-8"
                    >
                        {error && (
                            <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-400 text-xs font-bold text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest ml-2 font-serif">
                                    <Mail className="w-3 h-3" /> Seeker Email
                                </label>
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                    placeholder="seeker@wisdom.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest ml-2 font-serif">
                                    <Key className="w-3 h-3" /> Secret Key
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        required 
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                        placeholder="••••••••"
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
                            className="group/btn relative w-full overflow-hidden bg-emerald-500 text-[#0A1A10] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "Verifying Presence..." : (
                                    <>Enter the Sanctum <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                                )}
                            </span>
                        </button>

                        <div className="text-center">
                            <p className="text-white/30 text-xs font-serif italic">
                                First time at the Academy?{" "}
                                <Link to="/signup" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors not-italic ml-1">
                                    Manifest an Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}