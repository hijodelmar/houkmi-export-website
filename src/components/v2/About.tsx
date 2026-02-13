"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Leaf, Package, Users, Globe2 } from "lucide-react";
import Image from "next/image";

export default function About({ lang, dict }: { lang: string; dict: any }) {
    const stats = [
        { label: "Experience", value: "15+", icon: <Award className="w-5 h-5" /> },
        { label: "Global Reach", value: "24+", icon: <Globe2 className="w-5 h-5" /> },
        { label: "Happy Clients", value: "500+", icon: <Users className="w-5 h-5" /> },
        { label: "Products", value: "12+", icon: <Package className="w-5 h-5" /> },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-orange/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                                alt="Our Farm"
                                width={800}
                                height={1000}
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                            {/* Floating Card */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                                <p className="text-white font-medium italic">
                                    "Committed to bringing the finest sustainable produce from the heart of Agadir to your doorstep."
                                </p>
                            </div>
                        </div>
                        {/* Decorative Frames */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 border-l-4 border-t-4 border-brand-green/30 rounded-tl-3xl" />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-4 border-b-4 border-brand-orange/30 rounded-br-3xl" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                                Our Legacy
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                                Cultivating <span className="text-brand-orange">Quality</span>, Exporting <span className="text-brand-green">Excellence</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Founded with a vision to connect Morocco's rich agricultural heritage with the global market,
                                Houkmi Export stands as a beacon of quality and reliability. We specialize in the
                                careful cultivation and international distribution of premium fruits and vegetables.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Sustainable Farming", desc: "Eco-friendly practices that respect the land." },
                                { title: "Global Logistics", desc: "Freshness preserved through every mile." },
                                { title: "Certified Quality", desc: "Exceeding international food safety standards." },
                                { title: "Direct Sourcing", desc: "No middlemen, ensures best value and quality." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="bg-brand-green/10 p-2 rounded-lg text-brand-green">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats Board */}
                        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl hover:bg-brand-green/5 transition-colors">
                                    <div className="flex justify-center text-brand-orange mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
