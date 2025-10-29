import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      description:
        "Conversaciones naturales en español que califican leads, responden preguntas y cierran reservas automáticamente.",
      features: [
        "Comprende lenguaje natural argentino",
        "Responde consultas específicas sobre propiedades",
        "Maneja objeciones y cierra ventas",
        "Escalación inteligente a humanos cuando es necesario",
      ],
    },
    {
      icon: Users,
      title: "AGENTES IA",
      subtitle: "Califican, siguen y cierran automáticamente",
      description:
        "Agentes especializados que gestionan el ciclo completo de ventas desde la primera consulta hasta el check-out.",
      features: [
        "Calificación automática de prospectos",
        "Seguimiento personalizado por WhatsApp/Email",
        "Generación de propuestas personalizadas",
        "Cierre de reservas con contratos digitales",
      ],
    },
    {
      icon: BarChart3,
      title: "SINCRONIZACIÓN TOTAL",
      subtitle: "Calendarios, pagos, facturas en tiempo real",
      description:
        "Integración completa con todos los sistemas para mantener la información siempre actualizada y sincronizada.",
      features: [
        "Calendarios en tiempo real (Airbnb, Booking, etc.)",
        "Procesamiento automático de pagos",
        "Facturación y contabilidad automatizada",
        "Reportes de ocupación y rendimiento",
      ],
    },
    {
      icon: Sparkles,
      title: "ANALYTICS AVANZADOS",
      subtitle: "Cada consulta monitoreada y optimizada",
      description:
        "Dashboard con métricas IA que analizan el rendimiento y predicen oportunidades de mejora en tiempo real.",
      features: [
        "Tracking de conversiones en vivo",
        "Análisis del comportamiento de huéspedes",
        "Optimización automática de precios",
        "Predicciones de demanda con IA",
      ],
    },
  ];

  const current = pillars[selectedPillar];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Fondo dinámico con parallax y overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={selectedPillar}
          src="/images/hero-3.png"
          alt="Fondo tecnológico"
          className="w-full h-full object-cover object-center brightness-100 saturate-110 contrast-105 scale-100 filter"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-6 px-6 py-2 text-sm border-golden text-golden bg-black/40 backdrop-blur-md shadow-lg"
          >
            POWERED BY IA MOTORS HUB - BAHÍA BLANCA
          </Badge>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
            Tecnología de <span className="text-accent drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]">Vanguardia</span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-medium">
            4 pilares tecnológicos que revolucionan la gestión de alquileres temporarios
          </p>
        </div>

        {/* Pilares */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 backdrop-blur-md ${
                  selectedPillar === index
                    ? "border-accent bg-accent/20 shadow-2xl ring-2 ring-accent/60"
                    : "border-white/20 bg-black/40 hover:border-accent/50 hover:bg-black/50"
                }`}
                onClick={() => setSelectedPillar(index)}
              >
                <div className="text-center">
                  <div
                    className={`inline-flex p-4 rounded-xl mb-4 shadow-xl transition-all ${
                      selectedPillar === index
                        ? "bg-accent text-white shadow-accent/50"
                        : "bg-white/30 text-white shadow-black/50"
                    }`}
                  >
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{pillar.subtitle}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contenido del Pilar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPillar}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="relative overflow-hidden p-10 lg:p-16 bg-black/50 backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Texto */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-accent text-white shadow-2xl ring-2 ring-white/30 shadow-accent/30">
                      <current.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                        {current.title}
                      </h3>
                      <p className="text-golden text-lg font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {current.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-white leading-relaxed text-base bg-black/40 p-6 rounded-xl border border-white/30 shadow-xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {current.description}
                  </p>

                  <div className="space-y-3">
                    {current.features.map((f, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 bg-black/40 backdrop-blur-lg p-4 rounded-lg border border-white/30 shadow-xl hover:bg-black/50 hover:border-accent/50 transition-all"
                      >
                        <CheckCircle className="w-5 h-5 text-golden drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                        <span className="text-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Vista previa sistema */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-10 border border-white/30 shadow-2xl"
                >
                  <div className="text-center">
                    <div className="inline-flex p-5 rounded-full bg-accent mb-6 shadow-2xl ring-4 ring-white/30 shadow-accent/50">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                      Vista Previa del Sistema
                    </h4>
                    <p className="text-white mb-8 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      Dashboard en tiempo real mostrando la tecnología en acción
                    </p>

                    <div className="space-y-4 text-left">
                      {[
                        { label: "Consultas Atendidas Hoy", value: "+47", color: "bg-green-500" },
                        { label: "Reservas Cerradas", value: "12", color: "bg-golden" },
                        { label: "Tiempo de Respuesta", value: "18s", color: "bg-accent" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-white/30 backdrop-blur-sm shadow-xl hover:border-white/50 transition-all"
                        >
                          <span className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {item.label}
                          </span>
                          <Badge className={`${item.color} text-white border-0 font-bold px-3 py-1 shadow-lg`}>
                            {item.value}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full mt-8 bg-white hover:bg-white/90 text-primary font-bold text-base py-6 shadow-2xl hover:shadow-accent/50 border-2 border-white/50 transition-all hover:scale-105"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("openContactForm", {
                            detail: { source: "Ver Dashboard Completo" },
                          })
                        )
                      }
                    >
                      Ver Dashboard Completo
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-accent via-accent to-golden text-white font-bold text-lg px-12 py-7 rounded-full shadow-2xl overflow-hidden group hover:scale-105 transition-transform border-2 border-white/30"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("openContactForm", {
                  detail: { source: "Solicitar Demo Tecnológica" },
                })
              )
            }
          >
            <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Solicitar Demo Tecnológica</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-500 rounded-full"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}
