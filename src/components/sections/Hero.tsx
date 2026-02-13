"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero({ lang, dict }: { lang: string; dict: any }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of hero images related to your export business
    const heroImages = [
        {
            url: "https://images.unsplash.com/photo-1546470427-227dd47b9e4f?w=1920&q=80",
            alt: "Fresh ripe tomatoes",
            gradient: "from-red-500/30 to-orange-500/30"
        },
        {
            url: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=1920&q=80",
            alt: "Juicy oranges",
            gradient: "from-orange-500/30 to-yellow-500/30"
        },
        {
            url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=1920&q=80",
            alt: "Colorful bell peppers",
            gradient: "from-green-500/30 to-lime-500/30"
        },
        {
            url: "https://images.unsplash.com/photo-1587049352846-4a222e784587?w=1920&q=80",
            alt: "Fresh watermelon",
            gradient: "from-pink-500/30 to-red-500/30"
        },
        {
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
            alt: "Agricultural field",
            gradient: "from-green-600/30 to-emerald-500/30"
        }
    ];

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image Carousel */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('${heroImages[currentImageIndex].url}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Gradient overlay for better text readability */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${heroImages[currentImageIndex].gradient}`}></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-fresh animate-gradient opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Main Heading - Matching Azura Style */}
                    <h1 className="text-5xl md:text-8xl font-[900] mb-8 text-white drop-shadow-2xl leading-[1.1] uppercase tracking-tight max-w-5xl">
                        {dict.Hero.title}
                    </h1>

                    {/* Subtitle / Sub-branding */}
                    <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl font-bold uppercase tracking-[0.2em] drop-shadow-lg">
                        {dict.Hero.subtitle}
                    </p>

                    {/* Model-style Footer Elements in Hero */}
                    <div className="mt-20 flex flex-col md:flex-row items-center gap-8 opacity-80">
                        <div className="h-16 w-px bg-white/40 hidden md:block"></div>
                        <div className="flex items-center gap-6">
                            <div className="text-white text-left">
                                <span className="text-sm font-bold uppercase tracking-wider">Wiliam Lombardi</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/80 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
}
