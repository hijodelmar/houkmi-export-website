"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const heroImages = [
    {
        url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
        alt: "Fresh ripe tomatoes",
        gradient: "from-red-500/30 to-orange-500/30"
    },
    {
        url: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b",
        alt: "Juicy oranges",
        gradient: "from-orange-500/30 to-yellow-500/30"
    },
    {
        url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
        alt: "Colorful bell peppers",
        gradient: "from-green-500/30 to-lime-500/30"
    },
    {
        url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
        alt: "Fresh watermelon",
        gradient: "from-pink-500/30 to-red-500/30"
    },
    {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        alt: "Agricultural field",
        gradient: "from-green-600/30 to-emerald-500/30"
    }
];

export default function HeroBackground() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-[1]">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={heroImages[currentImageIndex].url}
                        alt={heroImages[currentImageIndex].alt}
                        fill
                        // Only add priority/eager for indices that might be LCP in slow loads
                        priority={currentImageIndex <= 1}
                        loading="eager"
                        className="object-cover object-center"
                        sizes="100vw"
                        quality={80}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${heroImages[currentImageIndex].gradient} mix-blend-multiply opacity-60`}></div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-fresh animate-gradient opacity-60"></div>
        </div>
    );
}
