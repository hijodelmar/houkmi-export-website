import { getDictionary } from "@/lib/dictionary";
import About from "@/components/sections/About";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return <About lang={lang} dict={dict} />;
}
