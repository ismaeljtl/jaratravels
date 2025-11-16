import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Calendar, Users, MapPin, ExternalLink, CreditCard } from "lucide-react";
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
  paymentMethod: z.string().min(1, "Selecione um método de pagamento"),
  message: z.string().max(1000).optional(),
});

const services = [
  {
    id: "tour-villa-gardens",
    name: "Tour Villa & Gardens",
    description: "Guided walk through beautiful gardens and historic villa of Seixal",
    price: "30€",
    duration: "2h30",
    included: [
      "Walking tour City center",
      "Visit Quinta da Fidalga",
      "Insurance",
      "Offer Pastel de Nata typical Portuguese dessert"
    ]
  },
  {
    id: "tour-instax-photos",
    name: "Tour Instax Photos",
    description: "Take instant polaroids while discovering local gems",
    price: "20€",
    duration: "1h30",
    included: [
      "Tourist Guide",
      "Map of Seixal",
      "Pastry Pastel de nata",
      "Photo accessories",
      "Instax Camera (up to 4 photos per person in locations of your choice)"
    ]
  },
  {
    id: "seixal-medieval",
    name: "Seixal Medieval",
    description: "Step back in time with a medieval-themed tour",
    price: "35€",
    duration: "2h",
    included: [
      "Tourist Guide",
      "HEMA Study Group Black Sword Instructors",
      "Equipment for the activity"
    ]
  },
  {
    id: "boatrip-seixal",
    name: "Boatrip Seixal",
    description: "Sail through the beautiful Seixal Bay, aboard one of the typical boats of the past. Visit Corroios Tide Mill",
    price: "50€",
    duration: "3h",
    included: [
      "Welcome Drink, water and snacks on board",
      "Map of Seixal",
      "Visit to Corroios Tide Mill",
      "Boatrip by Chigadinho",
      "Observation of local fauna, flora and flamingos",
      "Tourist Guide"
    ]
  },
  {
    id: "sesimbra-emotion",
    name: "Sesimbra Emotion",
    description: "Unique experience in Sado River to watch dolphins",
    price: "60€",
    duration: "3h",
    included: [
      "Observation of Dolphins, birds, fauna and flora",
      "Visit one of the best beaches of Sesimbra",
      "Pit stop for diving in crystal clear waters",
      "Free Afternoon Enjoying Beach",
      "Transportation can be included"
    ]
  },
  {
    id: "setubal-arrabida",
    name: "Setúbal & Arrábida",
    description: "Arrábida is a protected natural reserve classified by UNESCO… unique landscape and typical lunch fried cuttlefish",
    price: "80€",
    duration: "4h",
    included: [
      "Private Guide",
      "Transportation",
      "Water free",
      "Insurance",
      "Lunch in Restaurant at Setúbal (not included)",
      "Walk Tour at Downtown Setúbal"
    ]
  },
  {
    id: "azeitao-vineyard",
    name: "Azeitão Vineyard Tour & Wine Tasting",
    description: "Quick getaway in small town called Azeitão, one of the most important wine regions in Portugal… delicious pastry",
    price: "80€",
    duration: "4h",
    included: [
      "Private Guide",
      "Insurance",
      "Transportation",
      "Entrance Tickets",
      "Local Pastry Torta de Azeitão",
      "Wine Taste"
    ]
  },
  {
    id: "almada-cristo-rei",
    name: "Almada",
    description: "Cristo Rei with 110 meters, high viewing platform, panoramic view of Lisbon and the 25 de Abril bridge",
    price: "60€",
    fullDayPrice: "120€",
    duration: "4h",
    included: [
      "Tourist Guide",
      "Insurance",
      "Transportation",
      "Ticket to Christ the King",
      "Walking tour to Cacilhas",
      "Ticket for Water Museum"
    ]
  },
  {
    id: "white-gold-route",
    name: "White Gold Route (Alcochete)",
    description: "Beautiful landscape under Tagus River, walk by the sea, nature, history, customs",
    price: "60€",
    duration: "4h",
    included: [
      "Tourist Guide",
      "Insurance",
      "Transportation",
      "Entrance Ticket to Salt Pans at Samouco",
      "Walking tour village of Alcochete",
      "Visit Polo Ambiental do sítio das Hortas, birdwatching",
      "Possible stop at Freeport Fashion Outlet (Additional, if you like shopping outside)"
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
    paymentMethod: "",
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
      
      // Preparar dados para a página de confirmação
      const bookingData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceName: selectedServiceData?.name || "",
        servicePrice: selectedServiceData?.price || "",
        serviceDuration: selectedServiceData?.duration || "",
        date: validatedData.date,
        participants: validatedData.participants,
        paymentMethod: validatedData.paymentMethod,
        message: validatedData.message
      };
      
      // Redirecionar para página de confirmação com os dados
      navigate("/confirmacao", { state: bookingData });
      
      toast.success("Reserva enviada com sucesso!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Erro ao enviar reserva. Tente novamente.");
      }
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
        {/* GetYourGuide CTA */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    Reserva Instantânea via GetYourGuide
                  </h3>
                  <p className="text-muted-foreground">
                    Reserve agora o nosso tour guiado a pé pelo Seixal com degustação de pastel de nata através da GetYourGuide - confirmação imediata!
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => window.open("https://www.getyourguide.com/pt-pt/distrito-de-setubal-l32357/seixal-caminhada-guiada-a-pe-com-pastel-de-nata-t1019834/?preview=7EBVJMHP4JO79UALC5RTP2IRYEDQU33D", "_blank")}
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                >
                  Reservar no GetYourGuide
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    <Label htmlFor="paymentMethod">Método de Pagamento *</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione método de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mbway">MBWay</SelectItem>
                        <SelectItem value="bank-transfer">Transferência Bancária</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.paymentMethod === "mbway" && (
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                          <div className="space-y-2">
                            <p className="font-semibold text-sm text-foreground">Pagamento via MBWay</p>
                            <p className="text-sm text-muted-foreground">
                              Após confirmar a reserva, enviaremos uma solicitação MBWay para o número de telefone fornecido.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Número MBWay:</span> {formData.phone || "Por favor, preencha o seu telefone acima"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {formData.paymentMethod === "bank-transfer" && (
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                          <div className="space-y-3">
                            <p className="font-semibold text-sm text-foreground">Dados para Transferência Bancária</p>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-foreground">IBAN:</span>
                                <p className="text-muted-foreground font-mono">PT50 0000 0000 0000 0000 0000 0</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Titular:</span>
                                <p className="text-muted-foreground">Jara Travels</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Banco:</span>
                                <p className="text-muted-foreground">Banco Exemplo</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Referência:</span>
                                <p className="text-muted-foreground">Por favor, indique o seu nome na descrição da transferência</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

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

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-muted-foreground mb-3">
                      Ou reserve diretamente via GetYourGuide
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open("https://www.getyourguide.com/pt-pt/distrito-de-setubal-l32357/seixal-caminhada-guiada-a-pe-com-pastel-de-nata-t1019834/?preview=7EBVJMHP4JO79UALC5RTP2IRYEDQU33D", "_blank")}
                    >
                      GetYourGuide
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
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
