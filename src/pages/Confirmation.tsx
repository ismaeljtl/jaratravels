import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Users, MapPin, CreditCard, Mail, Phone, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string;
  participants: string;
  paymentMethod: string;
  message?: string;
}

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData;

  useEffect(() => {
    // Se não houver dados da reserva, redireciona para a página de reservas
    if (!bookingData) {
      navigate("/reservas");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "mbway": return "MBWay";
      case "bank-transfer": return "Transferência Bancária";
      case "paypal": return "PayPal";
      default: return method;
    }
  };
  
  const paymentMethodLabel = getPaymentMethodLabel(bookingData.paymentMethod);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Confirmação de Reserva</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Message */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">Reserva Confirmada!</h2>
                  <p className="text-muted-foreground">
                    Obrigado, {bookingData.name}! Recebemos a sua reserva e entraremos em contacto em breve.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Detalhes da Reserva
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Serviço</p>
                  <p className="font-semibold text-foreground">{bookingData.serviceName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Preço</p>
                  <p className="font-semibold text-foreground">{bookingData.servicePrice}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duração</p>
                  <p className="font-semibold text-foreground">{bookingData.serviceDuration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-semibold text-foreground">
                    {new Date(bookingData.date).toLocaleDateString("pt-PT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Participantes</p>
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {bookingData.participants} {parseInt(bookingData.participants) === 1 ? "pessoa" : "pessoas"}
                  </p>
                </div>
              </div>

              {bookingData.message && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Mensagem Adicional</p>
                  <p className="text-foreground">{bookingData.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Informações de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{bookingData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium text-foreground">{bookingData.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Informações de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Método de Pagamento</p>
                <p className="font-semibold text-foreground">{paymentMethodLabel}</p>
              </div>

              {bookingData.paymentMethod === "mbway" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2">
                  <p className="font-medium text-foreground">Instruções para Pagamento via MBWay:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Aguarde a solicitação MBWay no número: <span className="font-medium text-foreground">{bookingData.phone}</span></li>
                    <li>Confirme o pagamento de <span className="font-medium text-foreground">{bookingData.servicePrice}</span> no seu telemóvel</li>
                    <li>Receberá um email de confirmação após o pagamento</li>
                  </ol>
                  <p className="text-xs text-muted-foreground pt-2">
                    A solicitação MBWay será enviada nas próximas 24 horas úteis
                  </p>
                </div>
              )}

              {bookingData.paymentMethod === "bank-transfer" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-3">
                  <p className="font-medium text-foreground">Dados para Transferência Bancária:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">IBAN:</span>
                      <span className="font-mono font-medium text-foreground">PT50 0000 0000 0000 0000 0000 0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">Titular:</span>
                      <span className="font-medium text-foreground">Jara Travels</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">Banco:</span>
                      <span className="font-medium text-foreground">Banco Exemplo</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium text-foreground">{bookingData.servicePrice}</span>
                    </div>
                    <div className="flex justify-between items-start p-2 bg-background rounded">
                      <span className="text-muted-foreground">Descrição:</span>
                      <span className="font-medium text-foreground text-right">{bookingData.name} - {bookingData.serviceName}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Por favor, efetue o pagamento nas próximas 48 horas para confirmar a sua reserva
                  </p>
                </div>
              )}

              {bookingData.paymentMethod === "paypal" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-3">
                  <p className="font-medium text-foreground">Instruções para Pagamento via PayPal:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">PayPal.me:</span>
                      <a 
                        href="https://paypal.me/JaraTravels" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        paypal.me/JaraTravels
                      </a>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium text-foreground">{bookingData.servicePrice}</span>
                    </div>
                    <div className="flex justify-between items-start p-2 bg-background rounded">
                      <span className="text-muted-foreground">Descrição:</span>
                      <span className="font-medium text-foreground text-right">{bookingData.name} - {bookingData.serviceName}</span>
                    </div>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground pt-2">
                    <li>Clique no link acima para aceder ao PayPal</li>
                    <li>Insira o valor <span className="font-medium text-foreground">{bookingData.servicePrice}</span> e adicione a descrição</li>
                    <li>Após o pagamento, receberá a confirmação por email</li>
                  </ol>
                  <p className="text-xs text-muted-foreground pt-2">
                    Por favor, efetue o pagamento nas próximas 48 horas para confirmar a sua reserva
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Meeting Point */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Ponto de Encontro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                O local exato do ponto de encontro será confirmado por email ou telefone após a confirmação do pagamento.
              </p>
              <p className="text-sm text-muted-foreground">
                Localização: <span className="font-medium text-foreground">Seixal, Portugal</span>
              </p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Enviámos um email de confirmação para <span className="font-medium text-foreground">{bookingData.email}</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Complete o pagamento usando o método selecionado ({paymentMethodLabel})</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Entraremos em contacto por email ou telefone para confirmar os detalhes finais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Prepare-se para uma experiência inesquecível!</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/reservas")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nova Reserva
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>

          {/* Support */}
          <div className="text-center pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Precisa de ajuda? Contacte-nos pelo email{" "}
              <a href="mailto:info@jaratravels.com" className="text-primary hover:underline font-medium">
                info@jaratravels.com
              </a>{" "}
              ou pelo telefone{" "}
              <a href="tel:+351123456789" className="text-primary hover:underline font-medium">
                +351 123 456 789
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
