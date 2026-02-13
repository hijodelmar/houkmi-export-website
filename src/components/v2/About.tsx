"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Truck } from "lucide-react";
import Image from "next/image";

export default function About({ lang, dict }: { lang: string; dict: any }) {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/5 skew-x-12 transform origin-top-right"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622383563227-2c522b19e2ce?q=80&w=2574&auto=format&fit=crop')" }} // Agricultural landscape
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                            {/* Float Card */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">GlobalGAP Certified</h4>
                                        <p className="text-sm text-gray-600">Meeting highest international standards</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative element behind */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-brand-green/30 rounded-[2.5rem]"></div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">About Houkmi Export</h4>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Cultivating Excellence <br />
                            <span className="text-brand-green">Since 1988</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Located in the heart of the Souss-Massa region in Agadir, we leverage the unique Atlantic micro-climate to grow superior quality produce. With over three decades of expertise, we bridge the gap between Moroccan soil and European markets.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: 'Premium Quality', desc: 'Strict quality control from seed to shipment.', icon: CheckCircle2, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                                { title: 'Efficient Logistics', desc: 'Fast delivery to Europe and Russia via road and sea.', icon: Truck, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <button className="text-brand-green font-bold text-lg hover:underline flex items-center gap-2 group">
                                Discover our history
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
