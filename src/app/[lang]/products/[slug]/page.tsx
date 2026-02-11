import { getDictionary } from "@/lib/dictionary";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import ProductSchema from "@/components/seo/ProductSchema";

const baseUrl = "https://houkmiexport.com";

const productsData = {
    tomatoes: {
        id: "tomatoes",
        color: "#EF4444",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&q=80",
        descriptionKey: "tomatoes_description",
        featuresKey: "tomatoes_features",
        seo: {
            en: {
                title: "Tomato Exporter Morocco | Fresh Tomatoes Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium tomato exporter from Morocco. Wholesale supplier of fresh tomatoes to Europe & international markets. GlobalGAP certified. Reliable tomato export company with 35+ years experience.",
                keywords: "tomato exporter Morocco, fresh tomatoes supplier, wholesale tomatoes Morocco, tomato supplier Europe, Moroccan tomato export"
            },
            fr: {
                title: "Exportateur de Tomates Maroc | Fournisseur Grossiste Tomates Fraîches - HOUKMI EXPORT",
                description: "Exportateur premium de tomates du Maroc. Fournisseur grossiste de tomates fraîches pour l'Europe et marchés internationaux. Certifié GlobalGAP. 35+ ans d'expérience.",
                keywords: "fournisseur tomates Maroc, exportateur tomates Maroc, grossiste tomates, export tomates Europe"
            },
            de: {
                title: "Tomaten Export Marokko | Großhandel Frische Tomaten Lieferant - HOUKMI EXPORT",
                description: "Premium Tomaten-Exporteur aus Marokko. Großhandelslieferant für frische Tomaten nach Europa und internationale Märkte. GlobalGAP-zertifiziert. 35+ Jahre Erfahrung.",
                keywords: "Tomaten Export Marokko, Tomaten Großhändler, Tomaten Lieferant Europa"
            },
            it: {
                title: "Esportatore Pomodori Marocco | Fornitore Ingrosso Pomodori Freschi - HOUKMI EXPORT",
                description: "Esportatore premium di pomodori dal Marocco. Fornitore all'ingrosso di pomodori freschi per l'Europa e mercati internazionali. Certificato GlobalGAP. 35+ anni di esperienza.",
                keywords: "esportatore pomodori Marocco, fornitore pomodori freschi, grossista pomodori"
            },
            ru: {
                title: "Экспорт Томатов Марокко | Оптовый Поставщик Свежих Помидоров - HOUKMI EXPORT",
                description: "Премиум экспортер томатов из Марокко. Оптовый поставщик свежих помидоров в Европу и международные рынки. Сертификат GlobalGAP. 35+ лет опыта.",
                keywords: "экспорт томатов Марокко, поставщик помидоров, оптовые томаты Марокко"
            },
            es: {
                title: "Exportador de Tomates Marruecos | Proveedor Mayorista Tomates Frescos - HOUKMI EXPORT",
                description: "Exportador premium de tomates de Marruecos. Proveedor mayorista de tomates frescos para Europa y mercados internacionales. Certificado GlobalGAP. 35+ años de experiencia.",
                keywords: "exportador tomates Marruecos, proveedor tomates frescos, mayorista tomates"
            }
        }
    },
    oranges: {
        id: "oranges",
        color: "#F97316",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=1200&q=80",
        descriptionKey: "oranges_description",
        featuresKey: "oranges_features",
        seo: {
            en: {
                title: "Orange & Citrus Exporter Morocco | Fresh Citrus Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium citrus and orange exporter from Morocco. Wholesale supplier of fresh oranges and citrus fruits to Europe & international markets. GlobalGAP certified. 35+ years experience.",
                keywords: "orange exporter Morocco, citrus exporter Morocco, fresh oranges supplier, wholesale citrus Morocco, Moroccan citrus export"
            },
            fr: {
                title: "Exportateur Agrumes Maroc | Fournisseur Grossiste Oranges Fraîches - HOUKMI EXPORT",
                description: "Exportateur premium d'agrumes et oranges du Maroc. Fournisseur grossiste d'oranges et agrumes frais pour l'Europe. Certifié GlobalGAP. 35+ ans d'expérience.",
                keywords: "export agrumes Maroc, exportateur oranges Maroc, fournisseur agrumes, grossiste oranges"
            },
            de: {
                title: "Zitrusfrüchte Export Marokko | Orangen Großhandel Lieferant - HOUKMI EXPORT",
                description: "Premium Zitrusfrüchte und Orangen-Exporteur aus Marokko. Großhandelslieferant für frische Orangen und Zitrusfrüchte nach Europa. GlobalGAP-zertifiziert. 35+ Jahre Erfahrung.",
                keywords: "Zitrusfrüchte Export Marokko, Orangen Großhändler, Zitrus Lieferant Europa"
            },
            it: {
                title: "Esportatore Agrumi Marocco | Fornitore Ingrosso Arance Fresche - HOUKMI EXPORT",
                description: "Esportatore premium di agrumi e arance dal Marocco. Fornitore all'ingrosso di arance e agrumi freschi per l'Europa. Certificato GlobalGAP. 35+ anni di esperienza.",
                keywords: "esportatore agrumi Marocco, fornitore arance fresche, grossista agrumi"
            },
            ru: {
                title: "Экспорт Апельсинов Марокко | Оптовый Поставщик Цитрусовых - HOUKMI EXPORT",
                description: "Премиум экспортер цитрусовых и апельсинов из Марокко. Оптовый поставщик свежих апельсинов и цитрусовых в Европу. Сертификат GlobalGAP. 35+ лет опыта.",
                keywords: "экспорт апельсинов Марокко, поставщик цитрусовых, оптовые апельсины"
            },
            es: {
                title: "Exportador de Cítricos Marruecos | Proveedor Mayorista Naranjas Frescas - HOUKMI EXPORT",
                description: "Exportador premium de cítricos y naranjas de Marruecos. Proveedor mayorista de naranjas y cítricos frescos para Europa. Certificado GlobalGAP. 35+ años de experiencia.",
                keywords: "exportador cítricos Marruecos, proveedor naranjas frescas, mayorista cítricos"
            }
        }
    },
    peppers: {
        id: "peppers",
        color: "#22C55E",
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=1200&q=80",
        descriptionKey: "peppers_description",
        featuresKey: "peppers_features",
        seo: {
            en: {
                title: "Pepper Exporter Morocco | Fresh Bell Peppers Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium pepper exporter from Morocco. Wholesale supplier of fresh bell peppers and sweet peppers to Europe & international markets. GlobalGAP certified. 35+ years experience.",
                keywords: "pepper exporter Morocco, fresh peppers supplier, wholesale peppers Morocco, bell pepper supplier Europe"
            },
            fr: {
                title: "Exportateur Poivrons Maroc | Fournisseur Grossiste Poivrons Frais - HOUKMI EXPORT",
                description: "Exportateur premium de poivrons du Maroc. Fournisseur grossiste de poivrons frais pour l'Europe. Certifié GlobalGAP. 35+ ans d'expérience.",
                keywords: "exportateur poivrons Maroc, fournisseur poivrons frais, grossiste poivrons"
            },
            de: {
                title: "Paprika Export Marokko | Großhandel Frische Paprika Lieferant - HOUKMI EXPORT",
                description: "Premium Paprika-Exporteur aus Marokko. Großhandelslieferant für frische Paprika nach Europa. GlobalGAP-zertifiziert. 35+ Jahre Erfahrung.",
                keywords: "Paprika Export Marokko, Paprika Großhändler, Paprika Lieferant Europa"
            },
            it: {
                title: "Esportatore Peperoni Marocco | Fornitore Ingrosso Peperoni Freschi - HOUKMI EXPORT",
                description: "Esportatore premium di peperoni dal Marocco. Fornitore all'ingrosso di peperoni freschi per l'Europa. Certificato GlobalGAP. 35+ anni di esperienza.",
                keywords: "esportatore peperoni Marocco, fornitore peperoni freschi, grossista peperoni"
            },
            ru: {
                title: "Экспорт Перцев Марокко | Оптовый Поставщик Свежих Перцев - HOUKMI EXPORT",
                description: "Премиум экспортер перцев из Марокко. Оптовый поставщик свежих перцев в Европу. Сертификат GlobalGAP. 35+ лет опыта.",
                keywords: "экспорт перцев Марокко, поставщик перцев, оптовые перцы"
            },
            es: {
                title: "Exportador de Pimientos Marruecos | Proveedor Mayorista Pimientos Frescos - HOUKMI EXPORT",
                description: "Exportador premium de pimientos de Marruecos. Proveedor mayorista de pimientos frescos para Europa. Certificado GlobalGAP. 35+ años de experiencia.",
                keywords: "exportador pimientos Marruecos, proveedor pimientos frescos, mayorista pimientos"
            }
        }
    },
    watermelons: {
        id: "watermelons",
        color: "#EC4899",
        image: "/images/watermelon.jpg",
        descriptionKey: "watermelons_description",
        featuresKey: "watermelons_features",
        seo: {
            en: {
                title: "Watermelon Exporter Morocco | Fresh Watermelons Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium watermelon exporter from Morocco. Wholesale supplier of fresh watermelons to Europe & international markets. GlobalGAP certified. 35+ years experience.",
                keywords: "watermelon exporter Morocco, fresh watermelons supplier, wholesale watermelons Morocco, watermelon supplier Europe"
            },
            fr: {
                title: "Exportateur Pastèques Maroc | Fournisseur Grossiste Pastèques Fraîches - HOUKMI EXPORT",
                description: "Exportateur premium de pastèques du Maroc. Fournisseur grossiste de pastèques fraîches pour l'Europe. Certifié GlobalGAP. 35+ ans d'expérience.",
                keywords: "export pastèque Maroc, exportateur pastèques Maroc, fournisseur pastèques, grossiste pastèques"
            },
            de: {
                title: "Wassermelonen Export Marokko | Großhandel Frische Wassermelonen - HOUKMI EXPORT",
                description: "Premium Wassermelonen-Exporteur aus Marokko. Großhandelslieferant für frische Wassermelonen nach Europa. GlobalGAP-zertifiziert. 35+ Jahre Erfahrung.",
                keywords: "Wassermelonen Export Marokko, Wassermelonen Großhändler, Wassermelonen Lieferant"
            },
            it: {
                title: "Esportatore Angurie Marocco | Fornitore Ingrosso Angurie Fresche - HOUKMI EXPORT",
                description: "Esportatore premium di angurie dal Marocco. Fornitore all'ingrosso di angurie fresche per l'Europa. Certificato GlobalGAP. 35+ anni di esperienza.",
                keywords: "esportatore angurie Marocco, fornitore angurie fresche, grossista angurie"
            },
            ru: {
                title: "Экспорт Арбузов Марокко | Оптовый Поставщик Свежих Арбузов - HOUKMI EXPORT",
                description: "Премиум экспортер арбузов из Марокко. Оптовый поставщик свежих арбузов в Европу. Сертификат GlobalGAP. 35+ лет опыта.",
                keywords: "экспорт арбузов Марокко, поставщик арбузов, оптовые арбузы"
            },
            es: {
                title: "Exportador de Sandías Marruecos | Proveedor Mayorista Sandías Frescas - HOUKMI EXPORT",
                description: "Exportador premium de sandías de Marruecos. Proveedor mayorista de sandías frescas para Europa. Certificado GlobalGAP. 35+ años de experiencia.",
                keywords: "exportador sandías Marruecos, proveedor sandías frescas, mayorista sandías"
            }
        }
    },
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const product = productsData[slug as keyof typeof productsData];

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const productName = dict.Products[product.id as keyof typeof dict.Products];
    const seoData = product.seo[lang];

    // Generate language alternates for this product
    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
        languages[locale] = `${baseUrl}/${locale}/products/${slug}`;
    });

    return {
        title: seoData.title,
        description: seoData.description,
        keywords: seoData.keywords,
        alternates: {
            canonical: `${baseUrl}/${lang}/products/${slug}`,
            languages,
        },
        openGraph: {
            title: seoData.title,
            description: seoData.description,
            url: `${baseUrl}/${lang}/products/${slug}`,
            siteName: "HOUKMI EXPORT",
            locale: lang,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: seoData.title,
            description: seoData.description,
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
    };
}

export async function generateStaticParams() {
    const slugs = Object.keys(productsData);
    const langs = ["en", "es", "fr", "de", "it", "ru"];

    return langs.flatMap((lang) =>
        slugs.map((slug) => ({
            lang,
            slug,
        }))
    );
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru"; slug: string }>;
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);

    const product = productsData[slug as keyof typeof productsData];

    if (!product) {
        notFound();
    }

    const productName = dict.Products[product.id as keyof typeof dict.Products];
    const productDescription = (dict.ProductDetails as any)?.[product.descriptionKey] || "Premium quality produce from Morocco.";
    const productFeatures = (dict.ProductDetails as any)?.[product.featuresKey] || [];

    return (
        <>
            <ProductSchema
                lang={lang}
                productName={productName}
                productSlug={slug}
                description={productDescription}
                image={product.image}
            />
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50">
                {/* Hero Section */}
                <div className="relative h-[60vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-center">
                            {productName}
                        </h1>
                        <div
                            className="w-32 h-2 rounded-full"
                            style={{ backgroundColor: product.color }}
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link
                        href={`/${lang}/products`}
                        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {dict.Navigation?.back_to_products || "Back to Products"}
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Product Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={product.image}
                                alt={productName}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                {dict.ProductDetails?.about || "About"} {productName}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {productDescription}
                            </p>

                            {/* Features */}
                            {Array.isArray(productFeatures) && productFeatures.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        {dict.ProductDetails?.features || "Key Features"}
                                    </h3>
                                    <ul className="space-y-3">
                                        {productFeatures.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span
                                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                                    style={{ backgroundColor: product.color }}
                                                />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA */}
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-block text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
                                style={{ background: `linear-gradient(to right, ${product.color}, #26A69A)` }}
                            >
                                {dict.ProductDetails?.contact_us || "Contact Us for Orders"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
