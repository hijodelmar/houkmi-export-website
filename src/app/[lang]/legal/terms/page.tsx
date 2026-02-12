import { getDictionary } from "@/lib/dictionary";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Locale } from "@/lib/i18n";

export default async function TermsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.Legal?.terms_content;
    const lastUpdatedLabel = dict.Legal?.last_updated;

    return (
        <LegalPageLayout
            lang={lang}
            title={dict.Legal?.terms_title || "Conditions Générales d'Utilisation"}
            backLabel={dict.Navigation.home}
            lastUpdated="2024-02-12"
            lastUpdatedLabel={lastUpdatedLabel}
        >
            {content && (
                <>
                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.object_title}</h2>
                        <p>{content.object_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.access_title}</h2>
                        <p>{content.access_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.user_obligations_title}</h2>
                        <p>{content.user_obligations_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.liability_title}</h2>
                        <p>{content.liability_text}</p>
                    </section>
                </>
            )}
        </LegalPageLayout>
    );
}
