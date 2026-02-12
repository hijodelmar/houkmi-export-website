import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { locales, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SchemaOrg from "@/components/seo/SchemaOrg";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://houkmiexport.com";

// SEO-optimized metadata by language
const seoMetadata: Record<Locale, { title: string; description: string; keywords: string }> = {
    en: {
        title: "Fresh Fruit & Vegetable Exporter from Morocco | HOUKMI EXPORT - 35+ Years Experience",
        description: "Leading Moroccan fruit and vegetable exporter. Wholesale supplier of fresh tomatoes, citrus, peppers & watermelons to Europe & international markets. GlobalGAP certified. 35+ years experience.",
        keywords: "fresh fruit exporter Morocco, vegetable exporter Morocco, Moroccan fruit supplier, wholesale fruit supplier Morocco, tomato exporter Morocco, citrus exporter Morocco, fruit supplier Europe"
    },
    fr: {
        title: "Exportateur de Fruits et Légumes Frais du Maroc | HOUKMI EXPORT - 35+ Ans d'Expérience",
        description: "Exportateur marocain leader de fruits et légumes frais. Fournisseur grossiste de tomates, agrumes, poivrons et pastèques pour l'Europe. Certifié GlobalGAP. 35+ ans d'expérience.",
        keywords: "exportateur fruits Maroc, exportateur légumes Maroc, fournisseur fruits frais Maroc, grossiste fruits Maroc, export agrumes Maroc, fournisseur tomates Maroc, export pastèque Maroc"
    },
    de: {
        title: "Obst- und Gemüseexporteur aus Marokko | HOUKMI EXPORT - 35+ Jahre Erfahrung",
        description: "Führender marokkanischer Obst- und Gemüseexporteur. Großhandelslieferant für frische Tomaten, Zitrusfrüchte, Paprika und Wassermelonen nach Europa. GlobalGAP-zertifiziert. 35+ Jahre Erfahrung.",
        keywords: "Obstexporteur Marokko, Gemüseexporteur Marokko, Fruchtlieferant Marokko, Gemüse Großhändler Marokko, Tomaten Export Marokko, Zitrusfrüchte Export Marokko"
    },
    it: {
        title: "Esportatore di Frutta e Verdura Fresca dal Marocco | HOUKMI EXPORT - 35+ Anni di Esperienza",
        description: "Principale esportatore marocchino di frutta e verdura fresca. Fornitore all'ingrosso di pomodori, agrumi, peperoni e angurie per l'Europa. Certificato GlobalGAP. 35+ anni di esperienza.",
        keywords: "esportatore frutta Marocco, esportatore verdura Marocco, fornitore frutta fresca Marocco, esportazione ortaggi Marocco"
    },
    ru: {
        title: "Экспортер Свежих Фруктов и Овощей из Марокко | HOUKMI EXPORT - 35+ Лет Опыта",
        description: "Ведущий марокканский экспортер свежих фруктов и овощей. Оптовый поставщик томатов, цитрусовых, перцев и арбузов в Европу и международные рынки. Сертификат GlobalGAP. 35+ лет опыта.",
        keywords: "экспортер фруктов Марокко, экспортер овощей Марокко, поставщик фруктов Марокко, поставщик овощей Марокко, экспорт томатов Марокко, экспорт апельсинов Марокко"
    },
    es: {
        title: "Exportador de Frutas y Verduras Frescas de Marruecos | HOUKMI EXPORT - 35+ Años de Experiencia",
        description: "Exportador marroquí líder de frutas y verduras frescas. Proveedor mayorista de tomates, cítricos, pimientos y sandías para Europa. Certificado GlobalGAP. 35+ años de experiencia.",
        keywords: "exportador frutas Marruecos, exportador verduras Marruecos, proveedor frutas frescas Marruecos, mayorista frutas Marruecos"
    }
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
    const { lang } = await params;

    // Generate language alternates
    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
        languages[locale] = `${baseUrl}/${locale}`;
    });

    const metadata = seoMetadata[lang];

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages,
        },
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: `${baseUrl}/${lang}`,
            siteName: "HOUKMI EXPORT",
            locale: lang,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: metadata.title,
            description: metadata.description,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: [
                { url: '/images/pics/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
                { url: '/images/pics/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/images/pics/favicon_io/favicon.ico' },
            ],
            apple: [
                { url: '/images/pics/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            ],
            other: [
                {
                    rel: 'android-chrome-192x192',
                    url: '/images/pics/favicon_io/android-chrome-192x192.png',
                },
                {
                    rel: 'android-chrome-512x512',
                    url: '/images/pics/favicon_io/android-chrome-512x512.png',
                },
            ],
        },
        manifest: '/images/pics/favicon_io/site.webmanifest',
    };
}

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

// @ts-expect-error - Next.js 16 type inference issue with dynamic route params
export default async function RootLayout({ children, params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <SchemaOrg lang={lang} />
            </head>
            <body className="antialiased">
                <ConvexClientProvider>
                    <Navbar lang={lang} dict={dict} />
                    {children}
                    <Footer lang={lang} dict={dict} />
                    <WhatsAppButton />
                </ConvexClientProvider>
            </body>
        </html>
    );
}
