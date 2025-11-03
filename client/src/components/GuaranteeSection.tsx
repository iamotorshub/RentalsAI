import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Timer, DollarSign, TrendingUp, Award } from "lucide-react";

export default function GuaranteeSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 15, minutes: 30 });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(countdown);
  }, []);

  const guarantees = [
    {
      icon: Shield,
      title: "SOPORTE COMPLETO INCLUIDO",
      description: "Acompañamiento personalizado desde la configuración inicial hasta la optimización continua",
      terms: "Incluye migración de datos, capacitación y soporte técnico especializado"
    },
    {
      icon: TrendingUp,
      title: "INTEGRACIÓN DIRECTA GARANTIZADA",
      description: "Conexión automática con Airbnb, Booking.com y más de 15 plataformas principales",
      terms: "Sincronización en tiempo real de calendarios, precios y disponibilidad"
    },
    {
      icon: DollarSign,
      title: "CONFIGURACIÓN SIN COSTO",
      description: "Setup completo de tu cuenta, migración de datos existentes y capacitación para tu equipo",
      terms: "Incluye optimización de listings y configuración de precios dinámicos"
    }
  ];

  const riskReversals = [
    "✅ Configuración completa incluida - sin costos adicionales",
    "✅ Migración de todas tus propiedades existentes",
    "✅ Capacitación personalizada para tu equipo",
    "✅ Soporte técnico especializado continuo",
    "✅ Actualizaciones y nuevas integraciones automáticas"
  ];

  return (
    <section className="py-16 lg:py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-golden via-transparent to-success"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          {/* Urgency Timer */}
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-3 sm:px-6 py-2 sm:py-3 rounded-full mb-6 max-w-full">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-base" data-testid="text-guarantee-countdown">
              Oferta Especial 2025: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-golden">COMPROMISO</span> Real Contigo
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Te acompañamos paso a paso para que aproveches al máximo todas las funcionalidades de la plataforma
          </p>
        </div>

        {/* Main Guarantees */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate transition-all duration-300 hover:border-golden/50 relative overflow-hidden group"
              data-testid={`card-guarantee-${index}`}
            >
              {/* Imagen de fondo única profesional con overlay para legibilidad */}
              <div className="absolute inset-0">
                <img
                  src="/images/hero-6.png"
                  alt=""
                  className="w-full h-full object-cover object-center brightness-130 saturate-110"
                />
                {/* Overlay más fuerte en mobile/tablet para mejor legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/30 md:from-black/35 md:via-black/25 md:to-black/30 max-md:from-black/75 max-md:via-black/65 max-md:to-black/70"></div>
              </div>

              <div className="text-center relative z-10">
                <div className="mx-auto w-16 h-16 bg-golden/30 backdrop-blur-md rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border border-golden/20">
                  <guarantee.icon className="w-8 h-8 text-golden drop-shadow-[0_4px_8px_rgba(0,0,0,1)]" />
                </div>

              <h3 className="font-bold text-xl mb-4 text-golden drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)]">
                {guarantee.title}
              </h3>

              <p className="text-white font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)] leading-relaxed">
                {guarantee.description}
              </p>

              <div className="p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-white/30">
                <p className="text-sm text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)]">
                  {guarantee.terms}
                </p>
              </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Central Commitment Statement */}
        <Card className="p-6 sm:p-12 text-center border-golden/30 mb-12 relative overflow-hidden">
          {/* Imagen de fondo única profesional con overlay para legibilidad */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-7.png"
              alt=""
              className="w-full h-full object-cover object-center brightness-130 saturate-110"
            />
            {/* Overlay más fuerte en mobile/tablet para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/25 md:from-black/30 md:via-black/20 md:to-black/25 max-md:from-black/70 max-md:via-black/60 max-md:to-black/65"></div>
          </div>

          <div className="relative z-10">
            <Award className="w-12 h-12 sm:w-16 sm:h-16 text-golden mx-auto mb-4 sm:mb-6 animate-[fadeInUp_0.6s_ease-out] drop-shadow-[0_4px_12px_rgba(0,0,0,1)]" />

            <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6 text-white animate-[fadeInUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_6px_rgb(0_0_0)]">
              NUESTRO <span className="text-golden drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_6px_rgb(0_0_0)]">COMPROMISO</span>
            </h3>

            <p className="text-sm sm:text-xl text-white font-bold mb-6 sm:mb-8 max-w-4xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)] leading-relaxed px-2">
              Te garantizamos una <span className="font-black text-golden drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)]">configuración perfecta</span>,
              integración completa con todas tus plataformas existentes, y
              <span className="font-black text-golden drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_4px_rgb(0_0_0)]"> soporte especializado continuo</span> para maximizar tu ocupación.
            </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
            <Badge className="bg-success text-success-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm animate-[fadeInUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards] shadow-lg">
              Soporte Incluido
            </Badge>
            <Badge className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm animate-[fadeInUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards] shadow-lg">
              Integración Completa
            </Badge>
            <Badge className="bg-accent text-accent-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm animate-[fadeInUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards] shadow-lg">
              Sin Costos Ocultos
            </Badge>
          </div>

          <div className="px-2">
            <Button
              size="lg"
              className="bg-golden hover:bg-golden/90 text-golden-foreground text-sm sm:text-xl font-bold px-6 sm:px-12 py-4 sm:py-6 rounded-full shadow-2xl animate-[fadeInUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards] w-full max-w-md mx-auto"
              onClick={() => {
                const event = new CustomEvent('openContactForm', { detail: { source: 'Agendar Demo Personalizada' } });
                window.dispatchEvent(event);
              }}
              data-testid="button-commitment-cta"
            >
              AGENDAR DEMO PERSONALIZADA
            </Button>
          </div>
          </div>
        </Card>

        {/* Risk Reversals */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-success">Cero Riesgo</span> Para Ti
            </h3>

            <div className="space-y-4">
              {riskReversals.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-success/10 border border-success/20 rounded-lg">
              <h4 className="font-bold text-success mb-2">Promesa Adicional:</h4>
              <p className="text-sm text-muted-foreground">
                Si alguna vez no estás 100% satisfecho, puedes cancelar con un simple email.
                Sin llamadas, sin formularios, sin complicaciones.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <h4 className="font-bold text-xl mb-6 text-center">
              Lo Que Incluimos vs La Competencia
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-destructive/10 rounded">
                <span className="text-sm">Otros:</span>
                <span className="font-medium text-destructive">Configuración por separado</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-golden/10 rounded">
                <span className="text-sm">Rentals AI:</span>
                <span className="font-medium text-golden">Todo incluido + soporte</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-success/10 rounded">
                <span className="text-sm">Integraciones:</span>
                <span className="font-bold text-success">15+ plataformas</span>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                La única forma de perder es no probarlo
              </p>
            </div>
          </Card>
        </div>

        {/* Animated Stats Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_8s_ease_infinite] rounded-2xl p-8 mt-16">
          <div className="grid md:grid-cols-4 gap-6 text-center text-white relative z-10">
            <div className="animate-[fadeInUp_0.6s_ease-out]">
              <div className="text-sm opacity-90 mb-1">Más de</div>
              <div className="text-5xl font-bold mb-2">150</div>
              <p className="text-sm opacity-90">propietarios confiaron</p>
            </div>
            <div className="animate-[fadeInUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
              <div className="text-5xl font-bold text-golden mb-2">15+</div>
              <p className="text-sm opacity-90">Plataformas integradas</p>
            </div>
            <div className="animate-[fadeInUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
              <div className="text-5xl font-bold text-golden mb-2">24/7</div>
              <p className="text-sm opacity-90">Soporte disponible</p>
            </div>
            <div className="animate-[fadeInUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
              <div className="text-5xl font-bold text-golden mb-2">150+</div>
              <p className="text-sm opacity-90">Propietarios activos</p>
            </div>
          </div>

          {/* Sparkle Effects */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-8 w-2 h-2 bg-golden rounded-full animate-ping [animation-delay:0.5s]"></div>
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log('View guarantee details clicked')}
            data-testid="button-guarantee-details"
          >
            Ver Términos Completos de Garantía
          </Button>
        </div>
      </div>
    </section>
  );
}
