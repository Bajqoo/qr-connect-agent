import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Locale, translations, TranslationKeys } from "./translations";
import { supabase } from "@/integrations/supabase/client";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const validLocales: Locale[] = ["en", "tr", "ru", "sq", "de"];

function isValidLocale(val: string | null | undefined): val is Locale {
  return !!val && validLocales.includes(val as Locale);
}

function detectBrowserLocale(): Locale {
  const stored = localStorage.getItem("app-locale") as Locale | null;
  if (isValidLocale(stored)) return stored;

  const browserLang = navigator.language.split("-")[0];
  const map: Record<string, Locale> = { en: "en", tr: "tr", ru: "ru", sq: "sq", de: "de" };
  return map[browserLang] || "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectBrowserLocale);
  const [userId, setUserId] = useState<string | null>(null);

  // Listen to auth state to know if user is logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      }
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load locale from profile when user logs in
  useEffect(() => {
    if (!userId) return;
    
    supabase
      .from("profiles")
      .select("preferred_locale")
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        if (data && isValidLocale(data.preferred_locale)) {
          setLocaleState(data.preferred_locale);
          localStorage.setItem("app-locale", data.preferred_locale);
        }
      });
  }, [userId]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("app-locale", l);

    // Save to DB if user is logged in
    if (userId) {
      supabase
        .from("profiles")
        .update({ preferred_locale: l } as any)
        .eq("user_id", userId)
        .then(); // fire and forget
    }
  }, [userId]);

  const t = useCallback((key: TranslationKeys): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const fallbackContext: LanguageContextType = {
  locale: "en",
  setLocale: () => {},
  t: (key: TranslationKeys) => translations.en[key] || key,
};

export function useTranslation(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) return fallbackContext;
  return ctx;
}
