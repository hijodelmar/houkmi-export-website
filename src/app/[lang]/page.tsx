import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Contact from "@/components/sections/Contact";

import Gallery from "@/components/sections/Gallery";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <div className="flex flex-col gap-0">
            <Hero lang={lang} dict={dict} />
            <About lang={lang} dict={dict} />
            <Products lang={lang} dict={dict} />
            <Gallery lang={lang} dict={dict} />
            <Contact lang={lang} dict={dict} />
        </div>
    );
}
