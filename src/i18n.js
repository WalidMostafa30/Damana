import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ترجماتك
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector) // يكتشف لغة المتصفح
  .use(initReactI18next) // بيربط i18n بـ react
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en", // لو اللغة مش متوفرة
    debug: false,
    interpolation: {
      escapeValue: false, // عشان React بيأمن لوحده
    },
  });

export default i18n;
