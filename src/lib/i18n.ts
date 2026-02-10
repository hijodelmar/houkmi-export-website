export const locales = ['en', 'es', 'fr', 'de', 'it', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function getDirection(locale: Locale) {
    return 'ltr';
}

export const localeNames: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    ru: 'Русский',
};
