import { useTranslation } from "@/i18n/LanguageContext";
import { Locale, localeNames, localeFlags } from "@/i18n/translations";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const locales: Locale[] = ["en", "tr", "ru", "sq", "de"];

export function LanguageSwitcher({ variant = "ghost" }: { variant?: "ghost" | "outline" }) {
  const { locale, setLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="sm" className="gap-1.5 text-xs">
          <span>{localeFlags[locale]}</span>
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <Globe className="h-3.5 w-3.5 sm:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className={l === locale ? "bg-accent" : ""}
          >
            <span className="mr-2">{localeFlags[l]}</span>
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
