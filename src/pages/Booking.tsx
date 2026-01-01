import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Calendar, Users, MapPin, ExternalLink, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n";
import TurnstileCaptcha from "@/components/TurnstileCaptcha";

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
  const { t, language } = useLanguage();
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaSiteKey, setCaptchaSiteKey] = useState<string>("");

  // Fetch CAPTCHA site key from server
  useEffect(() => {
    const fetchCaptchaConfig = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-captcha-config');
        if (!error && data?.siteKey) {
          setCaptchaSiteKey(data.siteKey);
        }
      } catch (err) {
        console.error("Failed to fetch CAPTCHA config:", err);
      }
    };
    fetchCaptchaConfig();
  }, []);

  const selectedServiceData = services.find(s => s.id === selectedService);

  const bookingSchema = z.object({
    name: z.string().trim().min(1, t.booking.fullName + " *").max(100),
    email: z.string().trim().email(t.booking.email + " *").max(255),
    phone: z.string().trim().min(9, t.booking.phone + " *").max(20),
    service: z.string().min(1, t.booking.service + " *"),
    date: z.string().min(1, t.booking.preferredDate + " *"),
    participants: z.string().min(1, t.booking.participants + " *"),
    paymentMethod: z.string().min(1, t.booking.paymentMethod + " *"),
    message: z.string().max(1000).optional(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Verify CAPTCHA first (only if site key is configured)
      if (captchaSiteKey && !captchaToken) {
        toast.error("Por favor, complete a verificação de segurança.");
        setIsSubmitting(false);
        return;
      }

      // Verify CAPTCHA with server if token exists
      if (captchaSiteKey && captchaToken) {
        const { data: captchaResult, error: captchaError } = await supabase.functions.invoke('verify-captcha', {
          body: { token: captchaToken }
        });

        if (captchaError || !captchaResult?.success) {
          toast.error("Verificação de segurança falhou. Tente novamente.");
          setCaptchaToken(null);
          setIsSubmitting(false);
          return;
        }
      }

      const validatedData = bookingSchema.parse(formData);
      
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

      // Save booking to database first
      const { data: insertedBooking, error: dbError } = await supabase
        .from('bookings')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service_name: selectedServiceData?.name || "",
          service_price: selectedServiceData?.price || "",
          service_duration: selectedServiceData?.duration || "",
          booking_date: validatedData.date,
          participants: parseInt(validatedData.participants, 10),
          payment_method: validatedData.paymentMethod,
          message: validatedData.message || null
        })
        .select('id')
        .single();

      if (dbError || !insertedBooking) {
        console.error("Error saving booking to database:", dbError);
        toast.error(t.booking.bookingError);
        setIsSubmitting(false);
        return;
      }

      // Send email notification after successful database save
      try {
        const { error } = await supabase.functions.invoke('send-booking-notification', {
          body: bookingData
        });
        
        if (error) {
          console.error("Error sending notification:", error);
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't block user flow - booking is already saved
      }
      
      // Pass booking ID for secure payment details retrieval
      navigate("/confirmacao", { state: { ...bookingData, bookingId: insertedBooking.id } });
      
      toast.success(t.booking.bookingSuccess);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error(t.booking.bookingError);
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
          <h1 className="text-2xl font-bold text-foreground">{t.booking.title}</h1>
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
                    {t.booking.getYourGuideTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.booking.getYourGuideDesc}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => window.open("https://www.getyourguide.com/pt-pt/distrito-de-setubal-l32357/seixal-caminhada-guiada-a-pe-com-pastel-de-nata-t1019834/?preview=7EBVJMHP4JO79UALC5RTP2IRYEDQU33D", "_blank")}
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                >
                  {t.booking.bookOnGetYourGuide}
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
              <h2 className="text-3xl font-bold mb-2 text-foreground">{t.booking.ourServices}</h2>
              <p className="text-muted-foreground">
                {t.booking.chooseExperience}
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
                        <p className="font-semibold text-sm text-foreground">{t.booking.whatsIncluded}</p>
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
                <CardTitle className="text-lg">{t.booking.importantInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{t.booking.meetingPoint}</p>
                    <p>{t.booking.meetingPointDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{t.booking.groups}</p>
                    <p>{t.booking.groupsDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{t.booking.cancellation}</p>
                    <p>{t.booking.cancellationDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle>{t.booking.formTitle}</CardTitle>
                <CardDescription>
                  {t.booking.formSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.booking.fullName} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.booking.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.email}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.booking.phone} *</Label>
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
                    <Label htmlFor="service">{t.booking.service} *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => {
                        setFormData({ ...formData, service: value });
                        setSelectedService(value);
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.booking.selectService} />
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
                    <Label htmlFor="date">{t.booking.preferredDate} *</Label>
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
                    <Label htmlFor="participants">{t.booking.participants} *</Label>
                    <Input
                      id="participants"
                      type="number"
                      min="1"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      placeholder={t.booking.participantsPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">{t.booking.paymentMethod} *</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.booking.selectPaymentMethod} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mbway">{t.booking.mbway}</SelectItem>
                        <SelectItem value="bank-transfer">{t.booking.bankTransfer}</SelectItem>
                        <SelectItem value="paypal">{t.booking.paypal}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.paymentMethod === "mbway" && (
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                          <div className="space-y-2">
                            <p className="font-semibold text-sm text-foreground">{t.booking.mbwayInfo}</p>
                            <p className="text-sm text-muted-foreground">
                              {t.booking.mbwayDesc}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{t.booking.mbwayNumber}</span> {formData.phone || t.booking.fillPhoneFirst}
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
                            <p className="font-semibold text-sm text-foreground">{t.booking.bankTransferInfo}</p>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-foreground">{t.booking.iban}</span>
                                <p className="text-muted-foreground font-mono">PT50 0000 0000 0000 0000 0000 0</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{t.booking.holder}</span>
                                <p className="text-muted-foreground">Jara Travels</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{t.booking.bank}</span>
                                <p className="text-muted-foreground">Banco Exemplo</p>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{t.booking.reference}</span>
                                <p className="text-muted-foreground">{t.booking.referenceDesc}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {formData.paymentMethod === "paypal" && (
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                          <div className="space-y-2">
                            <p className="font-semibold text-sm text-foreground">{t.booking.paypalInfo}</p>
                            <p className="text-sm text-muted-foreground">
                              {t.booking.paypalDesc}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{t.booking.paypalEmail}</span> {formData.email || t.booking.fillEmailFirst}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.booking.additionalMessage}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.booking.additionalMessagePlaceholder}
                      rows={4}
                    />
                  </div>

                  {/* CAPTCHA */}
                  {captchaSiteKey && (
                    <div className="space-y-2">
                      <Label>Verificação de Segurança *</Label>
                      <TurnstileCaptcha
                        siteKey={captchaSiteKey}
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                        onError={() => setCaptchaToken(null)}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || (captchaSiteKey && !captchaToken)}
                  >
                    {isSubmitting ? t.booking.submitting : t.booking.confirmBooking}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {t.booking.termsAgreement}
                  </p>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-muted-foreground mb-3">
                      {t.booking.orBookVia}
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
