import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CourseCard({ course, enrolled = false }) {
    const { user } = useAuth();
    if (!course) return null;

    const isVerified = enrolled;

    return (
        /* The Outer Wrapper creates the 'Rim' of the glass */
        <div className="group relative p-[1.5px] rounded-[32px] bg-gradient-to-br from-emerald-400/30 to-emerald-500/5 transition-all duration-500 hover:-translate-y-2">
            
            {/* The Glass Body: 
               1. bg-orange-950/40 (Low opacity background)
               2. backdrop-blur-md (The frosting effect)
            */}
            <div className="relative bg-orange-950/40 backdrop-blur-md rounded-[31px] p-5 h-full border border-orange-400/10 flex flex-col overflow-hidden shadow-2xl">
                
                {/* 3D Image Container */}
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video border border-white/5 shadow-inner">
                    <img 
                        src={course?.thumbnailUrl || "https://placehold.co/600x400?text=Sacred+Teachings"} 
                        alt={course?.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Status Badges */}
                    {isVerified && (
                        <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-xl text-emerald-100 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-400/30 uppercase tracking-widest shadow-xl">
                            Unlocked
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-grow relative z-10">
                    <h3 className="text-xl font-bold text-orange-50 mb-2 group-hover:text-emerald-300 transition-colors duration-300 tracking-tight font-serif">
                        {course?.title}
                    </h3>
                    <p className="text-orange-100/40 text-xs mb-6 line-clamp-2 italic font-medium leading-relaxed font-serif">
                        {course?.description || "Begin your journey into the depths of divine wisdom."}
                    </p>

                    {/* Footer / Action Area */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
                        <div className="flex flex-col">
                            <p className="text-[9px] text-emerald-400/50 uppercase font-black tracking-widest mb-0.5">Investment</p>
                            <span className="text-2xl font-black text-orange-100 drop-shadow-md font-serif">₹{course?.price}</span>
                        </div>
                        
                        {isVerified ? (
                            <Link 
                                to={`/watch/${course?.$id}`} 
                                className="relative overflow-hidden group/btn bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-100 px-6 py-2.5 rounded-xl font-bold border border-emerald-400/20 transition-all active:scale-95"
                            >
                                <span className="relative z-10 text-sm">Enter Class</span>
                            </Link>
                        ) : (
                            <Link 
                                to={user ? `/course/${course?.$id}` : "/login"} 
                                className="bg-emerald-500 hover:bg-emerald-400 text-[#0A1A10] px-7 py-2.5 rounded-xl font-black transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95 text-xs uppercase tracking-widest"
                            >
                                Enroll
                            </Link>
                        )}
                    </div>
                </div>

                {/* Ambient Internal Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
            </div>
        </div>
    );
}