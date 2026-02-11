"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, Leaf, Users, Globe, Package } from "lucide-react";

export default function About({ lang, dict }: { lang: string; dict: any }) {
    const features = [
        { icon: <Award className="w-6 h-6" />, text: dict.About.experience, color: "linear-gradient(to bottom right, #FFD600, #FF6F00)" },
        { icon: <CheckCircle className="w-6 h-6" />, text: dict.About.quality, color: "linear-gradient(to bottom right, #7CB342, #26A69A)" },
        { icon: <Package className="w-6 h-6" />, text: dict.About.logistics, color: "linear-gradient(to bottom right, #AB47BC, #FF5252)" },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-brand-mint/5" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('/images/ahmed.JPG')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <p className="font-bold text-lg text-center">{dict.About.imageCaption}</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.About.title}
                        </h2>
                        <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <Award className="text-brand-orange" /> {dict.About.subtitle}
                        </h3>

                        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                            {dict.About.description}
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {dict.About.sub_description}
                        </p>

                        <div className="bg-brand-mint/10 p-6 rounded-2xl border border-brand-mint/20 mb-8 relative">
                            <Leaf className="absolute top-4 right-4 text-brand-mint/40 w-8 h-8" />
                            <p className="text-lg text-gray-800 font-medium leading-relaxed italic">
                                "{dict.About.mission}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5 }}
                                    className="flex flex-col items-center text-center p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                                    style={{ background: item.color }}
                                >
                                    <div className="text-white mb-2">
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-white text-sm">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
