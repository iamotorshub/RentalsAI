import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Bot, User } from "lucide-react";

export default function WhatsAppCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [messages] = useState([
    {
      type: "ai",
      message: "¡Hola! Soy el Asistente IA de Rentals AI 👋",
      timestamp: "Ahora"
    },
    {
      type: "ai",
      message: "¿Te interesa saber cómo podemos triplicar las reservas de tu propiedad?",
      timestamp: "Ahora"
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      // Considera que estamos en Hero si el scroll es menor al 80% de la altura de la ventana
      const heroHeight = window.innerHeight * 0.8;
      setIsInHero(window.scrollY < heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hola! Me interesa saber más sobre Rentals AI. Quiero aumentar las reservas de mi propiedad en Monte Hermoso."
    );
    const phoneNumber = "5492915206692";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button - Arriba a la derecha siempre */}
      <div className="fixed top-6 right-6 z-50">
        {/* Chat Preview */}
        {isOpen && (
          <Card className="mb-4 w-80 max-w-[calc(100vw-3rem)] p-0 shadow-2xl border-success/20 bg-background">
            <div className="p-4 bg-success text-success-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rentals AI</h4>
                    <p className="text-xs opacity-90">En línea</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded"
                  data-testid="button-close-whatsapp"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === "ai" ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"
                  }`}>
                    {msg.type === "ai" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <div className={`p-2 rounded-lg text-sm ${
                      msg.type === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"
                    }`}>
                      {msg.message}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                data-testid="button-whatsapp-chat"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Continuar en WhatsApp
              </Button>
            </div>
          </Card>
        )}

        {/* Main Floating Button - Transparente en Hero */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`w-16 h-16 rounded-full bg-success hover:bg-success/90 text-success-foreground shadow-2xl transition-opacity duration-300 ${
            isInHero ? 'opacity-30 hover:opacity-50' : 'opacity-100'
          }`}
          data-testid="button-whatsapp-float"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}