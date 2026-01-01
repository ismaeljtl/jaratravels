import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Smartphone, Share, Plus, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 dark:bg-green-900/20 rounded-full p-4 w-fit mb-4">
              <Smartphone className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl">App Instalada!</CardTitle>
            <CardDescription>
              A JaraTravels já está instalada no teu dispositivo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} className="w-full">
              Voltar à App
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Instalar App</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto bg-primary/10 rounded-full p-6 w-fit mb-6">
            <Download className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Instala a JaraTravels</h2>
          <p className="text-muted-foreground text-lg">
            Adiciona a nossa app ao teu ecrã inicial para acesso rápido às melhores experiências.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Acesso Rápido</h3>
                  <p className="text-sm text-muted-foreground">
                    Abre a app diretamente do ecrã inicial, como qualquer outra app.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Funciona Offline</h3>
                  <p className="text-sm text-muted-foreground">
                    Acede às informações mesmo sem ligação à internet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Install Button or Instructions */}
        {deferredPrompt ? (
          <Button onClick={handleInstall} size="lg" className="w-full mb-8">
            <Download className="w-5 h-5 mr-2" />
            Instalar Agora
          </Button>
        ) : isIOS ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Como instalar no iPhone/iPad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <p className="font-medium">Toca no botão Partilhar</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Share className="w-4 h-4" />
                    <span>Na barra inferior do Safari</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <p className="font-medium">Seleciona "Adicionar ao Ecrã Principal"</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Plus className="w-4 h-4" />
                    <span>Desliza para encontrar a opção</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <p className="font-medium">Confirma tocando em "Adicionar"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Como instalar no Android</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <p className="font-medium">Toca no menu do browser</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MoreVertical className="w-4 h-4" />
                    <span>Os três pontos no canto superior</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <p className="font-medium">Seleciona "Instalar app" ou "Adicionar ao ecrã inicial"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <p className="font-medium">Confirma a instalação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button variant="outline" onClick={() => navigate("/")} className="w-full">
          Voltar ao Site
        </Button>
      </div>
    </div>
  );
};

export default Install;
