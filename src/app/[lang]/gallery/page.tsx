import { getDictionary } from "@/lib/dictionary";
import Gallery from "@/components/sections/Gallery";

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return <Gallery lang={lang} dict={dict} />;
}
