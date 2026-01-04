import { useState } from "react";
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
import { Cookie } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CookieSettings = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const currentConsent = localStorage.getItem("cookie-consent");

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setOpen(false);
  };

  const handleReset = () => {
    localStorage.removeItem("cookie-consent");
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <Cookie className="w-4 h-4" />
          {t.footer.cookieSettings}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            {t.cookieSettings.title}
          </DialogTitle>
          <DialogDescription>
            {t.cookieSettings.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            {t.cookieSettings.currentStatus}: {" "}
            <span className="font-medium text-foreground">
              {currentConsent === "accepted" 
                ? t.cookieSettings.accepted 
                : currentConsent === "declined" 
                  ? t.cookieSettings.declined 
                  : t.cookieSettings.notSet}
            </span>
          </p>
          
          <p className="text-sm text-muted-foreground">
            {t.cookieSettings.info}
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleDecline}>
            {t.cookieSettings.decline}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            {t.cookieSettings.reset}
          </Button>
          <Button onClick={handleAccept}>
            {t.cookieSettings.accept}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
