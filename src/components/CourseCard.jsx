import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CourseCard({ course, enrollments = [] }) {
    const { user } = useAuth();
    if (!course) return null;

    const userEnrollment = enrollments.find(e => e.courseId === course.$id);
    const isVerified = userEnrollment?.status === "Verified";
    const isPending = userEnrollment?.status === "Pending";

    return (
        /* The Outer Wrapper creates the 'Rim' of the glass */
        <div className="group relative p-[1.5px] rounded-[32px] bg-gradient-to-br from-white/40 via-transparent to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2">
            
            {/* The Glass Body */}
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-[31px] p-5 h-full border border-white/10 flex flex-col overflow-hidden">
                
                {/* 3D Image Container */}
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video border border-white/5 shadow-inner">
                    <img 
                        src={course?.thumbnailUrl || "https://placehold.co/600x400?text=Sacred+Teachings"} 
                        alt={course?.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Status Badges */}
                    {isVerified && (
                        <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/40 uppercase tracking-widest shadow-xl">
                            Unlocked
                        </div>
                    )}
                    {isPending && (
                        <div className="absolute top-3 right-3 bg-amber-500/20 backdrop-blur-md text-amber-300 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/40 uppercase tracking-widest animate-pulse shadow-xl">
                            Awaiting Blessing
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 tracking-tight">
                        {course?.title}
                    </h3>
                    <p className="text-white/50 text-xs mb-6 line-clamp-2 italic font-medium leading-relaxed">
                        {course?.description || "Begin your journey into the depths of divine wisdom."}
                    </p>

                    {/* Footer / Action Area */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                        <div className="flex flex-col">
                            <p className="text-[10px] text-amber-500/60 uppercase font-black tracking-widest mb-0.5">Energy Exchange</p>
                            <span className="text-2xl font-black text-white drop-shadow-md">₹{course?.price}</span>
                        </div>
                        
                        {isVerified ? (
                            <Link 
                                to={`/watch/${course?.$id}`} 
                                className="relative overflow-hidden group/btn bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold border border-white/20 transition-all shadow-lg active:scale-95"
                            >
                                <span className="relative z-10 text-sm">Enter Class</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                            </Link>
                        ) : isPending ? (
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-white/40 text-xs font-bold">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                                Processing...
                            </div>
                        ) : (
                            <Link 
                                to={user ? `/course/${course?.$id}` : "/login"} 
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-7 py-2.5 rounded-xl font-black transition-all shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:shadow-amber-500/50 active:scale-95 text-sm uppercase tracking-tighter"
                            >
                                Enroll Now
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}