"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface LegalPageProps {
    lang: string;
    title: string;
    backLabel?: string;
    lastUpdated?: string;
    lastUpdatedLabel?: string;
    children: React.ReactNode;
}

export default function LegalPageLayout({ lang, title, backLabel, lastUpdated, lastUpdatedLabel, children }: LegalPageProps) {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href={`/${lang}`}
                    className="inline-flex items-center text-brand-orange font-bold mb-8 hover:gap-2 transition-all gap-1"
                >
                    <ChevronLeft size={20} /> {backLabel || "Back to Home"}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-gray-100"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                        {title}
                    </h1>

                    {lastUpdated && (
                        <p className="text-gray-400 text-sm mb-12 font-medium uppercase tracking-widest">
                            {lastUpdatedLabel || "Last Updated"}: {lastUpdated}
                        </p>
                    )}

                    <div className="prose prose-lg prose-gray max-w-none 
                        prose-headings:text-gray-900 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-gray-900 prose-strong:font-bold
                        prose-ul:list-disc prose-ul:pl-6
                    ">
                        {children}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
