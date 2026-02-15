import { useState, useEffect } from "react";
import { databases, ID } from "../lib/appwrite";

export default function AdminPortal() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "", thumbnailUrl: "" });
    const [newLesson, setNewLesson] = useState({ title: "", courseId: "", youtubeIds: "" });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("course"); // 'course' or 'lesson'

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, "courses");
            setCourses(res.documents);
        };
        fetchCourses();
    }, []);

    const createCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await databases.createDocument(import.meta.env.VITE_DATABASE_ID, "courses", ID.unique(), {
                ...newCourse, price: Number(newCourse.price)
            });
            alert("👑 Course Crowned Successfully!");
            window.location.reload();
        } catch (err) { alert("Error in creation"); }
        setLoading(false);
    };

    const addLesson = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const idsArray = newLesson.youtubeIds.split(",").map(id => id.trim());
            await databases.createDocument(import.meta.env.VITE_DATABASE_ID, "lessons", ID.unique(), {
                title: newLesson.title,
                courseId: newLesson.courseId,
                youtubeIds: idsArray,
                order: 1
            });
            alert("💎 Jewel (Lesson) Added to Course!");
        } catch (err) { alert("Error adding lesson"); }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex justify-center items-start">
            <div className="w-full max-w-4xl space-y-6">
                
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-2xl">
                        Royal <span className="text-amber-400">Registry</span>
                    </h1>
                    <p className="text-white/40 italic font-medium mt-2 tracking-wide">Architect the future of Rupanugas</p>
                </div>

                {/* --- SECTION 1: COURSE CREATION (ACCORDION) --- */}
                <div className={`transition-all duration-700 rounded-[35px] border border-white/20 overflow-hidden shadow-2xl 
                    ${activeTab === 'course' ? 'bg-white/10 backdrop-blur-3xl scale-100' : 'bg-white/5 backdrop-blur-md scale-[0.98] opacity-60 hover:opacity-100'}`}>
                    
                    <button 
                        onClick={() => setActiveTab('course')}
                        className="w-full p-8 flex justify-between items-center text-left"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`p-3 rounded-2xl border transition-all ${activeTab === 'course' ? 'bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-white/10 border-white/10'}`}>
                                <span className="text-2xl text-white">📜</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Phase I: Foundational Course</h2>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Establish the core vessel</p>
                            </div>
                        </div>
                        <div className={`text-white/30 transition-transform ${activeTab === 'course' ? 'rotate-180' : ''}`}>▼</div>
                    </button>

                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeTab === 'course' ? 'max-h-[800px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={createCourse} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-amber-500 uppercase tracking-tighter ml-1">Official Title</label>
                                    <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 transition-all shadow-inner" 
                                        placeholder="Vedic Arts..." onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-amber-500 uppercase tracking-tighter ml-1">Royal Exchange (₹)</label>
                                    <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 transition-all shadow-inner" 
                                        type="number" placeholder="499" onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-amber-500 uppercase tracking-tighter ml-1">Visual Seal (Thumbnail URL)</label>
                                <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 transition-all shadow-inner" 
                                    placeholder="https://image-source.com/seal.jpg" onChange={e => setNewCourse({...newCourse, thumbnailUrl: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-amber-500 uppercase tracking-tighter ml-1">The Prophecy (Description)</label>
                                <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 h-32 transition-all shadow-inner" 
                                    placeholder="Enter the course narrative..." onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
                            </div>
                            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95">
                                {loading ? "Crystallizing..." : "Authorize & Publish"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- SECTION 2: LESSON ADDITION (ACCORDION) --- */}
                <div className={`transition-all duration-700 rounded-[35px] border border-white/20 overflow-hidden shadow-2xl 
                    ${activeTab === 'lesson' ? 'bg-white/10 backdrop-blur-3xl scale-100' : 'bg-white/5 backdrop-blur-md scale-[0.98] opacity-60 hover:opacity-100'}`}>
                    
                    <button 
                        onClick={() => setActiveTab('lesson')}
                        className="w-full p-8 flex justify-between items-center text-left"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`p-3 rounded-2xl border transition-all ${activeTab === 'lesson' ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/10 border-white/10'}`}>
                                <span className="text-2xl text-white">💎</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Phase II: Adding Wisdom</h2>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Populate the course with gems</p>
                            </div>
                        </div>
                        <div className={`text-white/30 transition-transform ${activeTab === 'lesson' ? 'rotate-180' : ''}`}>▼</div>
                    </button>

                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeTab === 'lesson' ? 'max-h-[800px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={addLesson} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter ml-1">Target Course</label>
                                <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 transition-all cursor-pointer appearance-none" 
                                    onChange={e => setNewLesson({...newLesson, courseId: e.target.value})}>
                                    <option className="bg-slate-900 text-white">Select Course Hub</option>
                                    {courses.map(c => <option className="bg-slate-900 text-white" key={c.$id} value={c.$id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter ml-1">Lesson Title</label>
                                <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 transition-all shadow-inner" 
                                    placeholder="Introduction to Sacred Geometry" onChange={e => setNewLesson({...newLesson, title: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter ml-1">Wisdom Links (YouTube IDs)</label>
                                <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 transition-all shadow-inner" 
                                    placeholder="id1, id2, id3 (comma separated)" onChange={e => setNewLesson({...newLesson, youtubeIds: e.target.value})} />
                            </div>
                            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95">
                                {loading ? "Embedding Knowledge..." : "Add Jewel to Crown"}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}