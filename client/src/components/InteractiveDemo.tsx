import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, User, Bot, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [consultasAtendidas, setConsultasAtendidas] = useState(1547);

  const demoSteps = [
    {
      type: "user",
      message: "Hola, ¿está disponible el depto para la primera semana de enero?",
      timestamp: "14:23"
    },
    {
      type: "ai",
      message: "¡Hola! Sí, tengo disponibilidad para la primera semana de enero. ¿Para cuántas personas sería la reserva?",
      timestamp: "14:23",
      responseTime: "12 segundos"
    },
    {
      type: "user",
      message: "Somos 4 adultos y 2 niños. ¿Cuál sería el precio total?",
      timestamp: "14:25"
    },
    {
      type: "ai",
      message: "Perfecto, para 6 personas del 1 al 7 de enero el precio es $2.800 USD. Incluye limpieza, WiFi y estacionamiento. ¿Te interesa que prepare la reserva?",
      timestamp: "14:25",
      responseTime: "8 segundos"
    },
    {
      type: "user",
      message: "Sí, me interesa. ¿Qué necesitan para confirmar?",
      timestamp: "14:27"
    },
    {
      type: "ai",
      message: "Excelente! Te envío el link de pago seguro. Solo necesito 50% de seña ($1.400 USD). La reserva queda confirmada automáticamente al recibir el pago.",
      timestamp: "14:27",
      responseTime: "15 segundos",
      action: "Reserva en proceso"
    }
  ];

  const timeline = [
    { step: "Consulta Recibida", time: "00:00", status: "completed" },
    { step: "Respuesta Automática", time: "00:12", status: "completed" },
    { step: "Calificación del Lead", time: "00:30", status: "completed" },
    { step: "Propuesta Personalizada", time: "01:15", status: "completed" },
    { step: "Cierre de Venta", time: "02:45", status: "current" },
    { step: "Confirmación Automática", time: "03:00", status: "pending" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConsultasAtendidas(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStep < demoSteps.length) {
      const timer = setTimeout(() => {
        if (demoSteps[currentStep].type === "ai") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(prev => prev + 1);
          }, 2000);
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, currentStep === 0 ? 1000 : 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const resetDemo = () => {
    setCurrentStep(0);
    setIsTyping(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6 px-4">
            Demo <span className="text-accent">Interactivo</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Ve en tiempo real cómo nuestra IA convierte consultas en reservas confirmadas
          </p>

          {/* Live Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
            <Card className="p-3 sm:p-4 bg-success/5 border-success/20 w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-muted-foreground">Consultas Atendidas Hoy</p>
              <p className="text-xl sm:text-2xl font-bold text-success" data-testid="text-consultas-atendidas">
                {consultasAtendidas}
              </p>
            </Card>
            <Card className="p-3 sm:p-4 bg-golden/5 border-golden/20 w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-muted-foreground">Tiempo Promedio</p>
              <p className="text-xl sm:text-2xl font-bold text-golden">18s</p>
            </Card>
            <Card className="p-3 sm:p-4 bg-accent/5 border-accent/20 w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-muted-foreground">Tasa de Conversión</p>
              <p className="text-xl sm:text-2xl font-bold text-accent">94%</p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Chat Simulator */}
          <div>
            <Card className="h-[500px] sm:h-[600px] flex flex-col">
              <div className="p-3 sm:p-4 border-b bg-accent/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Rentals AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-xs text-success">En línea - Responde en segundos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {demoSteps.slice(0, currentStep).map((step, index) => (
                  <div
                    key={index}
                    className={`flex ${step.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${
                      step.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } rounded-lg p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        {step.type === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-70">{step.timestamp}</span>
                        {step.responseTime && (
                          <Badge variant="outline" className="text-xs">
                            {step.responseTime}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{step.message}</p>
                      {step.action && (
                        <div className="mt-2 p-2 bg-success/20 rounded text-xs text-success">
                          ✓ {step.action}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{animationDelay: "0.1s"}}></div>
                          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{animationDelay: "0.2s"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    data-testid="button-reset-demo"
                  >
                    Reiniciar Demo
                  </Button>
                  <div className="flex-1 bg-muted rounded-lg p-2 text-sm text-muted-foreground flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Demo automático en progreso...
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline and Analytics */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="p-6">
              <h3 className="font-bold text-xl mb-6">De Consulta a Reserva Confirmada</h3>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === "completed"
                        ? "bg-success text-success-foreground"
                        : item.status === "current"
                        ? "bg-golden text-golden-foreground"
                        : "bg-muted"
                    }`}>
                      {item.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : item.status === "current" ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.step}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    {item.status === "current" && (
                      <ArrowRight className="w-4 h-4 text-golden animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6">
              <h3 className="font-bold text-xl mb-6">Métricas de Rendimiento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-success/10 rounded">
                  <p className="text-2xl font-bold text-success">94%</p>
                  <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
                </div>
                <div className="text-center p-4 bg-golden/10 rounded">
                  <p className="text-2xl font-bold text-golden">18s</p>
                  <p className="text-sm text-muted-foreground">Tiempo Respuesta</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded">
                  <p className="text-2xl font-bold text-accent">24/7</p>
                  <p className="text-sm text-muted-foreground">Disponibilidad</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Consultas Perdidas</p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full bg-golden hover:bg-golden/90 text-golden-foreground"
              onClick={() => {
                const event = new CustomEvent('openContactForm', { detail: { source: 'Quiero Este Sistema Para Mi Propiedad' } });
                window.dispatchEvent(event);
              }}
              data-testid="button-demo-cta"
            >
              Quiero Este Sistema Para Mi Propiedad
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}