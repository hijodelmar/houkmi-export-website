"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";

export default function Products({ lang, dict }: { lang: string; dict: any }) {
    const products = [
        {
            id: "tomatoes",
            name: dict.Products.tomatoes,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
            color: "bg-red-500"
        },
        {
            id: "oranges",
            name: dict.Products.oranges,
            category: "Fruits",
            image: "https://images.unsplash.com/photo-1547514701-42782101795e",
            color: "bg-orange-500"
        },
        {
            id: "peppers",
            name: dict.Products.peppers,
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
            color: "bg-green-500"
        },
        {
            id: "watermelons",
            name: dict.Products.watermelons,
            category: "Fruits",
            image: "/images/watermelon.jpg",
            color: "bg-pink-500"
        },
        {
            id: "calabacin",
            name: dict.Products.calabacin,
            category: "Vegetables",
            image: "/images/calabacin.jpg",
            color: "bg-green-700"
        },
        {
            id: "cantaloupe",
            name: dict.Products.cantaloupe,
            category: "Fruits",
            image: "/images/catalupo.jpg",
            color: "bg-yellow-500"
        }
    ];

    return (
        <section id="products" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                            Our Harvest
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Fresh From <br />
                            The <span className="text-brand-green">Atlas Fields</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href={`/${lang}/products`}
                            className="group flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-brand-orange transition-colors"
                        >
                            View All Products
                            <span className="bg-gray-200 p-2 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-2">
                                            {product.category}
                                        </p>
                                        <h3 className="text-3xl font-black text-white mb-4">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-brand-orange group-hover:border-brand-orange transition-colors`}>
                                        <ArrowUpRight className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
