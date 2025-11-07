import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">JaraTravels</h3>
            <p className="text-sm text-muted-foreground">
              Criando experiências de viagem inesquecíveis
            </p>
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

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JaraTravels. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
