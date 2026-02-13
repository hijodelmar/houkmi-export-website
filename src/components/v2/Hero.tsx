"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Leaf } from "lucide-react";

export default function Hero({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax-like feel */}
            <div
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1546470427-227dd47b9e4f?w=1920&q=80')",
                    filter: "brightness(0.85)"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            {/* Glass Navigation Bar (Mockup for now, or could be separate component) */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-white font-bold text-2xl tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    HOUKMI<span className="font-light">EXPORT</span>
                </div>
                <div className="hidden md:flex gap-8 items-center bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20">
                    {['Home', 'About', 'Products', 'Gallery', 'Contact'].map((item) => (
                        <span key={item} className="text-white text-sm font-medium hover:text-brand-green active:scale-95 transition-all cursor-pointer">
                            {item}
                        </span>
                    ))}
                </div>
                <button className="bg-white text-brand-green font-bold px-6 py-2.5 rounded-full hover:bg-brand-green hover:text-white transition-all shadow-lg text-sm">
                    Get Quote
                </button>
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
                    <h1 className="text-5xl md:text-8xl font-[800] text-white leading-tight mb-6 drop-shadow-xl tracking-tight">
                        From Moroccan Soil <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-green">
                            To Global Tables
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Exporting the finest quality fruits and vegetables from Agadir to the world.
                        Certified excellence, sustainable farming, and 35+ years of trust.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={`/${lang}/products`}
                            className="group bg-brand-green hover:bg-brand-green-dark text-white text-lg font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-brand-green/30 flex items-center gap-2"
                        >
                            Our Catalog
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href={`/${lang}/about`}
                            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-lg font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2"
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
                        { label: 'Experience', value: '35+ Years' },
                        { label: 'Export Size', value: '50k Tons' },
                        { label: 'Markets', value: '25+ Countries' },
                        { label: 'Quality', value: 'GlobalGAP' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
}
