"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Products({ lang, dict }: { lang: string; dict: any }) {
    const products = [
        {
            id: "tomatoes",
            name: "Tomatoes",
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
            color: "bg-red-500"
        },
        {
            id: "citrus",
            name: "Citrus",
            category: "Fruits",
            image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80",
            color: "bg-orange-500"
        },
        {
            id: "peppers",
            name: "Peppers",
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80",
            color: "bg-green-500"
        },
        {
            id: "watermelons",
            name: "Watermelons",
            category: "Fruits",
            image: "https://images.unsplash.com/photo-1587049352846-4a222e784587?w=800&q=80",
            color: "bg-rose-500"
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-brand-green font-bold uppercase tracking-widest text-sm mb-2">Our Harvest</h4>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Premium Produce</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href={`/${lang}/products`}
                            className="hidden md:flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all font-semibold text-gray-700"
                        >
                            View Full Catalog
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${product.image}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                            {/* Glass Content Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider">{product.category}</span>
                                        <div className={`w-2 h-2 rounded-full ${product.color}`}></div>
                                    </div>
                                    <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100">
                                        <p className="text-white/80 text-sm mt-2">Export ready • High Quality</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href={`/${lang}/products`}
                        className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                        View Full Catalog
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
