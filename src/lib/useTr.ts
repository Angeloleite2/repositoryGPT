import { useLanguage } from "@/contexts/LanguageContext";
import { translate, translateList } from "@/lib/i18n-dict";

export const useTr = () => {
  const { lang } = useLanguage();
  return {
    tr: (value: string) => translate(lang, value),
    trList: (list?: string[]) => translateList(lang, list),
    lang,
  };
};
