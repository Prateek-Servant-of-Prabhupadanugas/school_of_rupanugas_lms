import { useState } from "react";
import { account } from "../lib/appwrite";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await account.createEmailPasswordSession(formData.email, formData.password);
            const userDetails = await account.get();
            setUser(userDetails);
            navigate("/");
        } catch (err) {
            setError("The credentials provided do not match our records.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            {/* Background Accent Glow */}
            <div className="absolute w-[300px] h-[300px] bg-amber-500/20 blur-[100px] rounded-full -z-10"></div>

            <div className="w-full max-w-md">
                {/* Branding / Logo Area */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                        Rupanuga <span className="text-amber-500 font-serif">Gate</span>
                    </h1>
                    <p className="text-white/40 text-xs font-bold tracking-[0.4em] mt-2">SECURE ACCESS TO WISDOM</p>
                </div>

                {/* Glass Form */}
                <div className="p-[1px] rounded-[40px] bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                    <form 
                        onSubmit={handleLogin} 
                        className="bg-slate-950/40 backdrop-blur-3xl p-10 rounded-[39px] border border-white/10 space-y-6"
                    >
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-xs font-bold text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-2">Email Address</label>
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-500/50 transition-all shadow-inner"
                                    placeholder="seeker@wisdom.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest ml-2">Secret Key</label>
                                <input 
                                    type="password" 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-500/50 transition-all shadow-inner"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Enter the Sanctum"}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-white/40 text-sm">
                                New to the Academy?{" "}
                                <Link to="/signup" className="text-amber-500 font-bold hover:underline">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}