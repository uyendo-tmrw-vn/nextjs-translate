// import { useRouter } from 'next/router';
// import id from './locales/id';
// import en from './locales/en';
import {
  useTranslation as useTranslationHook,
  useLanguageQuery,
} from "next-export-i18n";

type UseTranslation = [
  t: (selector: string) => string,
  query: "en" | "id",
  trueQuery: any
];

const useTranslation = () => {
  // const { locale } = useRouter();
  // const translation = locale === 'en' ? en : id;
  // return [translation];
  const { t } = useTranslationHook();
  const [query] = useLanguageQuery();

  return [t, query?.lang ?? "en", query] as UseTranslation;
};

export default useTranslation;
