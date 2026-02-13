"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Leaf } from "lucide-react";

export default function Hero({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                    alt="Agriculture Background"
                    className="w-full h-full object-cover scale-110 motion-safe:animate-subtle-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            {/* Glass Navigation Bar (Mockup for now, or could be separate component) */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-white font-bold text-2xl tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    HOUKMI EXPORT
                </div>
                <div className="hidden md:flex gap-8 text-white/80 font-medium text-sm">
                    <Link href={`/${lang}/v2`} className="hover:text-white transition-colors">Home</Link>
                    <Link href="#about" className="hover:text-white transition-colors">About</Link>
                    <Link href="#products" className="hover:text-white transition-colors">Products</Link>
                    <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                </div>
                <Link
                    href="#contact"
                    className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg"
                >
                    Get Quote
                </Link>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6">
                        Premium Moroccan Produce
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        NATURE'S FINEST<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-green">
                            DIRECT TO YOU
                        </span>
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                        Strategically located in Agadir, we bridge the gap between Morocco's
                        sun-drenched fields and the global dinner table.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link
                            href="#products"
                            className="bg-brand-green text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-brand-green/20"
                        >
                            Explore Harvest <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#about"
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
                        >
                            Learn More
                        </Link>
                    </div>
                </motion.div>

                {/* Footer Stats Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl"
                >
                    {[
                        { label: "Active Countries", value: "24+", icon: <Globe className="w-4 h-4" /> },
                        { label: "Containers / Year", value: "1,200+", icon: <Leaf className="w-4 h-4" /> },
                        { label: "Quality Assurance", value: "100%", icon: <Leaf className="w-4 h-4" /> },
                        { label: "Fast Delivery", value: "24/7", icon: <Globe className="w-4 h-4" /> },
                    ].map((stat, i) => (
                        <div key={i} className="text-left border-l border-white/10 pl-4 md:pl-6 first:border-0">
                            <div className="flex items-center gap-2 text-brand-orange mb-1">
                                {stat.icon}
                                <span className="text-2xl md:text-3xl font-black text-white">{stat.value}</span>
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
}
