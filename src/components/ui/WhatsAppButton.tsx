"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface WhatsAppButtonProps {
    lang?: string;
}

export default function WhatsAppButton({ lang = "en" }: WhatsAppButtonProps) {
    // New Italian number for Wiliam
    const phoneNumber = "393482296062";
    
    // Localized message according to language
    const getGreeting = (l: string) => {
        switch (l) {
            case 'fr': return "Bonjour";
            case 'es': return "Hola";
            case 'it': return "Buongiorno";
            case 'de': return "Hallo";
            case 'ru': return "Здравствуйте";
            default: return "Hello";
        }
    };

    const message = getGreeting(lang);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>
            {/* Pulsing ring effect */}
            <div className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-[#25D366] rounded-full animate-ping opacity-20"></div>

            {/* Button */}
            <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-110 flex items-center justify-center group"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </Link>
        </>
    );
}
