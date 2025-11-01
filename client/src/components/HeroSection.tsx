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
              className="w-full h-full object-cover object-center brightness-150 contrast-110 saturate-110 scale-105"
            />
            {/* Overlay oscuro sutil para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
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
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.95)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_90%)] px-2">
          GESTIÓN INTELIGENTE
          <br />
          <span className="text-golden drop-shadow-[0_6px_12px_rgba(0,0,0,0.95)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_90%)]">PARA TUS ALQUILERES</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold mb-3 sm:mb-4 max-w-4xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_90%)] px-4">
          Integración directa con <span className="font-bold text-golden drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_90%)]">Airbnb, Booking y más</span> + Soporte completo para maximizar tu ocupación
        </p>

        {/* Key Benefits */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto mx-4">
          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-2">
            Sincronización automática + IA 24/7
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-golden">
            CERO TRABAJO MANUAL
          </p>
        </div>

        {/* Split Preview Before/After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
          <div className="bg-destructive/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-destructive/30">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">GESTIÓN MANUAL</h3>
            <div className="space-y-2 text-sm sm:text-base text-white/80">
              <p className="flex items-center gap-2">📱 Actualizaciones manuales en cada plataforma</p>
              <p className="flex items-center gap-2">⏰ Calendarios desincronizados</p>
              <p className="flex items-center gap-2">📧 Respuestas lentas a consultas</p>
            </div>
          </div>
          <div className="bg-success/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-success/30">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">CON RENTALS AI</h3>
            <div className="space-y-2 text-sm sm:text-base text-white/80">
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
          className="relative bg-gradient-to-r from-accent via-accent to-golden text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-full shadow-2xl overflow-hidden group hover:scale-105 transition-transform border-2 border-white/30 mx-4"
          onClick={() => {
            const event = new CustomEvent('openContactForm', { detail: { source: 'Ver Demo en Vivo - Hero' } });
            window.dispatchEvent(event);
          }}
          data-testid="button-main-cta"
        >
          <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">VER DEMO EN VIVO</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-500 rounded-full"></div>
        </Button>

        {/* Secondary CTA */}
        <p className="text-white/70 mt-4 px-4">
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
