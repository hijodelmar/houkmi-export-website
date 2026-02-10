"use client";

import { motion } from "framer-motion";

export default function Gallery({ lang, dict }: { lang: string; dict: any }) {
    // Use a simple grid for now, masonry can be complex without a library like 'react-masonry-css'
    // or pure CSS columns.
    const images = [
        "https://images.unsplash.com/photo-1625246333195-bf480e68d18e?w=800&q=80", // Farm
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80", // Citrus crate
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&q=80", // Greenhouse
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80", // Market display
        "https://images.unsplash.com/photo-1601598851547-4302969ca066?w=800&q=80", // Export/Port
        "https://images.unsplash.com/photo-1596740926475-61e57c913532?w=800&q=80", // Holding tomatoes
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-brand-mint/5" id="gallery">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.Gallery.title}
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                            {dict.Gallery.description}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${src})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 to-brand-purple/0 group-hover:from-brand-orange/20 group-hover:to-brand-purple/20 transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
