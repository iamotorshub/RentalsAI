import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

declare const Calendly: any;

const CALENDLY_URL = "https://calendly.com/contacto-iamotorshub/30min";

export default function CalendlyButton() {
  const openCalendly = () => {
    if (typeof Calendly !== "undefined") {
      Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      <Button
        onClick={openCalendly}
        size="lg"
        className="rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white gap-2 px-5 h-14"
        data-testid="button-calendly"
      >
        <Calendar className="w-5 h-5" />
        <span className="font-semibold text-sm">Reservar Reunión</span>
      </Button>
    </div>
  );
}
