import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada! Entraremos em contacto em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contacto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pronto para a sua próxima aventura? Contacte-nos e comecemos a planear!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Envie-nos uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário e responderemos o mais breve possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Seu Nome"
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
                    placeholder="Seu Email"
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
                    placeholder="Seu Telefone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-input"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Sua Mensagem"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-input resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Enviar Mensagem
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
                <div className="bg-adventure/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-adventure" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Localização</h3>
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
