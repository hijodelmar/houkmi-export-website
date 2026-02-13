"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Products({ lang, dict, isFullPage = false }: { lang: string; dict: any, isFullPage?: boolean }) {
    const allProducts = [
        {
            id: "tomatoes",
            name: dict.Products.tomatoes,
            color: "#EF4444",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
        },
        {
            id: "oranges",
            name: dict.Products.oranges,
            color: "#F97316",
            image: "https://images.unsplash.com/photo-1547514701-42782101795e"
        },
        {
            id: "peppers",
            name: dict.Products.peppers,
            color: "#22C55E",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83"
        },
        {
            id: "watermelons",
            name: dict.Products.watermelons,
            color: "#EC4899",
            image: "/images/watermelon.jpg"
        },
        {
            id: "calabacin",
            name: dict.Products.calabacin,
            color: "#166534",
            image: "/images/calabacin.jpg"
        },
        {
            id: "cantaloupe",
            name: dict.Products.cantaloupe,
            color: "#F59E0B",
            image: "/images/catalupo.jpg"
        },
        {
            id: "melon",
            name: dict.Products.melon,
            color: "#FACC15",
            image: "/images/melon.jpg"
        },
        {
            id: "alubias",
            name: dict.Products.alubias,
            color: "#4ADE80",
            image: "/images/alubias.jpg"
        },
        {
            id: "judias",
            name: dict.Products.judias,
            color: "#65A30D",
            image: "/images/judias.jpg"
        }
    ];

    const displayedProducts = isFullPage ? allProducts : allProducts.slice(0, 4);

    return (
        <section className="py-20" style={{ background: 'linear-gradient(to bottom right, #ffffff, #f9fafb, #f0fdf4)' }} id="products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ background: 'linear-gradient(to right, #7CB342, #FF6F00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {dict.Products.title}
                        </h2>
                        <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #FF6F00, #FFD600)' }}></div>
                        {isFullPage && (
                            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                                Discover our full range of premium Moroccan produce, grown with expertise and exported with care.
                            </p>
                        )}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* Product Image */}
                            <div className="h-52 relative overflow-hidden bg-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                {/* Badge */}
                                <div
                                    className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                                    style={{ backgroundColor: product.color }}
                                >
                                    {product.name}
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-black px-2 py-1 rounded text-orange-600 shadow-sm uppercase tracking-tighter border border-orange-100 flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                    Atlantic Climate
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors">
                                    {product.name}
                                </h3>
                                <Link
                                    href={`/${lang}/products/${product.id}`}
                                    className="inline-flex items-center font-semibold text-sm hover:gap-2 gap-1 transition-all"
                                    style={{ color: '#FF6F00' }}
                                >
                                    {lang === 'es' ? 'Saber más' : 'Learn more'}
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!isFullPage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href={`/${lang}/products`}
                            className="inline-block text-white font-bold py-4 px-10 rounded-full hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
                            style={{ background: 'linear-gradient(to right, #7CB342, #26A69A)' }}
                        >
                            {dict.Products.view_all}
                        </Link>
                    </motion.div>
                )}

                {isFullPage && (
                    <div className="mt-20 flex flex-col items-center">
                        <Link
                            href={`/${lang}`}
                            className="text-gray-500 hover:text-brand-orange font-bold flex items-center gap-2 transition-all hover:-translate-x-2"
                        >
                            <span>←</span> Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}


