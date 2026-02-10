"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

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
        <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                    {/* Logo - Large and prominent */}
                    <Link href={`/${lang}`} className="flex-shrink-0 group">
                        <Image
                            src="/images/logo2.png"
                            alt="HOUKMI EXPORT"
                            width={500}
                            height={150}
                            className="h-28 md:h-[135px] w-auto group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-3 py-2 text-sm font-semibold transition-all group"
                                style={{ color: '#2D2D2D' }}
                            >
                                {item.name}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                    style={{ background: 'linear-gradient(to right, #E8772A, #F5A623)' }}
                                ></span>
                            </Link>
                        ))}
                        <div className="ml-3">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                            style={{ color: '#2D2D2D' }}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-7 w-7" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-7 w-7" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors"
                                style={{ color: '#2D2D2D' }}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="px-3 py-3 border-t border-gray-200 mt-2 pt-3">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
