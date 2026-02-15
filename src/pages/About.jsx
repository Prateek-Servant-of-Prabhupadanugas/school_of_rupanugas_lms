import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function About() {
    // --- 3D Logo Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        x.set(mouseXPos / width - 0.5);
        y.set(mouseYPos / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            className="min-h-screen bg-transparent flex items-center justify-center pt-32 pb-12 px-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Outer Glass Frame */}
            <div className="relative max-w-5xl w-full p-[1px] rounded-[40px] bg-gradient-to-br from-emerald-400/30 to-white/10 shadow-2xl">
                
                {/* Inner Glass Body */}
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-[39px] p-8 md:p-16 border border-white/10 overflow-hidden">
                    
                    {/* Subtle Emerald Glow (Doesn't muddy the background) */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Content Header */}
                    <div className="relative z-10 text-center space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-emerald-300 font-bold uppercase tracking-[0.4em] text-xs drop-shadow-sm">The School of</h2>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl italic font-serif">
                                RUPANUGAS
                            </h1>
                        </div>

                        {/* --- 3D INTERACTIVE LOGO --- */}
                        <div className="flex justify-center py-4" style={{ perspective: 1000 }}>
                            <motion.div
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformStyle: "preserve-3d",
                                }}
                                className="relative w-48 h-48 md:w-64 md:h-64"
                            >
                                <img 
                                    src="src/assets/school_of_rupanugas_logo.PNG" 
                                    alt="Rupanugas Logo"
                                    className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                                />
                                <div 
                                    style={{ transform: "translateZ(30px)" }} 
                                    className="absolute inset-0 border-2 border-emerald-400/20 rounded-full pointer-events-none"
                                />
                            </motion.div>
                        </div>

                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto"></div>

                        {/* Vision Section */}
                        <div className="max-w-3xl mx-auto space-y-4">
                            <h3 className="text-emerald-200 font-bold text-sm uppercase tracking-widest opacity-80">Our Vision</h3>
                            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic font-serif drop-shadow-md">
                                "To equip devotees with practical preaching and teaching skills with philosophical understanding to serve ISKCON's preaching mission effectively."
                            </p>
                        </div>
                    </div>

                    {/* Mission Pillars */}
                    <div className="mt-20 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <MissionCard icon="🏹" title="Empowering Leaders" desc="Developing strategic skills for effective preaching and organizational leadership." />
                            <MissionCard icon="📖" title="Shastric Education" desc="Conducting courses based on authentic teaching methods and Shastric knowledge." />
                            <MissionCard icon="🤝" title="Temple Support" desc="Serving the training needs of temples and leaders for their congregations." />
                            <MissionCard icon="🔄" title="Dynamic Reform" desc="Adapting training methods according to time, place, and circumstances." />
                            <MissionCard icon="🧘" title="Individual Confidence" desc="Inspiring individuals with unwavering confidence on the path of Bhakti Yoga." />
                            
                            <div className="flex items-center justify-center p-8 rounded-3xl border border-dashed border-emerald-400/30 bg-white/5 backdrop-blur-md">
                                <p className="text-emerald-200/80 font-serif italic text-center text-sm">In the service of<br/><span className="text-white font-bold not-italic">Srila Prabhupada</span></p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-16 text-center text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] font-serif">
                        Established for the Preaching Mission • Rooted in Vrindavan, Reaching the World.
                    </p>
                </div>
            </div>
        </div>
    );
}

function MissionCard({ icon, title, desc }) {
    return (
        <div className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 hover:bg-white/10 transition-all duration-500 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <span className="text-xl">{icon}</span>
                </div>
                <h4 className="font-bold text-lg text-white tracking-tight font-serif">{title}</h4>
                <p className="text-white/60 text-xs leading-relaxed font-serif">{desc}</p>
            </div>
        </div>
    );
}