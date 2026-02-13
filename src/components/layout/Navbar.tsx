"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import SearchModal from "@/components/ui/SearchModal";

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: dict.Navbar?.home || 'Home', href: `/${lang}` },
        { name: dict.Navbar?.about || 'About us', href: `/${lang}#about` },
        { name: dict.Navbar?.products || 'Products', href: `/${lang}/products` },
        { name: dict.Navbar?.gallery || 'Gallery', href: `/${lang}#gallery` },
        { name: dict.Navbar?.contact || 'Contact', href: `/${lang}#contact` },
    ];

    return (
        <>
            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                lang={lang}
                dict={dict}
            />

            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center group">
                            <Link href={`/${lang}`} className="relative transition-transform duration-300 group-hover:scale-105">
                                <Logo height={scrolled ? 45 : 55} />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`group relative py-2 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}
                                >
                                    <span className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300 block">
                                        {link.name}
                                    </span>

                                    {/* Designer Underline Effect */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-green to-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></span>

                                    {/* Subtle Glow */}
                                    <span className="absolute inset-x-0 -bottom-2 h-4 bg-brand-orange/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 rounded-full"></span>
                                </Link>
                            ))}

                            <div className="flex items-center space-x-6 pl-6 border-l border-gray-200/20">
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                <LanguageSwitcher currentLang={lang} />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button onClick={() => setSearchOpen(true)} className={scrolled ? 'text-gray-900' : 'text-white'}>
                                <Search className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`p-2 transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}
                            >
                                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full pt-24 px-8 space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-black uppercase tracking-tighter text-gray-900 hover:text-brand-orange transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-8 border-t border-gray-100">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
