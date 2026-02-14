"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function Gallery({ lang, dict }: { lang: string; dict: any }) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Shuffle images randomly on each load
                    const shuffled = [...data].sort(() => Math.random() - 0.5);
                    setImages(shuffled);
                } else {
                    console.error("Gallery API did not return an array:", data);
                    setImages([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch gallery:", err);
                setLoading(false);
            });
    }, []);

    const gridImages = images.slice(0, 9);
    const carouselImages = images.slice(9);

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 400;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto"></div>
                <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-sm">Elevating your visual experience...</p>
            </div>
        </section>
    );

    return (
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-brand-mint/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent italic">
                            {dict.Gallery.title}
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            {dict.Gallery.description}
                        </p>
                    </motion.div>
                </div>

                {/* 3x3 Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                    {gridImages.map((src, index) => (
                        <motion.div
                            key={`grid-${index}`}
                            className="relative h-80 rounded-3xl overflow-hidden shadow-xl group cursor-pointer border-4 border-white"
                            whileHover={{ y: -10, scale: 1.02 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => setSelectedImage(src)}
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <Maximize2 className="text-white w-6 h-6 ml-auto" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Premium Carousel Section */}
                {carouselImages.length > 0 && (
                    <div className="relative group/carousel">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-800">Explore More</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => scrollCarousel('left')}
                                    className="p-3 bg-white shadow-lg rounded-full hover:bg-brand-orange hover:text-white transition-all text-gray-600"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel('right')}
                                    className="p-3 bg-white shadow-lg rounded-full hover:bg-brand-orange hover:text-white transition-all text-gray-600"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={carouselRef}
                            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
                        >
                            {carouselImages.map((src, index) => (
                                <motion.div
                                    key={`carousel-${index}`}
                                    className="flex-none w-80 h-60 rounded-2xl overflow-hidden shadow-lg border-2 border-white snap-center cursor-pointer relative group"
                                    onClick={() => setSelectedImage(src)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery carousel image ${index + 1}`}
                                        fill
                                        className="object-cover object-center"
                                        sizes="320px"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Gallery Preview"
                                fill
                                className="object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                                quality={90}
                                sizes="100vw"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
