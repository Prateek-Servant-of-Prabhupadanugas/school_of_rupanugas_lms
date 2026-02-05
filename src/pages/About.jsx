import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function About() {
    // --- 3D Logo Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Rotate slightly (-15 to 15 degrees)
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
            className="min-h-screen bg-[#020617] flex items-center justify-center pt-24 pb-12 px-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative max-w-5xl w-full p-[1px] rounded-[40px] bg-gradient-to-br from-amber-500/30 to-transparent shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
                <div className="relative bg-[#0a0f1e]/80 backdrop-blur-3xl rounded-[39px] p-8 md:p-16 border border-white/10 overflow-hidden">
                    
                    {/* Decorative Glows */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]"></div>

                    {/* Content Header */}
                    <div className="relative z-10 text-center space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs">The School of</h2>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl italic">
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
                                className="relative"
                            >
                                {/* Replace src with your actual logo path */}
                                <img 
                                    src="src/assets/school_of_rupanugas_logo.PNG" 
                                    alt="Rupanugas Logo"
                                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                                />
                                {/* Hidden 3D layer for extra depth feeling */}
                                <div 
                                    style={{ transform: "translateZ(20px)" }} 
                                    className="absolute inset-0 border-2 border-amber-500/20 rounded-full pointer-events-none"
                                />
                            </motion.div>
                        </div>
                        {/* --------------------------- */}

                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>

                        {/* Vision Section */}
                        <div className="max-w-3xl mx-auto space-y-4">
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-60">Our Vision</h3>
                            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed italic">
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
                            <div className="flex items-center justify-center p-8 rounded-3xl border border-dashed border-white/10">
                                <p className="text-amber-500/60 font-serif italic text-center">In the service of<br/>Srila Prabhupada</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-16 text-center text-amber-500/40 font-bold uppercase tracking-[0.3em] text-[10px]">
                        Established for the Preaching Mission • Rooted in Vrindavan , Reaching World .
                    </p>
                </div>
            </div>
        </div>
    );
}

function MissionCard({ icon, title, desc }) {
    return (
        <div className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-500">
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-xl">{icon}</span>
                </div>
                <h4 className="font-bold text-lg text-white tracking-tight">{title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}