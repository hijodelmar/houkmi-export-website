"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section id="contact" className="py-24 bg-brand-green/95 relative overflow-hidden">
            {/* Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 blur-3xl rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                                Start Your Next <br />
                                <span className="text-brand-orange">Import Order</span>
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed mb-12">
                                Ready to bring premium Moroccan produce to your market?
                                Our team is standing by to discuss logistics, pricing, and availability.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {[
                                { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+212 600 000 000" },
                                { icon: <Mail className="w-6 h-6" />, label: "Email", value: "contact@houkmi-export.com" },
                                { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "Agadir, Morocco" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-orange transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{item.label}</div>
                                        <div className="text-xl font-bold text-white">{item.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
                    >
                        <h3 className="text-2xl font-black text-gray-900 mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                    <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" placeholder="Your Company Ltd." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all" placeholder="Tell us about your requirements..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-brand-orange text-white font-black uppercase tracking-widest py-5 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                                Send Inquiry
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
