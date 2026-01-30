import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../lib/appwrite";
import { useState } from "react";

export const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const adminEmails = ["schoolofrupanugas@gmail.com", "mam@gmail.com"];
    const isAdmin = user && adminEmails.includes(user.email);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] 
                        bg-white/10 backdrop-blur-xl border border-white/30 
                        rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                        py-3 px-6 transition-all duration-500">
            
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center border border-white/40">
                            <span className="text-white font-black text-xl">R</span>
                        </div>
                        <span className="text-xl font-black tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] hidden xs:block">
                            RUPANUGAS<span className="text-amber-400 italic font-serif">.EDU</span>
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-2 font-semibold text-white/90">
                        <Link to="/" className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all">Home</Link>
                        <Link to="/about" className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-all">About</Link>
                        
                        {isAdmin && (
                            <div className="flex gap-2 ml-4 pl-4 border-l border-white/20">
                                <Link to="/admin" className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-500/30 hover:bg-purple-500/40 transition-all text-sm flex items-center gap-2">
                                    ➕ Create
                                </Link>
                                <Link to="/admin/verify" className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/40 transition-all text-sm flex items-center gap-2">
                                    ✅ Verify
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden lg:block text-white/70 text-sm font-medium italic">
                                Hare Krsna , <span className="text-amber-400 font-bold">{user.name}</span>
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="bg-white/10 hover:bg-red-500/20 text-white border border-white/20 hover:border-red-500/50 px-5 py-2 rounded-xl font-bold backdrop-blur-md transition-all active:scale-95 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Link to="/login" className="text-white font-bold px-4 py-2 hover:text-amber-400 transition-all text-sm">Login</Link>
                            <Link to="/signup" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2 rounded-xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all active:scale-95 text-sm">
                                Join Now
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white bg-white/10 rounded-lg border border-white/20"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-white px-4 py-3 rounded-xl hover:bg-white/10">Home</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="text-white px-4 py-3 rounded-xl hover:bg-white/10">About</Link>
                    {isAdmin && (
                        <>
                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin" className="text-purple-200 px-4 py-3 rounded-xl bg-purple-500/10">➕ Create Course</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin/verify" className="text-emerald-200 px-4 py-3 rounded-xl bg-emerald-500/10">✅ Verify Payments</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};