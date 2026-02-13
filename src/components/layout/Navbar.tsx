"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import SearchModal from "@/components/ui/SearchModal";

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigation = [
        { name: dict.Navbar?.home || 'Home', href: `/${lang}` },
        { name: dict.Navbar?.about || 'About us', href: `/${lang}#about` },
        { name: dict.Navbar?.products || 'Products', href: `/${lang}/products` },
        { name: dict.Navbar?.gallery || 'Gallery', href: `/${lang}#gallery` },
        { name: dict.Navbar?.contact || 'Contact', href: `/${lang}#contact` },
    ];

    return (
        <header className="sticky top-0 z-50 w-full font-sans">
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                lang={lang}
                dict={dict}
            />
            {/* Top Bar - Restored functionality */}
            <div className="bg-[#0A2A12] text-white py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
                    <Link href={`/${lang}/join`} className="hover:text-brand-orange transition-colors">
                        {lang === 'fr' ? 'NOUS REJOINDRE' : 'JOIN US'}
                    </Link>
                    <Link href={`/${lang}#contact`} className="hover:text-brand-orange transition-colors">
                        {lang === 'fr' ? 'NOUS CONTACTER' : 'CONTACT US'}
                    </Link>
                    <div className="border-l border-white/20 pl-6 h-4 flex items-center">
                        <LanguageSwitcher currentLang={lang} />
                    </div>
                </div>
            </div>

            {/* Main Navbar - Restored Layout */}
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        {/* Logo on the left */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={`/${lang}`}>
                                <Logo className="h-[65px] w-auto" showText={true} />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group relative py-2 text-xs font-black uppercase tracking-[0.2em] text-[#333] hover:text-[#0A2A12] transition-colors"
                                >
                                    {item.name}
                                    {/* Kept the subtle underline effect but simpler */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                                </Link>
                            ))}

                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="bg-[#FF6F00] p-4 text-white hover:bg-[#e66400] transition-colors ml-4 mr-[-2rem] h-24 flex items-center justify-center w-16 shadow-md"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-600 hover:text-brand-green transition-colors"
                            >
                                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg absolute w-full left-0">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-[#333] font-bold text-sm uppercase tracking-widest hover:text-brand-orange py-2 border-b border-gray-50 last:border-0"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsOpen(false); }}
                            className="flex items-center gap-2 text-[#FF6F00] font-bold text-sm uppercase tracking-widest py-2"
                        >
                            <Search className="w-4 h-4" /> {lang === 'fr' ? 'Rechercher' : 'Search'}
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}
