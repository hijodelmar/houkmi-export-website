import { getDictionary } from "@/lib/dictionary";
import JoinContent from "./JoinContent";

export default async function JoinPage({
    params,
}: {
    params: Promise<{ lang: "en" | "es" | "fr" | "de" | "it" | "ru" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return <JoinContent lang={lang} dict={dict} />;
}
