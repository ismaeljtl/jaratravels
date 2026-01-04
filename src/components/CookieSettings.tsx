import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, Shield, BarChart3, Megaphone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieSettings = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-preferences");
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, [open]);

  const handleSave = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    localStorage.setItem("cookie-consent", "customized");
    setOpen(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted));
    localStorage.setItem("cookie-consent", "accepted");
    setOpen(false);
  };

  const handleDeclineAll = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-preferences", JSON.stringify(onlyEssential));
    localStorage.setItem("cookie-consent", "declined");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <Cookie className="w-4 h-4" />
          {t.footer.cookieSettings}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            {t.cookieSettings.title}
          </DialogTitle>
          <DialogDescription>
            {t.cookieSettings.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Essential Cookies */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <Label className="text-sm font-medium">{t.cookieSettings.essential}</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.cookieSettings.essentialDesc}
                </p>
              </div>
            </div>
            <Switch checked={true} disabled className="opacity-50" />
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <Label htmlFor="analytics" className="text-sm font-medium cursor-pointer">
                  {t.cookieSettings.analytics}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.cookieSettings.analyticsDesc}
                </p>
              </div>
            </div>
            <Switch 
              id="analytics"
              checked={preferences.analytics} 
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
            />
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex gap-3">
              <Megaphone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <Label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                  {t.cookieSettings.marketing}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.cookieSettings.marketingDesc}
                </p>
              </div>
            </div>
            <Switch 
              id="marketing"
              checked={preferences.marketing} 
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleDeclineAll} className="w-full sm:w-auto">
            {t.cookieSettings.declineAll}
          </Button>
          <Button variant="outline" onClick={handleSave} className="w-full sm:w-auto">
            {t.cookieSettings.savePreferences}
          </Button>
          <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
            {t.cookieSettings.acceptAll}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
