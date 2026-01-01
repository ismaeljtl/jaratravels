import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            JaraTravels
          </a>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t.terms.title}</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.general.title}</h2>
            <p className="text-muted-foreground">{t.terms.general.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.reservations.title}</h2>
            <p className="text-muted-foreground">{t.terms.reservations.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.cancellations.title}</h2>
            <p className="text-muted-foreground">{t.terms.cancellations.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.responsibilities.title}</h2>
            <p className="text-muted-foreground">{t.terms.responsibilities.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.behavior.title}</h2>
            <p className="text-muted-foreground">{t.terms.behavior.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.modifications.title}</h2>
            <p className="text-muted-foreground">{t.terms.modifications.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.terms.applicableLaw.title}</h2>
            <p className="text-muted-foreground">{t.terms.applicableLaw.text}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
