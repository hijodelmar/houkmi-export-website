import { getDictionary } from "@/lib/dictionary";
import Products from "@/components/sections/Products";

export default async function ProductsPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return <Products lang={lang} dict={dict} isFullPage={true} />;
}
