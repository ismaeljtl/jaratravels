import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDown, Globe, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Common languages with their native names and flags
const commonLanguages = [
  { code: 'pt', flag: '🇵🇹', label: 'Português', native: true },
  { code: 'en', flag: '🇬🇧', label: 'English', native: true },
  { code: 'es', flag: '🇪🇸', label: 'Español', native: true },
];

const additionalLanguages = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
  { code: 'pl', flag: '🇵🇱', label: 'Polski' },
  { code: 'uk', flag: '🇺🇦', label: 'Українська' },
  { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
  { code: 'sv', flag: '🇸🇪', label: 'Svenska' },
  { code: 'da', flag: '🇩🇰', label: 'Dansk' },
  { code: 'no', flag: '🇳🇴', label: 'Norsk' },
  { code: 'fi', flag: '🇫🇮', label: 'Suomi' },
  { code: 'cs', flag: '🇨🇿', label: 'Čeština' },
  { code: 'el', flag: '🇬🇷', label: 'Ελληνικά' },
  { code: 'he', flag: '🇮🇱', label: 'עברית' },
  { code: 'th', flag: '🇹🇭', label: 'ไทย' },
  { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
  { code: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
  { code: 'ms', flag: '🇲🇾', label: 'Bahasa Melayu' },
  { code: 'ro', flag: '🇷🇴', label: 'Română' },
  { code: 'hu', flag: '🇭🇺', label: 'Magyar' },
  { code: 'bg', flag: '🇧🇬', label: 'Български' },
  { code: 'hr', flag: '🇭🇷', label: 'Hrvatski' },
  { code: 'sk', flag: '🇸🇰', label: 'Slovenčina' },
  { code: 'sl', flag: '🇸🇮', label: 'Slovenščina' },
];

const allLanguages = [...commonLanguages, ...additionalLanguages];

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
  className?: string;
}

const LanguageSelector = ({ variant = 'header', className }: LanguageSelectorProps) => {
  const { language, setLanguage, isTranslating } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = allLanguages.find(l => l.code === language) || { 
    code: language, 
    flag: '🌐', 
    label: language 
  };

  if (variant === 'footer') {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {commonLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "text-2xl transition-all hover:scale-110",
              language === lang.code ? "opacity-100 scale-110" : "opacity-60 hover:opacity-100"
            )}
            title={lang.label}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.flag}
          </button>
        ))}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "text-2xl transition-all hover:scale-110 flex items-center gap-1",
                !commonLanguages.find(l => l.code === language) ? "opacity-100 scale-110" : "opacity-60 hover:opacity-100"
              )}
              title="More languages"
              aria-label="More languages"
            >
              <Globe className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
            {additionalLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "cursor-pointer",
                  language === lang.code && "bg-primary/10"
                )}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-md transition-all",
            "text-foreground hover:bg-muted border border-border/50",
            className
          )}
          aria-label="Select language"
        >
          {isTranslating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="text-base">{currentLang.flag}</span>
          )}
          <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Native
        </div>
        {commonLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "cursor-pointer",
              language === lang.code && "bg-primary/10"
            )}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Auto-translate
        </div>
        {additionalLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "cursor-pointer",
              language === lang.code && "bg-primary/10"
            )}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
