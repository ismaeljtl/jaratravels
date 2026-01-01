import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Privacy = () => {
  const { t, language } = useLanguage();

  const getDateLocale = () => {
    switch (language) {
      case 'en': return 'en-GB';
      case 'es': return 'es-ES';
      default: return 'pt-PT';
    }
  };

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
        <h1 className="text-4xl font-bold mb-8">{t.privacy.title}</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.intro.title}</h2>
            <p className="text-muted-foreground">{t.privacy.intro.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.dataCollected.title}</h2>
            <p className="text-muted-foreground mb-4">{t.privacy.dataCollected.text}</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {t.privacy.dataCollected.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.dataUsage.title}</h2>
            <p className="text-muted-foreground mb-4">{t.privacy.dataUsage.text}</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {t.privacy.dataUsage.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.dataSharing.title}</h2>
            <p className="text-muted-foreground">{t.privacy.dataSharing.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.dataSecurity.title}</h2>
            <p className="text-muted-foreground">{t.privacy.dataSecurity.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.yourRights.title}</h2>
            <p className="text-muted-foreground mb-4">{t.privacy.yourRights.text}</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {t.privacy.yourRights.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.cookies.title}</h2>
            <p className="text-muted-foreground">{t.privacy.cookies.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.dataRetention.title}</h2>
            <p className="text-muted-foreground">{t.privacy.dataRetention.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.contact.title}</h2>
            <p className="text-muted-foreground">{t.privacy.contact.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.changes.title}</h2>
            <p className="text-muted-foreground">{t.privacy.changes.text}</p>
            <p className="text-sm text-muted-foreground mt-4">
              {t.privacy.changes.lastUpdate} {new Date().toLocaleDateString(getDateLocale())}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
