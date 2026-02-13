import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

const AgadirAdvantage = dynamic(() => import("@/components/sections/AgadirAdvantage"));
const Products = dynamic(() => import("@/components/sections/Products"));
const Gallery = dynamic(() => import("@/components/sections/Gallery"));
const Reviews = dynamic(() => import("@/components/sections/Reviews"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
            <About dict={dict} />
            <AgadirAdvantage lang={lang} dict={dict} />
            <Products lang={lang} dict={dict} />
            <Gallery lang={lang} dict={dict} />
            <Reviews lang={lang} dict={dict} />
            <Contact lang={lang} dict={dict} />
        </div>
    );
}
