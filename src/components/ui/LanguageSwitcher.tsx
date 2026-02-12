"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { locales, localeNames } from "@/lib/i18n";
import Image from "next/image";

const countryCodes: Record<string, string> = {
    en: "gb",
    es: "es",
    fr: "fr",
    de: "de",
    it: "it",
    ru: "ru",
};

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const redirectedPathName = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex items-center gap-2 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-wider group"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2">
                    <div className="relative w-4 h-3 overflow-hidden rounded-sm shadow-sm border border-white/20">
                        <img
                            src={`https://flagcdn.com/w40/${countryCodes[currentLang] || 'un'}.png`}
                            alt={currentLang}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span>{currentLang.toUpperCase()}</span>
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-44 rounded-xl shadow-2xl bg-white ring-1 ring-black/5 focus:outline-none z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="py-1">
                        {locales.map((locale) => (
                            <Link
                                key={locale}
                                href={redirectedPathName(locale)}
                                className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${currentLang === locale
                                        ? "bg-gray-50 text-brand-orange"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-brand-orange"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="relative w-5 h-3.5 overflow-hidden rounded-sm shadow-sm border border-gray-100">
                                    <img
                                        src={`https://flagcdn.com/w40/${countryCodes[locale]}.png`}
                                        alt={localeNames[locale]}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span>{localeNames[locale]}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
