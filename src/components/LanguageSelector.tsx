import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { cn } from '@/lib/utils';

const languages: { code: Language; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
  className?: string;
}

const LanguageSelector = ({ variant = 'header', className }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'footer') {
    return (
      <div className={cn("flex gap-2", className)}>
        {languages.map((lang) => (
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
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-all",
            language === lang.code
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title={lang.label}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
