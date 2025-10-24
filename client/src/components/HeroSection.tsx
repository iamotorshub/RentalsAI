import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Timer, Bot, TrendingUp } from "lucide-react";

// Images for hero carousel
const heroImages = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
  "/images/hero-4.png",
  "/images/hero-5.png",
  "/images/hero-6.png",
  "/images/hero-7.png"
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 15, minutes: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % heroImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Monte Hermoso Property ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* ✅ CORREGIDO: Opacidad reducida de 80%/60% a 30%/20% */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover-elevate"
        data-testid="button-prev-hero"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover-elevate"
        data-testid="button-next-hero"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency Timer */}
        <div className="inline-flex items-center gap-2 bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-4 py-2 rounded-full mb-6 animate-pulse">
          <Timer className="w-4 h-4" />
          <span className="text-sm font-medium" data-testid="text-countdown">
            Temporada 2025 - {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m restantes
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          GESTIÓN INTELIGENTE
          <br />
          <span className="text-golden">PARA TUS ALQUILERES</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto">
          Integración directa con <span className="font-bold text-golden">Airbnb, Booking y más</span> + Soporte completo para maximizar tu ocupación
        </p>

        {/* Key Benefits */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <p className="text-lg text-white/80 mb-2">
            Sincronización automática + IA 24/7
          </p>
          <p className="text-2xl md:text-3xl font-bold text-golden">
            CERO TRABAJO MANUAL
          </p>
        </div>

        {/* Split Preview Before/After */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-destructive/20 backdrop-blur-sm rounded-lg p-6 border border-destructive/30">
            <h3 className="text-xl font-bold text-white mb-4">GESTIÓN MANUAL</h3>
            <div className="space-y-2 text-white/80">
              <p className="flex items-center gap-2">📱 Actualizaciones manuales en cada plataforma</p>
              <p className="flex items-center gap-2">⏰ Calendarios desincronizados</p>
              <p className="flex items-center gap-2">📧 Respuestas lentas a consultas</p>
            </div>
          </div>
          <div className="bg-success/20 backdrop-blur-sm rounded-lg p-6 border border-success/30">
            <h3 className="text-xl font-bold text-white mb-4">CON RENTALS AI</h3>
            <div className="space-y-2 text-white/80">
              <p className="flex items-center gap-2"><Bot className="w-4 h-4" /> Integración directa con todas las plataformas</p>
              <p className="flex items-center gap-2">⚡ Sincronización automática en tiempo real</p>
              <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Asistente IA que nunca duerme</p>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-12 mb-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? "bg-golden" : "bg-white/40"
              }`}
              data-testid={`dot-carousel-${index}`}
            />
          ))}
        </div>

        {/* Main CTA Button */}
        <Button
          size="lg"
          className="bg-golden hover:bg-golden/90 text-golden-foreground font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          data-testid="button-main-cta"
        >
          VER DEMO EN VIVO
        </Button>

        {/* Secondary CTA */}
        <p className="text-white/70 mt-4">
          <button
            className="underline hover:text-golden transition-colors text-sm"
            data-testid="button-demo"
            onClick={() => console.log('Demo clicked')}
          >
            Conocer más sobre la plataforma
          </button>
        </p>
      </div>
    </section>
  );
}
