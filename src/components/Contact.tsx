import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: formData,
      });

      if (error || data?.error) {
        toast.error(data?.error || "Erro ao enviar mensagem. Tente novamente.");
        return;
      }

      toast.success(t.contact.successMessage);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">{t.contact.formTitle}</CardTitle>
              <CardDescription>
                {t.contact.formSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder={t.contact.name}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-input"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t.contact.email}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-input"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder={t.contact.phone}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-input"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t.contact.message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-input resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "A enviar..." : t.contact.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">jaratravels@hotmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Instagram className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/jaraatw" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    @jaraatw
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="bg-adventure/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-adventure" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.contact.location}</h3>
                  <p className="text-muted-foreground">Seixal, Portugal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
