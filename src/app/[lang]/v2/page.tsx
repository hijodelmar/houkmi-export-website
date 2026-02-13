import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/v2/Hero";
import About from "@/components/v2/About";
import Products from "@/components/v2/Products";
import Contact from "@/components/v2/Contact";

export default async function HomeV2({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    // Await params as required in Next.js 15+
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <div className="flex flex-col gap-0 bg-white selection:bg-brand-green selection:text-white">
            <Hero lang={lang} dict={dict} />
            <About lang={lang} dict={dict} />
            <Products lang={lang} dict={dict} />
            <Contact lang={lang} dict={dict} />
        </div>
    );
}
