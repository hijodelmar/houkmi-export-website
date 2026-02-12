"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
    dict: any;
}

export default function SearchModal({ isOpen, onClose, lang, dict }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Simple search logic through products
    const products = [
        { id: "tomatoes", name: dict.Products.tomatoes },
        { id: "oranges", name: dict.Products.oranges },
        { id: "peppers", name: dict.Products.peppers },
        { id: "watermelons", name: dict.Products.watermelons },
        { id: "calabacin", name: dict.Products.calabacin },
        { id: "cantaloupe", name: dict.Products.cantaloupe },
        { id: "melon", name: dict.Products.melon },
        { id: "alubias", name: dict.Products.alubias },
        { id: "judias", name: dict.Products.judias },
    ];

    const results = query.trim() === ""
        ? []
        : products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Search Input Area */}
                        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                            <Search className="w-6 h-6 text-brand-orange" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={lang === 'fr' ? "Rechercher un produit..." : "Search for a product..."}
                                className="flex-1 bg-transparent border-none outline-none text-xl font-medium text-gray-900 placeholder:text-gray-400"
                            />
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            {results.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Results</p>
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/${lang}/products/${product.id}`}
                                            onClick={onClose}
                                            className="group flex items-center justify-between p-4 hover:bg-brand-orange/5 rounded-2xl transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-brand-orange rounded-full" />
                                                </div>
                                                <span className="text-lg font-bold text-gray-800 group-hover:text-brand-orange transition-colors">
                                                    {product.name}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            ) : query.trim() !== "" ? (
                                <div className="p-10 text-center text-gray-500">
                                    <p className="font-medium">No results found for &quot;{query}&quot;</p>
                                </div>
                            ) : (
                                <div className="p-10 text-center text-gray-400">
                                    <p className="text-sm font-medium uppercase tracking-widest">Type to start searching...</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                <span><kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm mr-1">ESC</kbd> to close</span>
                            </div>
                            <Link
                                href={`/${lang}/products`}
                                onClick={onClose}
                                className="text-[10px] font-black text-brand-orange uppercase tracking-widest hover:underline"
                            >
                                View all products
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
