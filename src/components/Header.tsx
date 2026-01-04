import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import logoImg from "@/assets/logo.png";
import turismoPortugalLogo from "@/assets/partners/turismo-portugal.jpg";
import getYourGuideLogo from "@/assets/partners/getyourguide.png";
import withlocalsLogo from "@/assets/partners/withlocals.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t.nav.services, sectionId: "services" },
    { label: t.nav.tours, sectionId: "tours" },
    { label: t.nav.about, sectionId: "about" },
    { label: t.nav.faq, sectionId: "faq" },
    { label: t.nav.contact, sectionId: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img src={logoImg} alt="JaraTravels" className="h-10 md:h-12 w-auto" />
            </button>
            
            {/* Partner Logos - Desktop */}
            <div className="hidden md:flex items-center gap-3 ml-3 pl-4 border-l border-border/30">
              <a href="https://www.turismodeportugal.pt" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={turismoPortugalLogo} alt="Turismo de Portugal" className="h-5 w-auto" />
              </a>
              <a href="https://www.getyourguide.com/pt-pt/distrito-de-setubal-l32357/seixal-caminhada-guiada-a-pe-com-pastel-de-nata-t1019834/?preview=7EBVJMHP4JO79UALC5RTP2IRYEDQU33D" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={getYourGuideLogo} alt="GetYourGuide" className="h-4 w-auto" />
              </a>
              <a href="https://www.withlocals.com/es/experience/time-travel-in-lisbon-s-south-bay-500889ca/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={withlocalsLogo} alt="Withlocals" className="h-4 w-auto" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled || !isHomePage
                    ? "text-foreground"
                    : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Button
              onClick={() => navigate("/reservas")}
              className="bg-primary hover:bg-primary/90"
            >
              {t.nav.booking}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/50 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="px-4 py-2 text-left text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 py-2">
                <LanguageSelector />
              </div>
              {/* Partner Logos - Mobile */}
              <div className="flex items-center gap-4 px-4 py-3 border-t border-border/30 mt-2">
                <a href="https://www.turismodeportugal.pt" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src={turismoPortugalLogo} alt="Turismo de Portugal" className="h-5 w-auto" />
                </a>
                <a href="https://www.getyourguide.com/pt-pt/distrito-de-setubal-l32357/seixal-caminhada-guiada-a-pe-com-pastel-de-nata-t1019834/?preview=7EBVJMHP4JO79UALC5RTP2IRYEDQU33D" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src={getYourGuideLogo} alt="GetYourGuide" className="h-4 w-auto" />
                </a>
                <a href="https://www.withlocals.com/es/experience/time-travel-in-lisbon-s-south-bay-500889ca/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src={withlocalsLogo} alt="Withlocals" className="h-4 w-auto" />
                </a>
              </div>
              <div className="px-4 pt-2">
                <Button
                  onClick={() => {
                    navigate("/reservas");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {t.nav.booking}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
