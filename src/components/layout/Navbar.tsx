"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        <nav className="glass sticky top-0 z-50 border-b border-gray-200/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <Link href={`/${lang}`} className="flex items-center gap-2 group">
                                <Logo className="h-12 w-auto group-hover:scale-105 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative text-gray-700 hover:text-brand-orange px-3 py-2 rounded-md text-sm font-semibold transition-all group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-orange to-brand-yellow group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                        <div className="ml-4">
                            <LanguageSwitcher currentLang={lang} />
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-green"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-brand-green block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
