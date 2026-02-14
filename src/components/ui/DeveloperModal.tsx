"use client";

import { useState } from "react";
import { X, Mail, Phone, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DeveloperModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Using a more subtle button style for the trigger
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs text-gray-400 hover:text-brand-orange transition-colors flex items-center gap-1 mt-2 md:mt-0"
            >
                <Code className="w-3 h-3" />
                <span>Webmaster</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-brand-black to-gray-800 p-6 text-white relative">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Code className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <h3 className="text-xl font-bold">Developer Contact</h3>
                                </div>
                                <p className="text-white/70 text-sm">
                                    Looking for a professional website? Get in touch with the developer.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                <a
                                    href="mailto:hijodelmar22@gmail.com"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                                        <p className="font-medium text-gray-900">hijodelmar22@gmail.com</p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/34651180715"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp</p>
                                        <p className="font-medium text-gray-900">+34 651 180 715</p>
                                    </div>
                                </a>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                                <p className="text-xs text-gray-500">
                                    Available for freelance web development projects.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
