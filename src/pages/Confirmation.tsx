import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Users, MapPin, CreditCard, Mail, Phone, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n";

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
  const { t, language } = useLanguage();

  useEffect(() => {
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
      case "bank-transfer": return t.booking.bankTransfer;
      case "paypal": return "PayPal";
      default: return method;
    }
  };
  
  const paymentMethodLabel = getPaymentMethodLabel(bookingData.paymentMethod);

  const getDateLocale = () => {
    switch (language) {
      case 'en': return 'en-GB';
      case 'es': return 'es-ES';
      default: return 'pt-PT';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">{t.confirmation.title}</h1>
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
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{t.confirmation.successTitle}</h2>
                  <p className="text-muted-foreground">
                    {t.confirmation.successMessage.replace("{name}", bookingData.name)}
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
                {t.confirmation.bookingDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t.confirmation.service}</p>
                  <p className="font-semibold text-foreground">{bookingData.serviceName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t.confirmation.price}</p>
                  <p className="font-semibold text-foreground">{bookingData.servicePrice}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t.confirmation.duration}</p>
                  <p className="font-semibold text-foreground">{bookingData.serviceDuration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t.confirmation.date}</p>
                  <p className="font-semibold text-foreground">
                    {new Date(bookingData.date).toLocaleDateString(getDateLocale(), {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t.confirmation.participants}</p>
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {bookingData.participants} {parseInt(bookingData.participants) === 1 ? t.confirmation.person : t.confirmation.people}
                  </p>
                </div>
              </div>

              {bookingData.message && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">{t.confirmation.additionalMessage}</p>
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
                {t.confirmation.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.confirmation.email}</p>
                  <p className="font-medium text-foreground">{bookingData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.confirmation.phone}</p>
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
                {t.confirmation.paymentInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.confirmation.paymentMethod}</p>
                <p className="font-semibold text-foreground">{paymentMethodLabel}</p>
              </div>

              {bookingData.paymentMethod === "mbway" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2">
                  <p className="font-medium text-foreground">{t.confirmation.mbwayInstructions}</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>{t.confirmation.mbwayStep1}</li>
                    <li>{t.confirmation.mbwayStep2.replace("{price}", bookingData.servicePrice)}</li>
                    <li>{t.confirmation.mbwayStep3}</li>
                  </ol>
                  <p className="text-xs text-muted-foreground pt-2">
                    {t.confirmation.mbwayNote}
                  </p>
                </div>
              )}

              {bookingData.paymentMethod === "bank-transfer" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-3">
                  <p className="font-medium text-foreground">{t.confirmation.bankTransferData}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.iban}</span>
                      <span className="font-mono font-medium text-foreground">PT50004587354040329900931</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.holder}</span>
                      <span className="font-medium text-foreground">Cláudia Jarimba</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.bank}</span>
                      <span className="font-medium text-foreground">Crédito Agrícola</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.value}</span>
                      <span className="font-medium text-foreground">{bookingData.servicePrice}</span>
                    </div>
                    <div className="flex justify-between items-start p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.description}</span>
                      <span className="font-medium text-foreground text-right">{bookingData.name} - {bookingData.serviceName}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    {t.confirmation.bankTransferNote}
                  </p>
                </div>
              )}

              {bookingData.paymentMethod === "paypal" && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-3">
                  <p className="font-medium text-foreground">{t.confirmation.paypalInstructions}</p>
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
                      <span className="text-muted-foreground">{t.confirmation.value}</span>
                      <span className="font-medium text-foreground">{bookingData.servicePrice}</span>
                    </div>
                    <div className="flex justify-between items-start p-2 bg-background rounded">
                      <span className="text-muted-foreground">{t.confirmation.description}</span>
                      <span className="font-medium text-foreground text-right">{bookingData.name} - {bookingData.serviceName}</span>
                    </div>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground pt-2">
                    <li>{t.confirmation.paypalStep1}</li>
                    <li>{t.confirmation.paypalStep2.replace("{price}", bookingData.servicePrice)}</li>
                    <li>{t.confirmation.paypalStep3}</li>
                  </ol>
                  <p className="text-xs text-muted-foreground pt-2">
                    {t.confirmation.paypalNote}
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
                {t.confirmation.meetingPoint}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                {t.confirmation.meetingPointDesc}
              </p>
              <p className="text-sm text-muted-foreground">
                {t.confirmation.locationLabel} <span className="font-medium text-foreground">Seixal, Portugal</span>
              </p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>{t.confirmation.nextSteps}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>{t.confirmation.step1.replace("{email}", bookingData.email)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>{t.confirmation.step2.replace("{method}", paymentMethodLabel)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>{t.confirmation.step3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>{t.confirmation.step4}</span>
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
              {t.confirmation.newBooking}
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              {t.confirmation.backToHome}
            </Button>
          </div>

          {/* Support */}
          <div className="text-center pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              {t.confirmation.needHelp}{" "}
              <a href="mailto:info@jaratravels.com" className="text-primary hover:underline font-medium">
                info@jaratravels.com
              </a>{" "}
              {t.confirmation.orPhone}{" "}
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
