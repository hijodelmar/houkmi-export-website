"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, Leaf, Users, Globe } from "lucide-react";

export default function About({ lang, dict }: { lang: string; dict: any }) {
    const features = [
        { icon: <Award className="w-6 h-6" />, text: dict.About.experience, color: "linear-gradient(to bottom right, #FFD600, #FF6F00)" },
        { icon: <Leaf className="w-6 h-6" />, text: dict.About.farming, color: "linear-gradient(to bottom right, #7CB342, #26A69A)" },
        { icon: <Globe className="w-6 h-6" />, text: dict.About.globalReach, color: "linear-gradient(to bottom right, #AB47BC, #FF5252)" },
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
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-bf480e68d18e?w=800&q=80')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="font-bold text-lg">Detailed care in every harvest</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.About.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {dict.About.description}
                        </p>
                        <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                            {dict.About.mission}
                        </p>

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
