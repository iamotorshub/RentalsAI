import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Users, BarChart3, CheckCircle, Sparkles } from "lucide-react";

export default function AITechnologyShowcase() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      icon: MessageSquare,
      title: "CHATBOTS CONVERSACIONALES",
      subtitle: "Atienden como humanos, trabajan como máquinas",
      description: "Conversaciones naturales en español que califican leads, responden preguntas y cierran reservas automáticamente.",
      features: [
        "Comprende lenguaje natural argentino",
        "Responde consultas específicas sobre propiedades",
        "Maneja objeciones y cierra ventas",
        "Escalación inteligente a humanos cuando es necesario"
      ]
    },
    {
      icon: Users,
      title: "AGENTES IA",
      subtitle: "Califican, siguen y cierran automáticamente",
      description: "Agentes especializados que gestionan el ciclo completo de ventas desde la primera consulta hasta el check-out.",
      features: [
        "Calificación automática de prospectos",
        "Seguimiento personalizado por WhatsApp/Email",
        "Generación de propuestas personalizadas",
        "Cierre de reservas con contratos digitales"
      ]
    },
    {
      icon: BarChart3,
      title: "SINCRONIZACIÓN TOTAL",
      subtitle: "Calendarios, pagos, facturas en tiempo real",
      description: "Integración completa con todos los sistemas para mantener la información siempre actualizada y sincronizada.",
      features: [
        "Calendarios en tiempo real (Airbnb, Booking, etc.)",
        "Procesamiento automático de pagos",
        "Facturación y contabilidad automatizada",
        "Reportes de ocupación y ingresos"
      ]
    },
    {
      icon: Sparkles,
      title: "ANALYTICS AVANZADOS",
      subtitle: "Cada consulta monitoreada y optimizada",
      description: "Dashboard completo con métricas en tiempo real para optimizar continuamente el rendimiento de tu propiedad.",
      features: [
        "Tracking de conversiones en tiempo real",
        "Análisis de comportamiento de huéspedes",
        "Optimización automática de precios",
        "Predicciones de demanda con IA"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with IA Motors Hub Certification */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-accent text-accent">
            POWERED BY IA MOTORS HUB - BAHÍA BLANCA
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Tecnología de <span className="text-accent">Vanguardia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            4 pilares tecnológicos que revolucionan la gestión de alquileres temporarios
          </p>
        </div>

        {/* Interactive Pillars */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 hover-elevate ${
                selectedPillar === index
                  ? "border-accent bg-accent/5 shadow-lg"
                  : "border-border hover:border-accent/50"
              }`}
              onClick={() => setSelectedPillar(index)}
              data-testid={`card-pillar-${index}`}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-lg mb-4 ${
                  selectedPillar === index ? "bg-accent text-accent-foreground" : "bg-muted"
                }`}>
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sm mb-2">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground">{pillar.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Pillar Details */}
        <Card className="p-8 lg:p-12 border-accent/30 relative overflow-hidden shadow-2xl">
          {/* Imagen de fondo única con mejor brillo y overlay profesional */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-3.png"
              alt=""
              className="w-full h-full object-cover object-center brightness-150 saturate-100 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-accent/25"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 items-start relative z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-accent text-accent-foreground shadow-2xl ring-2 ring-white/30">
                  {(() => {
                    const IconComponent = pillars[selectedPillar].icon;
                    return <IconComponent className="w-8 h-8" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    {pillars[selectedPillar].title}
                  </h3>
                  <p className="text-golden font-semibold text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {pillars[selectedPillar].subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-xl">
                <p className="text-lg text-white font-medium leading-relaxed">
                  {pillars[selectedPillar].description}
                </p>
              </div>

              <div className="space-y-3">
                {pillars[selectedPillar].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-4 rounded-lg border border-white/25 hover:bg-white/20 transition-all shadow-lg">
                    <CheckCircle className="w-5 h-5 text-golden flex-shrink-0 drop-shadow-lg" />
                    <span className="text-sm text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-xl rounded-xl p-8 border-2 border-white/30 relative overflow-hidden shadow-2xl">
              <div className="text-center relative z-10">
                <div className="inline-flex p-4 rounded-full bg-accent/90 mb-4 shadow-2xl ring-4 ring-white/20">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-white text-2xl">Vista Previa del Sistema</h4>
                <p className="text-base text-white/95 mb-8 font-medium">
                  Dashboard en tiempo real mostrando la tecnología en acción
                </p>

                {/* Mock Dashboard Preview */}
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-success/20 to-success/10 rounded-lg border border-success/30 backdrop-blur-sm shadow-lg">
                    <span className="text-sm font-semibold text-white">Consultas Atendidas Hoy</span>
                    <Badge className="bg-success text-white border-0 shadow-md font-bold px-3 py-1">
                      +47
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-golden/20 to-golden/10 rounded-lg border border-golden/30 backdrop-blur-sm shadow-lg">
                    <span className="text-sm font-semibold text-white">Reservas Cerradas</span>
                    <Badge className="bg-golden text-white border-0 shadow-md font-bold px-3 py-1">
                      12
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg border border-accent/30 backdrop-blur-sm shadow-lg">
                    <span className="text-sm font-semibold text-white">Tiempo de Respuesta</span>
                    <Badge className="bg-accent text-white border-0 shadow-md font-bold px-3 py-1">
                      18s
                    </Badge>
                  </div>
                </div>

                <Button
                  className="w-full mt-8 bg-white/90 hover:bg-white text-primary font-bold text-base py-6 shadow-xl hover:shadow-2xl transition-all border-2 border-white/50"
                  onClick={() => console.log('Dashboard preview clicked')}
                  data-testid="button-dashboard-preview"
                >
                  Ver Dashboard Completo
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6"
            onClick={() => {
              const event = new CustomEvent('openContactForm', { detail: { source: 'Solicitar Demo Tecnológica' } });
              window.dispatchEvent(event);
            }}
            data-testid="button-technology-demo"
          >
            Solicitar Demo Tecnológica
          </Button>
        </div>
      </div>
    </section>
  );
}
