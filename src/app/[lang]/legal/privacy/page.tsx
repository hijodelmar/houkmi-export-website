import { getDictionary } from "@/lib/dictionary";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Locale } from "@/lib/i18n";

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.Legal?.privacy_content;
    const lastUpdatedLabel = dict.Legal?.last_updated;

    return (
        <LegalPageLayout
            lang={lang}
            title={dict.Legal?.privacy_title || "Politique de Confidentialité"}
            backLabel={dict.Navigation.home}
            lastUpdated="2024-02-12"
            lastUpdatedLabel={lastUpdatedLabel}
        >
            {content && (
                <>
                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.intro_title}</h2>
                        <p>{content.intro_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.responsible_title}</h2>
                        <p>{content.responsible_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.data_collected_title}</h2>
                        <p>{content.data_collected_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.purposes_title}</h2>
                        <p>{content.purposes_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.rights_title}</h2>
                        <p>{content.rights_text}</p>
                    </section>
                </>
            )}
        </LegalPageLayout>
    );
}
