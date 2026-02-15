import { useState, useEffect } from "react";
import { databases, ID, Query } from "../lib/appwrite";
import { PlusCircle, BookOpen, Video, IndianRupee, Image as ImageIcon, Layers, ChevronDown } from "lucide-react";

export default function AdminPortal() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "", thumbnailUrl: "" });
    const [newLesson, setNewLesson] = useState({ title: "", courseId: "", youtubeIds: "", order: 1 });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("course"); 

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
        } catch (err) { console.error(err); }
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
                order: Number(newLesson.order)
            });
            alert("💎 Lesson Embedded in the Timeline!");
            setNewLesson({ title: "", courseId: "", youtubeIds: "", order: 1 });
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <PlusCircle className="w-3 h-3" /> Architect Mode
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic font-serif">
                        Royal <span className="text-amber-500">Registry</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-md mx-auto leading-relaxed">
                        Design the curriculum and manifest new vessels of knowledge for the seekers.
                    </p>
                </div>

                <div className="grid gap-6">
                    
                    {/* --- PHASE I: COURSE CREATOR --- */}
                    <div className={`group transition-all duration-500 rounded-[40px] border ${activeTab === 'course' ? 'bg-white/10 border-amber-500/30 shadow-2xl scale-100' : 'bg-white/5 border-white/5 scale-[0.98] opacity-60 hover:opacity-100'}`}>
                        <button 
                            onClick={() => setActiveTab('course')}
                            className="w-full p-8 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'course' ? 'bg-amber-500 text-slate-950 rotate-3' : 'bg-white/5 text-white/20'}`}>
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Phase I: Foundational Course</h2>
                                    <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-widest mt-1">Establish the core vessel</p>
                                </div>
                            </div>
                            <ChevronDown className={`text-white/20 transition-transform duration-500 ${activeTab === 'course' ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`transition-all duration-500 overflow-hidden ${activeTab === 'course' ? 'max-h-[1000px] p-8 pt-0' : 'max-h-0'}`}>
                            <form onSubmit={createCourse} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                                            <Layers className="w-3 h-3" /> Official Title
                                        </label>
                                        <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 focus:bg-white/10 transition-all" 
                                            placeholder="Vedic Arts & Philosophy" onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                                            <IndianRupee className="w-3 h-3" /> Exchange Value
                                        </label>
                                        <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 focus:bg-white/10 transition-all" 
                                            type="number" placeholder="1008" onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                                        <ImageIcon className="w-3 h-3" /> Visual Seal (URL)
                                    </label>
                                    <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 focus:bg-white/10 transition-all" 
                                        placeholder="https://image-hosting.com/thumbnail.jpg" onChange={e => setNewCourse({...newCourse, thumbnailUrl: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">The Narrative</label>
                                    <textarea required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 focus:bg-white/10 h-32 transition-all resize-none" 
                                        placeholder="Enter the course prophecy..." onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
                                </div>
                                <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] active:scale-95">
                                    {loading ? "Manifesting..." : "Authorize & Publish Course"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* --- PHASE II: LESSON BUILDER --- */}
                    <div className={`group transition-all duration-500 rounded-[40px] border ${activeTab === 'lesson' ? 'bg-white/10 border-emerald-500/30 shadow-2xl scale-100' : 'bg-white/5 border-white/5 scale-[0.98] opacity-60 hover:opacity-100'}`}>
                        <button 
                            onClick={() => setActiveTab('lesson')}
                            className="w-full p-8 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'lesson' ? 'bg-emerald-500 text-slate-950 -rotate-3' : 'bg-white/5 text-white/20'}`}>
                                    <Video className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Phase II: Adding Wisdom</h2>
                                    <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-widest mt-1">Populate the course with gems</p>
                                </div>
                            </div>
                            <ChevronDown className={`text-white/20 transition-transform duration-500 ${activeTab === 'lesson' ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`transition-all duration-500 overflow-hidden ${activeTab === 'lesson' ? 'max-h-[1000px] p-8 pt-0' : 'max-h-0'}`}>
                            <form onSubmit={addLesson} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Target Hub (Course)</label>
                                        <select required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 focus:bg-white/10 transition-all appearance-none cursor-pointer" 
                                            onChange={e => setNewLesson({...newLesson, courseId: e.target.value})}>
                                            <option value="" className="bg-slate-900">Select Hub</option>
                                            {courses.map(c => <option className="bg-slate-900" key={c.$id} value={c.$id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Timeline Order</label>
                                        <input required type="number" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 focus:bg-white/10 transition-all" 
                                            placeholder="1" value={newLesson.order} onChange={e => setNewLesson({...newLesson, order: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Lesson Title</label>
                                    <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 focus:bg-white/10 transition-all" 
                                        placeholder="The Science of Bhakti" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">YouTube Wisdom Keys (Comma Separated)</label>
                                    <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-400 focus:bg-white/10 transition-all font-mono text-sm" 
                                        placeholder="dQw4w9WgXcQ, 3hwp8ks..." value={newLesson.youtubeIds} onChange={e => setNewLesson({...newLesson, youtubeIds: e.target.value})} />
                                </div>
                                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] active:scale-95">
                                    {loading ? "Embedding..." : "Add Jewel to Crown"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}