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
        <Card className="p-8 border-accent/20 bg-accent/5 relative overflow-hidden">
          {/* ✅ CORREGIDO: Opacidad aumentada de opacity-20 a opacity-50 */}
          <div className="absolute inset-0 opacity-50">
            <img
              src="/images/hero-4.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-lg bg-accent text-accent-foreground">
                  {(() => {
                    const IconComponent = pillars[selectedPillar].icon;
                    return <IconComponent className="w-8 h-8" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{pillars[selectedPillar].title}</h3>
                  <p className="text-accent font-medium">{pillars[selectedPillar].subtitle}</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {pillars[selectedPillar].description}
              </p>

              <div className="space-y-3">
                {pillars[selectedPillar].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/50 dark:bg-background/50 rounded-lg p-6 border relative overflow-hidden">
              {/* ✅ CORREGIDO: Opacidad aumentada de opacity-25 a opacity-50 */}
              <div className="absolute inset-0 opacity-50">
                <img
                  src="/images/hero-6.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center relative z-10">
                <Bot className="w-16 h-16 text-accent mx-auto mb-4" />
                <h4 className="font-bold mb-2">Vista Previa del Sistema</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Dashboard en tiempo real mostrando la tecnología en acción
                </p>

                {/* Mock Dashboard Preview */}
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                    <span className="text-sm">Consultas Atendidas Hoy</span>
                    <Badge variant="outline" className="text-success border-success">
                      +47
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-golden/10 rounded">
                    <span className="text-sm">Reservas Cerradas</span>
                    <Badge variant="outline" className="text-golden border-golden">
                      12
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded">
                    <span className="text-sm">Tiempo de Respuesta</span>
                    <Badge variant="outline" className="text-accent border-accent">
                      18s
                    </Badge>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  variant="outline"
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
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => console.log('Technology demo clicked')}
            data-testid="button-technology-demo"
          >
            Solicitar Demo Tecnológica
          </Button>
        </div>
      </div>
    </section>
  );
}
