export default function About() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
            {/* Main Glass Shield */}
            <div className="relative max-w-4xl w-full p-[1px] rounded-[40px] bg-gradient-to-br from-white/30 to-transparent shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
                
                <div className="relative bg-white/5 backdrop-blur-3xl rounded-[39px] p-8 md:p-16 border border-white/10 overflow-hidden">
                    
                    {/* Decorative Background Glows */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>

                    {/* Content Header */}
                    <div className="relative z-10 text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                            The Vision of <br />
                            <span className="text-amber-400 font-serif italic uppercase tracking-widest text-3xl md:text-5xl">
                                Rupanugas
                            </span>
                        </h1>
                        
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>

                        <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
                            We believe education is a sacred journey, not a corporate transaction. 
                            Our platform is a sanctuary for seekers who demand high-quality 
                            wisdom without the interference of massive corporate agendas.
                        </p>
                    </div>

                    {/* Stats Grid - Royal Medallions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 relative z-10">
                        
                        {/* Medallion 1 */}
                        <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:scale-[1.02]">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 mb-2">
                                    <span className="text-2xl">📜</span>
                                </div>
                                <h4 className="font-black text-2xl text-white tracking-tight">10+ Sacred Courses</h4>
                                <p className="text-white/50 text-sm font-medium">
                                    Meticulously curated by industry titans and spiritual guides.
                                </p>
                            </div>
                        </div>

                        {/* Medallion 2 */}
                        <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all duration-500 hover:scale-[1.02]">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-2">
                                    <span className="text-2xl">♾️</span>
                                </div>
                                <h4 className="font-black text-2xl text-white tracking-tight">Eternal Access</h4>
                                <p className="text-white/50 text-sm font-medium">
                                    Invest once, carry the knowledge through your entire lifetime.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Quote */}
                    <p className="mt-16 text-center text-amber-500/40 font-bold uppercase tracking-[0.3em] text-[10px]">
                        Est. 2024 • Built for the seekers
                    </p>
                </div>
            </div>
        </div>
    );
}