import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Bot, User } from "lucide-react";

export default function WhatsAppCTA() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hola! Me interesa saber más sobre Rentals AI. Quiero aumentar las reservas de mi propiedad en Monte Hermoso."
    );
    const phoneNumber = "5492915206692";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Preview */}
        {isOpen && (
          <Card className="mb-4 w-80 p-0 shadow-2xl border-success/20 bg-background">
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

        {/* Main Floating Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-16 h-16 rounded-full bg-success hover:bg-success/90 text-success-foreground shadow-2xl"
          data-testid="button-whatsapp-float"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium">Consultá con nuestro agente IA</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-l-4 border-l-border border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}