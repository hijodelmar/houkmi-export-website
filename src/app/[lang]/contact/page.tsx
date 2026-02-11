import { getDictionary } from "@/lib/dictionary";
import Contact from "@/components/sections/Contact";

export default async function ContactPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { lang } = await params;
    const { product } = await searchParams;
    const dict = await getDictionary(lang);

    // Normalize product param to match select values if possible
    // tomatoes -> Tomatoes, oranges -> Citrus, peppers -> Peppers, watermelons -> Watermelon
    const productKey = typeof product === 'string' ? product : undefined;
    let initialProduct = "Tomatoes"; // Default

    if (productKey === 'tomatoes') initialProduct = "Tomatoes";
    else if (productKey === 'oranges') initialProduct = "Citrus";
    else if (productKey === 'peppers') initialProduct = "Peppers";
    else if (productKey === 'watermelons') initialProduct = "Watermelon";

    return <Contact lang={lang} dict={dict} initialProduct={initialProduct} />;
}
