import { getDictionary } from "@/lib/dictionary";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Locale } from "@/lib/i18n";

export default async function MentionsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.Legal?.mentions_content;
    const lastUpdatedLabel = dict.Legal?.last_updated;

    return (
        <LegalPageLayout
            lang={lang}
            title={dict.Legal?.mentions_title || "Mentions Légales"}
            backLabel={dict.Navigation.home}
            lastUpdated="2024-02-12"
            lastUpdatedLabel={lastUpdatedLabel}
        >
            {content && (
                <>
                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.editor_title}</h2>
                        <p>{content.editor_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.hosting_title}</h2>
                        <p>{content.hosting_text}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl mb-6">{content.intellectual_title}</h2>
                        <p>{content.intellectual_text}</p>
                    </section>
                </>
            )}
        </LegalPageLayout>
    );
}
