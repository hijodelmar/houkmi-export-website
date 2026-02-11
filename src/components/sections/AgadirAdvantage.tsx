"use client";

import { motion } from "framer-motion";
import { Sun, Wind, Calendar, MapPin, Thermometer } from "lucide-react";

export default function AgadirAdvantage({ lang, dict }: { lang: string; dict: any }) {
    if (!dict.Agadir) return null;

    const stats = [
        {
            icon: <Sun className="w-8 h-8 text-brand-orange" />,
            label: dict.Agadir.stats.sun,
            desc: dict.Agadir.climate_desc
        },
        {
            icon: <Thermometer className="w-8 h-8 text-brand-purple" />,
            label: dict.Agadir.stats.temp,
            desc: dict.Agadir.climate_title
        },
        {
            icon: <Wind className="w-8 h-8 text-brand-green" />,
            label: dict.Agadir.stats.advantage,
            desc: dict.Agadir.ocean_desc
        }
    ];

    const benefits = [
        {
            title: dict.Agadir.climate_title,
            description: dict.Agadir.climate_desc,
            icon: <Thermometer className="w-6 h-6" />
        },
        {
            title: dict.Agadir.ocean_title,
            description: dict.Agadir.ocean_desc,
            icon: <Wind className="w-6 h-6" />
        },
        {
            title: dict.Agadir.harvest_title,
            description: dict.Agadir.harvest_desc,
            icon: <Calendar className="w-6 h-6" />
        },
        {
            title: dict.Agadir.strategic_title,
            description: dict.Agadir.strategic_desc,
            icon: <MapPin className="w-6 h-6" />
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden" id="agadir-advantage">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20 animate-on-scroll">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.Agadir.title}
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
                            {dict.Agadir.description}
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] text-center border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(124,179,66,0.15)] transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="bg-white w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_10px_25px_rgba(0,0,0,0.05)] group-hover:scale-110 group-hover:rotate-3 transition-all">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">{stat.label}</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content with Image Overlay */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="text-3xl font-bold italic mb-2">"300+ Days of Pure Sunshine"</p>
                                <p className="text-white/80">Agadir Coastal Farms</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="bg-brand-green/10 p-3 rounded-xl text-brand-green flex-shrink-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
