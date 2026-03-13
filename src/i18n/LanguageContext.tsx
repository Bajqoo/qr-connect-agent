import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations, TranslationKeys } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLocale(): Locale {
  const stored = localStorage.getItem("app-locale") as Locale | null;
  if (stored && translations[stored]) return stored;

  const browserLang = navigator.language.split("-")[0];
  const map: Record<string, Locale> = { en: "en", tr: "tr", ru: "ru", sq: "sq" };
  return map[browserLang] || "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectBrowserLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("app-locale", l);
  };

  const t = (key: TranslationKeys): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
