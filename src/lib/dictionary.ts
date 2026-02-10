import 'server-only';
import type { Locale } from './i18n';

const dictionaries = {
    en: () => import('../../public/locales/en.json').then((module) => module.default),
    es: () => import('../../public/locales/es.json').then((module) => module.default),
    fr: () => import('../../public/locales/fr.json').then((module) => module.default),
    de: () => import('../../public/locales/de.json').then((module) => module.default),
    it: () => import('../../public/locales/it.json').then((module) => module.default),
    ru: () => import('../../public/locales/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    if (dictionaries[locale]) {
        return dictionaries[locale]();
    }
    return dictionaries.en();
};
