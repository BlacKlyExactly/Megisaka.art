import { I18nString } from '@/lib/sanity/requests';

export const getTranslatedText = (text: I18nString, lang?: 'pl' | 'en') =>
  lang ? text[lang] : text['en'];
