import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Calendar, Users, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(9, "Telefone inválido").max(20),
  service: z.string().min(1, "Selecione um serviço"),
  date: z.string().min(1, "Data é obrigatória"),
  participants: z.string().min(1, "Número de participantes é obrigatório"),
  message: z.string().max(1000).optional(),
});

const services = [
  {
    id: "tour-lisboa",
    name: "Tour pela Lisboa Histórica",
    description: "Explore os bairros históricos de Lisboa",
    price: "45€",
    duration: "4 horas",
    included: [
      "Guia turístico profissional",
      "Transporte durante o tour",
      "Entrada em monumentos",
      "Degustação de pastéis de nata"
    ]
  },
  {
    id: "passeio-tejo",
    name: "Passeio pelo Rio Tejo",
    description: "Navegue pelas águas do Tejo",
    price: "35€",
    duration: "2 horas",
    included: [
      "Barco privado ou partilhado",
      "Guia experiente",
      "Bebidas incluídas",
      "Seguro"
    ]
  },
  {
    id: "evento-fado",
    name: "Noite de Fado Tradicional",
    description: "Experiência autêntica de fado",
    price: "55€",
    duration: "3 horas",
    included: [
      "Jantar tradicional português",
      "Show de fado ao vivo",
      "Bebida incluída",
      "Transporte de/para hotel"
    ]
  },
  {
    id: "tour-sintra",
    name: "Tour a Sintra e Cascais",
    description: "Descubra os palácios de Sintra",
    price: "65€",
    duration: "8 horas",
    included: [
      "Transporte confortável",
      "Guia certificado",
      "Entradas nos palácios",
      "Almoço incluído"
    ]
  }
];

const Booking = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    participants: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = bookingSchema.parse(formData);
      
      // Aqui você pode integrar com backend ou enviar email
      console.log("Reserva:", validatedData);
      
      toast.success("Reserva enviada com sucesso! Entraremos em contacto em breve.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        participants: "",
        message: ""
      });
      setSelectedService("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Erro ao enviar reserva. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-secondary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Reserve sua Experiência</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Services Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Nossos Serviços</h2>
              <p className="text-muted-foreground">
                Escolha a experiência perfeita para você
              </p>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedService === service.id 
                      ? "border-primary shadow-md" 
                      : "border-border/50"
                  }`}
                  onClick={() => {
                    setSelectedService(service.id);
                    setFormData({ ...formData, service: service.id });
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      {selectedService === service.id && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-bold text-primary text-lg">
                        {service.price}
                      </div>
                    </div>
                    
                    {selectedService === service.id && (
                      <div className="space-y-2 pt-4 border-t border-border/50">
                        <p className="font-semibold text-sm text-foreground">O que está incluído:</p>
                        <ul className="space-y-1">
                          {service.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Informações Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Ponto de Encontro</p>
                    <p>Seixal, Portugal (local exato será confirmado)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Grupos</p>
                    <p>Desconto para grupos acima de 6 pessoas</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Cancelamento</p>
                    <p>Cancelamento gratuito até 24h antes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle>Formulário de Reserva</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para realizar sua reserva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+351 123 456 789"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Serviço *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => {
                        setFormData({ ...formData, service: value });
                        setSelectedService(value);
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Data Preferida *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participants">Número de Participantes *</Label>
                    <Input
                      id="participants"
                      type="number"
                      min="1"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      placeholder="Ex: 2"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem Adicional</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Alguma informação adicional ou pedido especial?"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Reserva"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar, você concorda com nossos termos de serviço e política de privacidade
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
