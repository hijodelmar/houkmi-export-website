import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HOUKMI EXPORT - Fresh Fruits & Vegetables from Morocco",
    description: "Exporting high-quality fresh produce from Agadir to the world. Tomatoes, Oranges, Peppers, and more.",
};

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
        <html lang={lang}>
            <body className={inter.className}>
                <Navbar lang={lang} dict={dict} />
                <main className="min-h-screen">
                    {children}
                </main>
                <WhatsAppButton />
                <Footer lang={lang} dict={dict} />
            </body>
        </html>
    );
}
