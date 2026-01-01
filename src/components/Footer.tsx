import { Instagram, Mail, FileText, Shield, BookOpen, Smartphone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">JaraTravels</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-muted-foreground">
              RNAAT Nº598/2025 - Turismo de Portugal
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-1">{t.footer.legalInfo}</h4>
            <a 
              href="/termos" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {t.footer.terms}
            </a>
            <a 
              href="/privacidade" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              {t.footer.privacy}
            </a>
            <a 
              href="https://livroreclamacoes.pt/Inicio/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {t.footer.complaints}
            </a>
            <Link 
              to="/instalar"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              {t.footer.installApp}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">{t.footer.languages}</h4>
              <LanguageSelector variant="footer" />
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/jaraatw" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary/10 hover:bg-secondary/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-secondary" />
              </a>
              <a 
                href="mailto:jaratravels@hotmail.com" 
                className="bg-adventure/10 hover:bg-adventure/20 p-2 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-adventure" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JaraTravels. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
