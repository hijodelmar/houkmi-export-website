"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Globe } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: dict.Navigation.home, href: `/${lang}` },
        { name: dict.Navigation.about, href: `/${lang}/about` },
        { name: dict.Navigation.products, href: `/${lang}/products` },
        { name: dict.Navigation.gallery, href: `/${lang}/gallery` },
        { name: dict.Navigation.contact, href: `/${lang}/contact` },
    ];

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Bar */}
            <div className="bg-[#0A2A12] text-white py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
                    <Link href={`/${lang}/join`} className="hover:text-brand-orange transition-colors">
                        {lang === 'fr' ? 'NOUS REJOINDRE' : 'JOIN US'}
                    </Link>
                    <Link href={`/${lang}/contact`} className="hover:text-brand-orange transition-colors">
                        {lang === 'fr' ? 'NOUS CONTACTER' : 'CONTACT US'}
                    </Link>
                    <div className="flex items-center gap-1 border-l border-white/20 pl-6 cursor-pointer hover:text-brand-orange transition-colors">
                        <Globe className="w-3 h-3" />
                        <span className="flex items-center gap-1">
                            {lang.toUpperCase()} <span className="text-[8px]">▼</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        {/* Logo on the left */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={`/${lang}`}>
                                <Logo className="h-20 w-auto" showText={true} />
                            </Link>
                        </div>

                        {/* Navigation Links and Search */}
                        <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-[#333] hover:text-[#0A2A12] text-xs font-black uppercase tracking-widest transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Search Button */}
                            <button className="bg-[#FF6F00] p-4 text-white hover:bg-[#e66400] transition-colors ml-4 mr-[-2rem] h-24 flex items-center justify-center w-16">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-600"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-[#333] font-bold text-sm uppercase tracking-widest"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
