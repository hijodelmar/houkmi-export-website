import { getDictionary } from "@/lib/dictionary";
import Contact from "@/components/sections/Contact";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return <Contact lang={lang} dict={dict} />;
}
