"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { locales, localeNames } from "@/lib/i18n";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Close dropdown when clicking outside
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
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <Globe className="mr-2 h-4 w-4 text-gray-500" />
                    {currentLang && (localeNames[currentLang as keyof typeof localeNames] || currentLang.toUpperCase())}
                    <ChevronDown className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1" role="none">
                        {locales.map((locale) => (
                            <Link
                                key={locale}
                                href={redirectedPathName(locale)}
                                className={`block px-4 py-2 text-sm ${currentLang === locale ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                    } hover:bg-gray-50`}
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center">
                                    <span className="mr-2">{locale.toUpperCase()}</span>
                                    {localeNames[locale]}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
