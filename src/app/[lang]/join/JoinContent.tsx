"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, ArrowRight } from "lucide-react";
import ApplicationForm from "@/components/ui/ApplicationForm";

export default function JoinContent({ lang, dict }: { lang: string, dict: any }) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <ApplicationForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                lang={lang}
                dict={dict}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                            {dict.Join.title} <span className="text-brand-orange">{dict.Join.team}</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                            {dict.Join.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Why Join Us Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: <Rocket className="w-8 h-8 text-brand-orange" />,
                            title: dict.Join.innovation_title,
                            desc: dict.Join.innovation_desc
                        },
                        {
                            icon: <Users className="w-8 h-8 text-brand-green" />,
                            title: dict.Join.global_title,
                            desc: dict.Join.global_desc
                        },
                        {
                            icon: <Briefcase className="w-8 h-8 text-blue-500" />,
                            title: dict.Join.growth_title,
                            desc: dict.Join.growth_desc
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                        >
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-4 uppercase">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Application Section */}
                <div className="bg-[#0A2A12] rounded-[3rem] p-12 text-white overflow-hidden relative">
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase">{dict.Join.ready_title}</h2>
                        <p className="text-lg opacity-80 mb-10 font-medium">
                            {dict.Join.ready_desc}
                        </p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-white hover:text-brand-orange transition-all flex items-center gap-3"
                        >
                            {dict.Join.apply_now} <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                    {/* Abstract Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full -mr-32 -mb-32 blur-3xl"></div>
                </div>
            </div>
        </main>
    );
}
