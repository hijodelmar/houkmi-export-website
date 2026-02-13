import { getDictionary } from "@/lib/dictionary";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import ProductSchema from "@/components/seo/ProductSchema";
import Image from "next/image";

const baseUrl = "https://houkmiexport.com";

const productsData = {
    tomatoes: {
        id: "tomatoes",
        color: "#EF4444",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&q=80",
        descriptionKey: "tomatoes_description",
        featuresKey: "tomatoes_features",
        specsKey: "tomatoes_specs",
        climateKey: "tomatoes_climate",
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
        specsKey: "oranges_specs",
        climateKey: "oranges_climate",
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
        specsKey: "peppers_specs",
        climateKey: "peppers_climate",
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
        specsKey: "watermelons_specs",
        climateKey: "watermelon_climate",
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
    calabacin: {
        id: "calabacin",
        color: "#166534",
        image: "/images/calabacin.jpg",
        descriptionKey: "calabacin_description",
        featuresKey: "calabacin_features",
        specsKey: "calabacin_specs",
        climateKey: "zucchini_climate",
        seo: {
            en: {
                title: "Zucchini Exporter Morocco | Fresh Zucchini Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium zucchini exporter from Morocco. Wholesale supplier of fresh zucchini to Europe & international markets.",
                keywords: "zucchini exporter Morocco, fresh zucchini supplier, wholesale zucchini Morocco"
            },
            es: {
                title: "Exportador de Calabacín Marruecos | Proveedor Mayorista de Calabacines - HOUKMI EXPORT",
                description: "Exportador premium de calabacín de Marruecos. Proveedor mayorista de calabacines frescos para Europa.",
                keywords: "exportador calabacín Marruecos, proveedor calabacín fresco, mayorista calabacín"
            },
            fr: {
                title: "Exportateur de Courgettes Maroc | Fournisseur Grossiste Courgettes - HOUKMI EXPORT",
                description: "Exportateur premium de courgettes du Maroc. Fournisseur grossiste de courgettes fraîches pour l'Europe.",
                keywords: "exportateur courgettes Maroc, fournisseur courgettes frais, grossiste courgettes"
            },
            de: { title: "Zucchini Export Marokko", description: "Premium Zucchini Export Marokko", keywords: "zucchini export" },
            it: { title: "Esportatore Zucchine Marocco", description: "Esportatore Zucchine Marocco", keywords: "zucchine export" },
            ru: { title: "Экспорт Кабачков Марокко", description: "Экспорт Кабачков Марокко", keywords: "экспорт кабачков" }
        }
    },
    cantaloupe: {
        id: "cantaloupe",
        color: "#F59E0B",
        image: "/images/catalupo.jpg",
        descriptionKey: "cantaloupe_description",
        featuresKey: "cantaloupe_features",
        specsKey: "cantaloupe_specs",
        climateKey: "melon_climate",
        seo: {
            en: {
                title: "Cantaloupe Exporter Morocco | Fresh Cantaloupe Melon Supplier - HOUKMI EXPORT",
                description: "Premium Cantaloupe exporter from Morocco. Wholesale supplier of fresh melons to Europe.",
                keywords: "cantaloupe exporter Morocco, fresh cantaloupe supplier, wholesale melons"
            },
            es: {
                title: "Exportador de Cantalupo Marruecos | Proveedor de Melones Cantaloupe - HOUKMI EXPORT",
                description: "Exportador premium de melón cantalupo de Marruecos. Proveedor mayorista para Europa.",
                keywords: "exportador cantalupo Marruecos, proveedor melón cantaloupe, mayorista melones"
            },
            fr: {
                title: "Exportateur de Cantaloup Maroc | Fournisseur Grossiste Melons - HOUKMI EXPORT",
                description: "Exportateur premium de melons cantaloup du Maroc. Fournisseur grossiste pour l'Europe.",
                keywords: "exportateur cantaloup Maroc, fournisseur melons frais, grossiste melons"
            },
            de: { title: "Cantaloupe Melonen Export Marokko", description: "Cantaloupe Melonen Export Marokko", keywords: "cantaloupe export" },
            it: { title: "Esportatore Meloni Cantalupo Marocco", description: "Esportatore Meloni Cantalupo Marocco", keywords: "cantalupo export" },
            ru: { title: "Экспорт Дыни Канталупа Марокко", description: "Экспорт Дыни Канталупа Марокко", keywords: "экспорт дыни" }
        }
    },
    melon: {
        id: "melon",
        color: "#FACC15",
        image: "/images/melon.jpg",
        descriptionKey: "melon_description",
        featuresKey: "melon_features",
        specsKey: "melon_specs",
        climateKey: "melon_climate",
        seo: {
            en: {
                title: "Yellow Melon Exporter Morocco | Fresh Melons Wholesale Supplier - HOUKMI EXPORT",
                description: "Premium yellow melon exporter from Morocco. Wholesale supplier of fresh sweet melons to international markets.",
                keywords: "melon exporter Morocco, fresh yellow melon supplier, wholesale melons Morocco"
            },
            es: {
                title: "Exportador de Melón Amarillo Marruecos | Proveedor Mayorista de Melones - HOUKMI EXPORT",
                description: "Exportador premium de melón amarillo de Marruecos. Proveedor mayorista de melones frescos.",
                keywords: "exportador melón amarillo Marruecos, proveedor melones frescos, mayorista melones"
            },
            fr: {
                title: "Exportateur de Melon Jaune Maroc | Fournisseur Grossiste Melons - HOUKMI EXPORT",
                description: "Exportateur premium de melons jaunes du Maroc. Fournisseur grossiste de melons frais.",
                keywords: "exportateur melon jaune Maroc, fournisseur melons frais, grossiste melons"
            },
            de: { title: "Gelbe Melonen Export Marokko", description: "Gelbe Melonen Export Marokko", keywords: "melonen export" },
            it: { title: "Esportatore Meloni Gialli Marocco", description: "Esportatore Meloni Gialli Marocco", keywords: "meloni export" },
            ru: { title: "Экспорт Желтой Дыни Марокко", description: "Экспорт Желтой Дыни Марокко", keywords: "экспорт дыни" }
        }
    },
    alubias: {
        id: "alubias",
        color: "#4ADE80",
        image: "/images/alubias.jpg",
        descriptionKey: "alubias_description",
        featuresKey: "alubias_features",
        specsKey: "alubias_specs",
        climateKey: "green_beans_climate",
        seo: {
            en: {
                title: "Flat Bean Exporter Morocco | Fresh Flat Green Beans Supplier - HOUKMI EXPORT",
                description: "Premium flat green bean exporter from Morocco. Wholesale supplier of fresh beans (Alubias) to Europe.",
                keywords: "flat bean exporter Morocco, fresh alubias supplier, wholesale green beans"
            },
            es: {
                title: "Exportador de Alubias Marruecos | Proveedor de Judías Verdes Planas - HOUKMI EXPORT",
                description: "Exportador premium de alubias verdes de Marruecos. Proveedor mayorista de judías planas.",
                keywords: "exportador alubias Marruecos, proveedor judías planas, mayorista alubias"
            },
            fr: {
                title: "Exportateur de Haricots Plats Maroc | Fournisseur Haricots Verts - HOUKMI EXPORT",
                description: "Exportateur premium de haricots plats (Alubias) du Maroc. Fournisseur grossiste pour l'Europe.",
                keywords: "exportateur haricots plats Maroc, fournisseur haricots verts, grossiste haricots"
            },
            de: { title: "Flache Bohnen Export Marokko", description: "Flache Bohnen Export Marokko", keywords: "bohnen export" },
            it: { title: "Esportatore Fagioli Piatti Marocco", description: "Esportatore Fagioli Piatti Marocco", keywords: "fagioli export" },
            ru: { title: "Экспорт Плоской Фасоли Марокко", description: "Экспорт Плоской Фасоли Марокко", keywords: "экспорт фасоли" }
        }
    },
    judias: {
        id: "judias",
        color: "#65A30D",
        image: "/images/judias.jpg",
        descriptionKey: "judias_description",
        featuresKey: "judias_features",
        specsKey: "judias_specs",
        climateKey: "green_beans_climate",
        seo: {
            en: {
                title: "Green Bean Exporter Morocco | Fresh Fine Green Beans Supplier - HOUKMI EXPORT",
                description: "Premium fine green bean exporter from Morocco. Wholesale supplier of fresh judías to Europe & international markets.",
                keywords: "green bean exporter Morocco, fresh judias supplier, wholesale fine green beans"
            },
            es: {
                title: "Exportador de Judías Verdes Marruecos | Proveedor de Judías Finas - HOUKMI EXPORT",
                description: "Exportador premium de judías verdes de Marruecos. Proveedor mayorista de judías finas para Europa.",
                keywords: "exportador judías verdes Marruecos, proveedor judías finas, mayorista judías"
            },
            fr: {
                title: "Exportateur de Haricots Verts Maroc | Fournisseur Haricots Fins - HOUKMI EXPORT",
                description: "Exportateur premium de haricots verts fins (Judías) du Maroc. Fournisseur grossiste pour l'Europe.",
                keywords: "exportateur haricots verts Maroc, fournisseur haricots fins, grossiste haricots"
            },
            de: { title: "Grüne Bohnen Export Marokko", description: "Grüne Bohnen Export Marokko", keywords: "bohnen export" },
            it: { title: "Esportatore Fagioli Verdi Marocco", description: "Esportatore Fagioli Verdi Marocco", keywords: "fagioli export" },
            ru: { title: "Экспорт Зеленой Фасоли Марокко", description: "Экспорт Зеленой Фасоли Марокко", keywords: "экспорт фасоли" }
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
    const productSpecs = (dict.ProductDetails as any)?.[(product as any).specsKey];
    const specLabels = {
        varieties: (dict.ProductDetails as any)?.varieties_label || "Varieties",
        calendar: (dict.ProductDetails as any)?.calendar_label || "Calendar",
        packaging: (dict.ProductDetails as any)?.packaging_label || "Packaging",
        calibration: (dict.ProductDetails as any)?.calibration_label || "Calibration",
        title: (dict.ProductDetails as any)?.specs_title || "Technical Specs"
    };

    const climateAdvantage = (dict.ProductDetails as any)?.[(product as any).climateKey];
    const climateTitle = (dict.ProductDetails as any)?.climate_advantage_title || "Why Agadir Climate Enhances This Product";
    const trustTitle = (dict.ProductDetails as any)?.trust_title || "Reliable Export Experience";
    const trustDescription = (dict.ProductDetails as any)?.trust_description || "With over 35 years of experience, HOUKMI EXPORT guarantees a reliable harvest calendar, timely logistics, and consistent supply capacity.";

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
                    <Image
                        src={product.image}
                        alt={productName}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
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
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square">
                            <Image
                                src={product.image}
                                alt={productName}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
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

                            {/* Technical Specs */}
                            {productSpecs && (
                                <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                        {specLabels.title}
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <span className="font-semibold text-gray-700">{specLabels.varieties}:</span>
                                            <span className="text-gray-600">{productSpecs.varieties}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <span className="font-semibold text-gray-700">{specLabels.calendar}:</span>
                                            <span className="text-gray-600">{productSpecs.calendar}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <span className="font-semibold text-gray-700">{specLabels.packaging}:</span>
                                            <span className="text-gray-600">{productSpecs.packaging}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <span className="font-semibold text-gray-700">{specLabels.calibration}:</span>
                                            <span className="text-gray-600">{productSpecs.calibration}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <Link
                                href={`/${lang}/contact?product=${product.id}`}
                                className="inline-block text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
                                style={{ background: `linear-gradient(to right, ${product.color}, #26A69A)` }}
                            >
                                {dict.ProductDetails?.contact_us || "Contact Us for Orders"}
                            </Link>

                            {/* Agadir Climate Advantage Section */}
                            {climateAdvantage && (
                                <div className="mt-12 p-8 bg-gradient-to-br from-orange-50 to-green-50 rounded-3xl border border-orange-100/50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <div className="w-24 h-24 bg-brand-orange rounded-full blur-2xl" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                                {climateTitle}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {climateAdvantage}
                                        </p>
                                        <div className="mt-4 flex gap-4 text-xs font-bold text-brand-green/80 uppercase tracking-widest">
                                            <span>300+ Days Sun</span>
                                            <span>•</span>
                                            <span>21°C Average</span>
                                            <span>•</span>
                                            <span>Atlantic Breeze</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Experience & Trust Section */}
                            <div className="mt-8 p-8 bg-gray-900 rounded-3xl text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-3 text-brand-orange">
                                    {trustTitle}
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    {trustDescription}
                                </p>
                                <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-brand-orange">35+</div>
                                        <div className="text-[10px] uppercase tracking-tighter text-gray-400">Years Exp</div>
                                    </div>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-brand-green">100%</div>
                                        <div className="text-[10px] uppercase tracking-tighter text-gray-400">Reliable</div>
                                    </div>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-brand-purple">Global</div>
                                        <div className="text-[10px] uppercase tracking-tighter text-gray-400">Reach</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
