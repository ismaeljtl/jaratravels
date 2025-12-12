import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.faq.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.items.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t.faq.notFound}
          </p>
          <a 
            href="mailto:jaratravels@hotmail.com"
            className="text-primary hover:underline font-semibold"
          >
            {t.faq.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
