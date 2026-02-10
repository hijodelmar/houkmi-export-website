"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Products({ lang, dict }: { lang: string; dict: any }) {
    const products = [
        {
            id: "tomatoes",
            name: dict.Products.tomatoes,
            gradient: "from-red-400 to-red-600",
            bgColor: "bg-red-50",
            badge: "Fresh",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80"
        },
        {
            id: "oranges",
            name: dict.Products.oranges,
            gradient: "from-orange-400 to-orange-600",
            bgColor: "bg-orange-50",
            badge: "Sweet",
            image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5a?w=800&q=80"
        },
        {
            id: "peppers",
            name: dict.Products.peppers,
            gradient: "from-green-400 to-green-600",
            bgColor: "bg-green-50",
            badge: "Crisp",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80"
        },
        {
            id: "watermelons",
            name: dict.Products.watermelons,
            gradient: "from-pink-400 to-red-500",
            bgColor: "bg-pink-50",
            badge: "Juicy",
            image: "https://images.unsplash.com/photo-1587049352846-4a222e784587?w=800&q=80"
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-brand-green/5" id="products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.Products.title}
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* Image Container with Gradient Overlay */}
                            <div className={`h-52 ${product.bgColor} relative overflow-hidden flex items-center justify-center`}>
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                <span className="text-gray-400 text-sm z-10">Product Image</span>
                                {/* <Image src={product.image} alt={product.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" /> */}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-orange transition-colors">
                                    {product.name}
                                </h3>
                                <Link
                                    href={`/${lang}/products`}
                                    className="inline-flex items-center text-brand-orange font-semibold text-sm hover:text-brand-orange-dark group-hover:gap-2 gap-1 transition-all"
                                >
                                    Learn more
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </Link>
                            </div>

                            {/* Colorful glow effect on hover */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`}></div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href={`/${lang}/products`}
                        className="inline-block bg-gradient-to-r from-brand-green to-brand-mint text-white font-bold py-4 px-10 rounded-full hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
                    >
                        {dict.Products.view_all}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
