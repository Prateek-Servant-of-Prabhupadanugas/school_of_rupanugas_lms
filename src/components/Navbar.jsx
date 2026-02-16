import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../lib/appwrite";
import { useState } from "react";
import { LogOut, Menu, X, ShieldCheck, PlusCircle } from "lucide-react";

export const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAdmin = user && ["schoolofrupanugas@gmail.com", "mam@gmail.com"].includes(user.email);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // This shadow ensures the text has a "border" of darkness so it won't vanish on white clouds
    const textContrast = { textShadow: "0px 1px 3px rgba(0, 20, 10, 0.6)" };

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] 
                        bg-white/10 backdrop-blur-xl border border-white/40
                        rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] 
                        py-3 px-6 transition-all duration-500 ">
            
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg shadow-lg group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center border border-white/40">
                            <span className="text-white font-black text-xl">R</span>
                        </div>
                        <span 
                            style={textContrast}
                            className="text-xl font-black tracking-tighter text-white hidden xs:block font-serif italic"
                        >
                            RUPANUGAS<span className="text-emerald-400">.EDU</span>
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-1 mix-blend-difference">
                        {["Home", "About", "Courses", "Contact"].map((item) => (
                            <Link 
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                                style={textContrast}
                                className="px-4 py-2 rounded-xl text-white font-black hover:text-emerald-400 transition-all uppercase text-[11px] tracking-widest"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4 mix-blend-difference shadow-lg">
                            <span 
                                style={textContrast}
                                className="hidden lg:block text-white/90 text-[10px] font-black uppercase tracking-widest"
                            >
                                Hare Krsna, <span className="text-emerald-400">{user.name}</span>
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="bg-white/20 hover:bg-red-500/20 text-black mix-blend-difference border border-white/40 px-5 py-2 rounded-xl font-black transition-all active:scale-95 text-[10px] uppercase tracking-widest flex items-center gap-2"
                            >
                                <LogOut className="w-3 h-3 text-red-400" /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Link 
                                to="/login" 
                                style={textContrast}
                                className="text-black mix-blend-color font-black px-4 py-2 hover:text-emerald-400 transition-all text-[11px] uppercase tracking-widest"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-xl font-black shadow-lg transition-all active:scale-95 text-[11px] uppercase tracking-widest border border-white/20"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="hidden md:flex gap-2 ml-2 pl-4 border-l border-white/20">
                            <Link to="/admin" className="p-2 text-emerald-500 hover:text-emerald-400 transition-colors">
                                <PlusCircle className="w-5 h-5 shadow-lg text-black mix-blend-difference" />
                            </Link>
                        </div>
                    )}

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-black mix-blend-difference bg-white/20 rounded-lg border border-white/40"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/20 flex flex-col gap-2 mix-blend-difference">
                    {["Home", "About", "Courses", "Contact"].map((item) => (
                        <Link 
                            key={item}
                            onClick={() => setIsMobileMenuOpen(false)} 
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                            className="text-black mix-blend-difference font-black px-4 py-3 rounded-xl hover:bg-white/20 uppercase text-[10px] tracking-widest"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};