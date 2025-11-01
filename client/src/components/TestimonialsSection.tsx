import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Play, Quote, TrendingUp, Calendar, DollarSign } from "lucide-react";

// Importar videos reales de testimonios
import mariaGonzalezVideo from "@assets/MARIA GONZALEZ.mp4";
import carlosMartinezVideo from "@assets/CARLOS MARTINEZ.mp4";
import anaRodriguezVideo from "@assets/ANA RODRIGUEZ.mp4";

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Testimonios reales con videos correspondientes
  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Propietaria de 3 departamentos",
      location: "Monte Hermoso",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      beforeOccupancy: 30,
      afterOccupancy: 95,
      monthlyIncrease: "$8,400",
      quote: "Pasé de tener mi departamento vacío 7 meses al año a tener lista de espera. La IA de Rentals AI convirtió mi inversión en una máquina de generar ingresos.",
      metrics: {
        reservasAntes: "2-3 por mes",
        reservasDespues: "28-30 por mes",
        tiempoLibre: "Recuperé mis fines de semana"
      },
      videoSrc: mariaGonzalezVideo,
      videoThumbnail: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Carlos Martínez",
      role: "Inversor inmobiliario",
      location: "Monte Hermoso",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      beforeOccupancy: 45,
      afterOccupancy: 92,
      monthlyIncrease: "$12,800",
      quote: "La IA cerró reservas mientras dormía. En 3 meses recuperé toda la inversión en el sistema. Ahora tengo 5 propiedades más con Rentals AI.",
      metrics: {
        reservasAntes: "Perdía 60% de consultas",
        reservasDespues: "99% de consultas atendidas",
        tiempoLibre: "Automatización completa"
      },
      videoSrc: carlosMartinezVideo,
      videoThumbnail: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      role: "Gestora de propiedades",
      location: "Monte Hermoso",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      beforeOccupancy: 35,
      afterOccupancy: 88,
      monthlyIncrease: "$15,200",
      quote: "Jamás perdí una consulta en temporada alta. El sistema maneja 10 propiedades simultáneamente mejor que yo podía manejar 2.",
      metrics: {
        reservasAntes: "Chaos total en temporada",
        reservasDespues: "Gestión automatizada perfecta",
        tiempoLibre: "Escalé mi negocio 5x"
      },
      videoSrc: anaRodriguezVideo,
      videoThumbnail: "/api/placeholder/400/250"
    }
  ];

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
    setIsVideoPlaying(false); // Reset video state when switching testimonials
  };

  const caseStudies = [
    {
      title: "Penthouse Vista al Mar",
      period: "Enero - Marzo 2024",
      beforeRevenue: "$4,200",
      afterRevenue: "$18,800",
      improvement: "+347%",
      details: "De 15 días ocupados a 89 días ocupados en temporada alta"
    },
    {
      title: "Suite Familiar Centro",
      period: "Diciembre 2023 - Febrero 2024",
      beforeRevenue: "$2,800",
      afterRevenue: "$11,400",
      improvement: "+307%",
      details: "Precio promedio subió de $95 a $180 por noche"
    },
    {
      title: "Loft Moderno Ejecutivo",
      period: "Octubre 2023 - Enero 2024",
      beforeRevenue: "$3,100",
      afterRevenue: "$12,600",
      improvement: "+306%",
      details: "Tiempo de respuesta bajó de 4 horas a 18 segundos"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-card to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary-rgb),0.3),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            Resultados <span className="text-success">Comprobados</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Propietarios reales que transformaron sus propiedades con nuestra IA
          </p>
        </div>

        {/* Video Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Testimonial Selector */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover-elevate ${
                  activeTestimonial === index
                    ? "border-success bg-success/5"
                    : "border-border hover:border-success/50"
                }`}
                onClick={() => handleTestimonialChange(index)}
                data-testid={`card-testimonial-${index}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.role} • {testimonial.location}
                    </p>

                    <div className="flex gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-destructive">{testimonial.beforeOccupancy}%</p>
                        <p className="text-xs text-muted-foreground">Antes</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-success">{testimonial.afterOccupancy}%</p>
                        <p className="text-xs text-muted-foreground">Después</p>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-golden border-golden">
                      +{testimonial.monthlyIncrease} USD/mes
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Testimonial Detail */}
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="relative h-64">
                {!isVideoPlaying ? (
                  // Video Thumbnail con botón Play
                  <div
                    className="relative rounded-xl overflow-hidden cursor-pointer group shadow-2xl"
                    onClick={handlePlayVideo}
                    data-testid="video-placeholder"
                  >
                    <video
                      src={testimonials[activeTestimonial].videoSrc}
                      className="w-full aspect-video object-cover"
                      preload="metadata"
                    />
                    <Button
                      size="lg"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 bg-white/90 hover:bg-white text-primary shadow-lg hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      onClick={handlePlayVideo}
                      data-testid="button-play-video"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-background/90 backdrop-blur-sm rounded px-3 py-1">
                      <p className="text-sm font-medium">
                        Testimonio de {testimonials[activeTestimonial].name}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
                      RESULTADOS REALES
                    </div>
                  </div>
                ) : (
                  // Video Player Real
                  <div className="relative h-full">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      poster={testimonials[activeTestimonial].videoThumbnail}
                      onEnded={() => setIsVideoPlaying(false)}
                      data-testid="video-testimonial"
                    >
                      <source src={testimonials[activeTestimonial].videoSrc} type="video/mp4" />
                      Tu navegador no soporta videos HTML5.
                    </video>
                    <div className="absolute top-4 right-4 bg-success/90 text-success-foreground px-2 py-1 rounded text-xs font-bold">
                      ▶ EN VIVO
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <Quote className="w-8 h-8 text-accent mb-4" />
              <blockquote className="text-lg italic mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Reservas</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {testimonials[activeTestimonial].metrics.reservasAntes} → {testimonials[activeTestimonial].metrics.reservasDespues}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Ocupación</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {testimonials[activeTestimonial].beforeOccupancy}% → {testimonials[activeTestimonial].afterOccupancy}%
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                  <span className="text-sm">Resultado</span>
                  <Badge className="bg-success text-success-foreground">
                    {testimonials[activeTestimonial].metrics.tiempoLibre}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-12 sm:mb-16 px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-center mb-8 sm:mb-12">
            Casos de Éxito con <span className="text-golden">Números Reales</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-case-study-${index}`}>
                <h4 className="font-bold text-lg mb-2">{study.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{study.period}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Antes:</span>
                    <span className="font-medium text-destructive">{study.beforeRevenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Después:</span>
                    <span className="font-medium text-success">{study.afterRevenue}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Mejora:</span>
                      <Badge className="bg-golden text-golden-foreground">
                        {study.improvement}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{study.details}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
            Únete a más de 150 propietarios que ya transformaron sus ingresos
          </p>
          <Button
            size="lg"
            className="bg-golden hover:bg-golden/90 text-golden-foreground text-sm sm:text-base px-6 sm:px-8"
            onClick={() => {
              const event = new CustomEvent('openContactForm', { detail: { source: 'Quiero Ser el Próximo Caso de Éxito' } });
              window.dispatchEvent(event);
            }}
            data-testid="button-join-success"
          >
            Quiero Ser el Próximo Caso de Éxito
          </Button>
        </div>
      </div>
    </section>
  );
}