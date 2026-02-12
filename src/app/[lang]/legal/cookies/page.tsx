import { getDictionary } from "@/lib/dictionary";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Locale } from "@/lib/i18n";

export default async function CookiesPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.Legal?.cookies_content;
    const lastUpdatedLabel = dict.Legal?.last_updated;

    return (
        <LegalPageLayout
            lang={lang}
            title={dict.Legal?.cookies_title || "Politique des Cookies"}
            backLabel={dict.Navigation.home}
            lastUpdated="2024-02-12"
            lastUpdatedLabel={lastUpdatedLabel}
        >
            {content && (
                <>
                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.definition_title}</h2>
                        <p>{content.definition_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.usage_title}</h2>
                        <p>{content.usage_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.management_title}</h2>
                        <p>{content.management_text}</p>
                    </section>
                </>
            )}
        </LegalPageLayout>
    );
}
