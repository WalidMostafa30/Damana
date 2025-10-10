import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const savedLang = localStorage.getItem("lang") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang, // ← اللغة من localStorage فقط
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
