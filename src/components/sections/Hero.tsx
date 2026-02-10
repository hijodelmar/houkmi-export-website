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

            {/* Decorative Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-brand-yellow rounded-full opacity-20 animate-float"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-brand-purple rounded-full opacity-20 animate-bounce-slow"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-brand-mint rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Main Heading - Larger and Bolder */}
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl leading-tight">
                        {dict.Hero.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto font-light drop-shadow-lg">
                        {dict.Hero.subtitle}
                    </p>

                    {/* CTA Buttons with Enhanced Styling */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={`/${lang}/products`}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 111, 0, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-white text-brand-orange font-bold rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2"
                            >
                                {dict.Hero.cta_products}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link href={`/${lang}/contact`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/50 hover:bg-white/30 transition-all duration-300 shadow-xl"
                            >
                                {dict.Hero.cta_contact}
                            </motion.button>
                        </Link>
                    </div>

                    {/* Image Indicators */}
                    <div className="flex gap-2 justify-center mt-12">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/40 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
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
