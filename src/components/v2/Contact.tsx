"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function Contact({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section className="relative py-24 bg-[#0a2f1c] overflow-hidden">
            {/* Background Map Effect */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 mix-blend-overlay pointer-events-none">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.5276226922987!2d-9.5981072!3d30.4177119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e9daa54fa9%3A0xdb98579d49265e7d!2sAgadir%2C%20Morocco!5e0!3m2!1sen!2sus!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(100%)' }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a2f1c]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-brand-green font-bold uppercase tracking-widest text-sm mb-4">Connect With Us</h4>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
                            Start Your Order <br />
                            <span className="text-white/50">Today.</span>
                        </h2>

                        <div className="space-y-8 mt-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                    <MapPin className="text-brand-orange" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Visit HQ</h3>
                                    <p className="text-gray-400">Agadir Industrial Zone, Morocco</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                    <Phone className="text-brand-green" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Call Us</h3>
                                    <p className="text-gray-400">+39 348 229 6062 (Wiliam)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                    <Mail className="text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Email Us</h3>
                                    <p className="text-gray-400">info@houkmiexport.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl"
                    >
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="Your name" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Company</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="Company Ltd" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
                                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="you@company.com" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Message</label>
                                <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="Tell us about your needs..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-brand-green to-brand-green-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-green/20 transition-all flex items-center justify-center gap-2 mt-4">
                                Send Request <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
