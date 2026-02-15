import { useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import { Query } from "appwrite";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const carouselData = [
    { id: 1, image: "vrindavan_forest_image_slightly_dull.jpg", title: "Welcome to Vrindavan", text: "Experience divine wisdom in the spiritual heart of Vrindavan" },
    { id: 2, image: "goverdhan_image.png", title: "Mount Govardhan", text: "Learn sacred teachings in the land of Lord Krishna" },
    { id: 3, image: "yamuna_and_vrindavan.jpg", title: "River Yamuna", text: "Discover spiritual knowledge flowing like the sacred river" },
    { id: 4, image: "krishna_and_friends.png", title: "Divine Learning", text: "Join our community of seekers and scholars" },
    { id: 5, image: "six_gosvamis_standing.jpg", title: "Teachings of the Six Gosvamis", text: "Master ancient wisdom and philosophy" }
];

export default function Home() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const courseRes = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, 'courses');
                setCourses(courseRes.documents);
                if (user) {
                    const enrollRes = await databases.listDocuments(
                        import.meta.env.VITE_DATABASE_ID,
                        'enrollments',
                        [Query.equal("userId", user.$id)]
                    );
                    setEnrollments(enrollRes.documents);
                }
            } catch (err) {
                setError("The sacred archives are temporarily unreachable.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);

    return (
        <div className="min-h-screen bg-transparent">
            
            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden">
                {/* No background overlays here to keep the green landscape sharp */}
                <div className="container mx-auto text-center space-y-8 relative z-10">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                            Begin Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-emerald-100 to-yellow-400 italic font-serif">
                                Krsna <br/>Consciousness
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed font-serif drop-shadow-md">
                            Access the Best Courses to help you Progress in your Spiritual Journey 
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/courses" className="px-10 py-4 bg-emerald-600/80 backdrop-blur-md hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 border border-white/20">
                            Explore Courses
                        </Link>
                        {/* Glassmorphism Badge */}
                        <div className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-sm font-bold shadow-lg">
                            ✨ {courses.length}+ Modules
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CAROUSEL SECTION --- */}
            <section className="py-20 px-4 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm">
                        <div className="relative h-96 md:h-[500px]">
                            {carouselData.map((slide, index) => (
                                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                    <img src={`/src/assets/${slide.image}`} alt={slide.title} className="w-full h-full object-cover" />
                                    {/* Minimal shadow only at the very bottom for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                        <h3 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-lg text-yellow-50">{slide.title}</h3>
                                        <p className="text-lg md:text-xl text-white/80 font-serif drop-shadow-md">{slide.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Navigation dots/buttons with glass effect */}
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-xl transition-all border border-white/10">❮</button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-xl transition-all border border-white/10">❯</button>
                    </div>
                </div>
            </section>

            {/* --- COURSES SECTION --- */}
            <section id="course-list" className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <p className="text-emerald-300 font-black text-xs uppercase tracking-[0.3em] drop-shadow-sm">The Curriculum</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-serif drop-shadow-md">
                            {user ? "Continue Your Sacred Journey" : "Divine Archives"}
                        </h2>
                    </div>
                    <Link to="/courses" className="text-emerald-300 hover:text-white font-bold text-sm transition-colors">View All →</Link>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white/70 font-bold uppercase tracking-widest text-xs">Consulting the Oracle...</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.length > 0 ? (
                            courses.slice(0, 6).map(course => (
                                <CourseCard 
                                    key={course.$id} 
                                    course={course} 
                                    enrolled={enrollments.some(e => e.courseId === course.$id)}
                                />
                            ))
                        ) : (
                            /* Clean glass placeholder */
                            <div className="col-span-full text-center py-20 bg-white/5 backdrop-blur-xl rounded-[40px] border border-dashed border-white/20 shadow-inner">
                                <p className="text-white/60 italic text-lg font-serif">The archives are currently being prepared.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- FOOTER DECORATION --- */}
            <div className="py-20 text-center border-t border-white/10 relative z-10">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] font-serif">
                    School of Rupanugas • Divine Education • Vrindavan
                </p>
            </div>
        </div>
    );
}