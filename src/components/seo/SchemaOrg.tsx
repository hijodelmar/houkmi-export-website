import { Locale } from "@/lib/i18n";

interface SchemaOrgProps {
    lang: Locale;
}

export default function SchemaOrg({ lang }: SchemaOrgProps) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HOUKMI EXPORT",
        "url": `https://houkmiexport.com/${lang}`,
        "logo": "https://houkmiexport.com/logo.png",
        "description": {
            en: "Leading Moroccan fruit and vegetable exporter with 35+ years of experience. Wholesale supplier to Europe and international markets.",
            fr: "Exportateur marocain leader de fruits et légumes avec 35+ ans d'expérience. Fournisseur grossiste pour l'Europe et les marchés internationaux.",
            de: "Führender marokkanischer Obst- und Gemüseexporteur mit 35+ Jahren Erfahrung. Großhandelslieferant für Europa und internationale Märkte.",
            it: "Principale esportatore marocchino di frutta e verdura con 35+ anni di esperienza. Fornitore all'ingrosso per l'Europa e i mercati internazionali.",
            ru: "Ведущий марокканский экспортер фруктов и овощей с опытом 35+ лет. Оптовый поставщик для Европы и международных рынков.",
            es: "Exportador marroquí líder de frutas y verduras con 35+ años de experiencia. Proveedor mayorista para Europa y mercados internacionales."
        }[lang],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Agadir",
            "addressCountry": "MA",
            "addressRegion": "Souss-Massa"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "availableLanguage": ["English", "French", "German", "Italian", "Russian", "Spanish", "Arabic"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/houkmi-export",
            "https://www.facebook.com/houkmiexport"
        ],
        "areaServed": [
            {
                "@type": "Country",
                "name": "France"
            },
            {
                "@type": "Country",
                "name": "Germany"
            },
            {
                "@type": "Country",
                "name": "Italy"
            },
            {
                "@type": "Country",
                "name": "Spain"
            },
            {
                "@type": "Country",
                "name": "Russia"
            },
            {
                "@type": "Country",
                "name": "Belgium"
            },
            {
                "@type": "Country",
                "name": "Netherlands"
            },
            {
                "@type": "Country",
                "name": "United Kingdom"
            }
        ],
        "knowsAbout": [
            "Fruit Export",
            "Vegetable Export",
            "Fresh Produce",
            "Agricultural Export",
            "Wholesale Distribution",
            "International Trade"
        ],
        "foundingDate": "1990",
        "slogan": {
            en: "Fresh Fruits & Vegetables from Morocco to the World",
            fr: "Fruits et Légumes Frais du Maroc vers le Monde",
            de: "Frisches Obst und Gemüse aus Marokko in die Welt",
            it: "Frutta e Verdura Fresca dal Marocco al Mondo",
            ru: "Свежие Фрукты и Овощи из Марокко в Мир",
            es: "Frutas y Verduras Frescas de Marruecos al Mundo"
        }[lang]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://houkmiexport.com/${lang}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
        </>
    );
}
