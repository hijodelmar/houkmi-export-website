import { Locale } from "@/lib/i18n";

interface ProductSchemaProps {
    lang: Locale;
    productName: string;
    productSlug: string;
    description: string;
    image: string;
}

export default function ProductSchema({
    lang,
    productName,
    productSlug,
    description,
    image
}: ProductSchemaProps) {
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "description": description,
        "image": image.startsWith('http') ? image : `https://houkmiexport.com${image}`,
        "brand": {
            "@type": "Brand",
            "name": "HOUKMI EXPORT"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "HOUKMI EXPORT",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Agadir",
                "addressCountry": "MA"
            }
        },
        "offers": {
            "@type": "AggregateOffer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "EUR",
            "seller": {
                "@type": "Organization",
                "name": "HOUKMI EXPORT"
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "EUR",
                "price": "Contact for pricing"
            }
        },
        "category": "Fresh Produce",
        "countryOfOrigin": {
            "@type": "Country",
            "name": "Morocco"
        }
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
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": `https://houkmiexport.com/${lang}/products`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": productName,
                "item": `https://houkmiexport.com/${lang}/products/${productSlug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema)
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
