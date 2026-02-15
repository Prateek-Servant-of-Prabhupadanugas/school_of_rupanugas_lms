import { useState } from "react";
import { databases, ID } from "../lib/appwrite";

export default function Admin() {
    const [courseData, setCourseData] = useState({ title: "", description: "", price: "", thumbnailUrl: "" });
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("course"); // 'course' or 'lesson'

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                "courses",
                ID.unique(),
                {
                    ...courseData,
                    price: Number(courseData.price),
                }
            );
            alert("👑 Royal Course Published!");
            setCourseData({ title: "", description: "", price: "", thumbnailUrl: "" });
        } catch (error) {
            console.error(error);
            alert("Mission failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center">
            <div className="max-w-3xl w-full space-y-8">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white drop-shadow-lg uppercase tracking-widest">
                        Command <span className="text-amber-400">Center</span>
                    </h1>
                    <p className="text-white/50 italic mt-2">Manage the sacred curriculum</p>
                </div>

                {/* SECTION 1: PUBLISH COURSE */}
                <div className={`transition-all duration-500 rounded-[32px] overflow-hidden border border-white/20 shadow-2xl ${activeSection === 'course' ? 'bg-white/10 backdrop-blur-2xl' : 'bg-white/5 backdrop-blur-md'}`}>
                    <button 
                        onClick={() => setActiveSection(activeSection === 'course' ? '' : 'course')}
                        className="w-full p-6 flex justify-between items-center text-white"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">📜</span>
                            <span className="text-xl font-bold tracking-tight">Step 1: Create New Course</span>
                        </div>
                        <span className={`transition-transform duration-300 ${activeSection === 'course' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    <div className={`transition-all duration-500 ease-in-out ${activeSection === 'course' ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={handleCourseSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-amber-500 uppercase ml-1">Course Title</label>
                                    <input 
                                        value={courseData.title} 
                                        onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 outline-none transition" 
                                        placeholder="e.g. Ancient Wisdom" required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-amber-500 uppercase ml-1">Price (₹)</label>
                                    <input 
                                        type="number" value={courseData.price} 
                                        onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 outline-none transition" 
                                        placeholder="499" required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-amber-500 uppercase ml-1">Thumbnail URL</label>
                                <input 
                                    value={courseData.thumbnailUrl} 
                                    onChange={(e) => setCourseData({...courseData, thumbnailUrl: e.target.value})}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 outline-none transition" 
                                    placeholder="https://..." required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-amber-500 uppercase ml-1">Description</label>
                                <textarea 
                                    value={courseData.description} 
                                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white h-32 focus:border-amber-500 outline-none transition" 
                                    placeholder="Divine details..." required
                                />
                            </div>
                            <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 uppercase tracking-widest">
                                {loading ? "Invoking Power..." : "Publish Course to Realm"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* SECTION 2: ADD LESSON (COLLAPSED BY DEFAULT) */}
                <div className={`transition-all duration-500 rounded-[32px] overflow-hidden border border-white/20 shadow-2xl ${activeSection === 'lesson' ? 'bg-white/10 backdrop-blur-2xl' : 'bg-white/5 backdrop-blur-md'}`}>
                    <button 
                        onClick={() => setActiveSection(activeSection === 'lesson' ? '' : 'lesson')}
                        className="w-full p-6 flex justify-between items-center text-white"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">💎</span>
                            <span className="text-xl font-bold tracking-tight">Step 2: Add Lessons to Course</span>
                        </div>
                        <span className={`transition-transform duration-300 ${activeSection === 'lesson' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    <div className={`transition-all duration-500 ease-in-out ${activeSection === 'lesson' ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0'}`}>
                        {/* You can move your Lesson creation form logic here */}
                        <p className="text-white/60 italic text-center py-10 border-2 border-dashed border-white/10 rounded-2xl">
                            Select a course from the dropdown above to begin adding lessons.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}