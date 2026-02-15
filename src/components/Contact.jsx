import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });
            setLoading(false);
            
            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <section className="min-h-screen py-20 px-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Get In Touch</p>
                    <h2 className="text-4xl md:text-5xl font-black text-orange-100 mb-4">Contact Us</h2>
                    <p className="text-orange-100/60 text-lg max-w-2xl mx-auto font-medium">
                        Have questions about our courses? We're here to help. Reach out to us anytime!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Contact Card 1 */}
                    <div className="vr-glass rounded-2xl p-8 border border-orange-400/20 hover:border-orange-400/40 transition-all group">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MapPin className="w-7 h-7 text-orange-900" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-100 mb-2">Visit Us</h3>
                        <p className="text-orange-100/60 font-medium mb-2">School of Rupanugas</p>
                        <p className="text-orange-100/50 text-sm">Vrindavan, Uttar Pradesh</p>
                        <p className="text-orange-100/50 text-sm">India</p>
                    </div>

                    {/* Contact Card 2 */}
                    <div className="vr-glass rounded-2xl p-8 border border-emerald-400/20 hover:border-emerald-400/40 transition-all group">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Mail className="w-7 h-7 text-emerald-900" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-100 mb-2">Email Us</h3>
                        <a href="mailto:schoolofrupanugas@gmail.com" className="text-emerald-300 hover:text-emerald-200 font-medium transition-colors">
                            schoolofrupanugas@gmail.com
                        </a>
                        <p className="text-orange-100/50 text-sm mt-2">We'll respond within 24 hours</p>
                    </div>

                    {/* Contact Card 3 */}
                    <div className="vr-glass rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/40 transition-all group">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Clock className="w-7 h-7 text-orange-900" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-100 mb-2">Hours</h3>
                        <p className="text-orange-100/60 font-medium text-sm mb-1">Monday - Friday</p>
                        <p className="text-orange-100/50 text-sm">9:00 AM - 6:00 PM IST</p>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="grid md:grid-cols-5 gap-8 items-start">
                    {/* Form */}
                        <div className="md:col-span-3">
                        <div className="vr-glass rounded-2xl p-8 border border-orange-400/20">
                            <h3 className="text-2xl font-bold text-orange-100 mb-6">Send us a Message</h3>
                            
                            {submitted && (
                                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-100 font-medium">
                                    ✓ Thank you! Your message has been received. We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="bg-orange-950/40 border border-orange-400/30 rounded-xl px-4 py-3 text-orange-100 placeholder:text-orange-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-orange-950/40 border border-orange-400/30 rounded-xl px-4 py-3 text-orange-100 placeholder:text-orange-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-orange-950/40 border border-orange-400/30 rounded-xl px-4 py-3 text-orange-100 placeholder:text-orange-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium"
                                    />
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="bg-orange-950/40 border border-orange-400/30 rounded-xl px-4 py-3 text-orange-100 placeholder:text-orange-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium"
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Your Message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full bg-orange-950/40 border border-orange-400/30 rounded-xl px-4 py-3 text-orange-100 placeholder:text-orange-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium resize-none"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin">⟳</span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Info Section */}
                        <div className="md:col-span-2">
                        <div className="vr-glass rounded-2xl p-8 border border-emerald-400/20">
                            <h3 className="text-2xl font-bold text-orange-100 mb-6">Why Contact Us?</h3>
                            <ul className="space-y-4 text-orange-100/70 font-medium">
                                <li className="flex gap-3">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Course inquiries and enrollment assistance</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Technical support for platform issues</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Customized learning paths and guidance</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Partnership and collaboration opportunities</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Feedback and suggestions for improvement</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
