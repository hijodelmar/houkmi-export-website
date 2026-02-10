import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { locales, type Locale } from "@/lib/i18n";
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
    params: Promise<{ lang: Locale }>;
}>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased">
                <Navbar lang={lang} dict={dict} />
                {children}
                <Footer lang={lang} dict={dict} />
                <WhatsAppButton />
            </body>
        </html>
    );
}
