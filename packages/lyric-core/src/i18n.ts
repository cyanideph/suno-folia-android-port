import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/json/index";

i18next.use(initReactI18next).init({
  compatibilityMode: "v1",
  resources,
  fallbackLng: "en",
  ns: "translation",
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
});

// Export per-language direction
export const getTextDirection = (lang: string): "ltr" | "rtl" => {
  const rtlLanguages = ["ar", "fa", "ur", "he"];
  return rtlLanguages.includes(lang) ? "rtl" : "ltr";
};

export default i18next;
export { getTextDirection };