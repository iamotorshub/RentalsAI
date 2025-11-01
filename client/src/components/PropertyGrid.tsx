import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Bed,
  Bath,
  Users,
  MapPin,
  Bot,
  TrendingUp,
  Wifi,
  Car,
  UtensilsCrossed,
} from "lucide-react";

export default function PropertyGrid() {
  const [properties] = useState([
    {
      id: 1,
      title: "Penthouse Vista al Mar",
      location: "Monte Hermoso - Frente al Mar",
      images: [
        "/images/hero-1.png",
        "/images/hero-2.png",
        "/images/hero-3.png"
      ],
      beds: 3,
      baths: 2,
      maxGuests: 8,
      basePrice: 180,
      currentPrice: 220,
      occupancy: 95,
      aiStats: {
        consultasHoy: 47,
        reservasCerradas: 12,
        tiempoRespuesta: "18s",
      },
      amenities: ["WiFi", "Estacionamiento", "Cocina Completa", "Terraza"],
    },
    {
      id: 2,
      title: "Suite Familiar Premium",
      location: "Monte Hermoso - 2 Cuadras del Mar",
      images: [
        "/images/hero-4.png",
        "/images/hero-5.png",
        "/images/hero-6.png"
      ],
      beds: 2,
      baths: 1,
      maxGuests: 6,
      basePrice: 140,
      currentPrice: 165,
      occupancy: 88,
      aiStats: {
        consultasHoy: 32,
        reservasCerradas: 8,
        tiempoRespuesta: "15s",
      },
      amenities: ["WiFi", "Aire Acondicionado", "Cocina", "Parrilla"],
    },
    {
      id: 3,
      title: "Loft Moderno Ejecutivo",
      location: "Monte Hermoso - Centro",
      images: [
        "/images/hero-7.png",
        "/images/hero-1.png",
        "/images/hero-2.png"
      ],
      beds: 1,
      baths: 1,
      maxGuests: 4,
      basePrice: 120,
      currentPrice: 150,
      occupancy: 92,
      aiStats: {
        consultasHoy: 28,
        reservasCerradas: 9,
        tiempoRespuesta: "22s",
      },
      amenities: ["WiFi", "Smart TV", "Cocina", "Workspace"],
    },
  ]);

  // todo: remove mock functionality
  const [liveStats, setLiveStats] = useState(
    properties.map((p) => ({ ...p.aiStats })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          consultasHoy: stat.consultasHoy + Math.floor(Math.random() * 2),
          reservasCerradas:
            stat.reservasCerradas + (Math.random() > 0.8 ? 1 : 0),
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 90) return "text-success";
    if (occupancy >= 75) return "text-golden";
    return "text-destructive";
  };

  const getOccupancyBgColor = (occupancy: number) => {
    if (occupancy >= 90) return "bg-success/10 border-success/20";
    if (occupancy >= 75) return "bg-golden/10 border-golden/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            Propiedades con <span className="text-accent">IA Integrada</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada propiedad potenciada con inteligencia artificial para maximizar
            ocupación y rentabilidad
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {properties.map((property, index) => (
            <Card
              key={property.id}
              className="overflow-hidden hover-elevate transition-all duration-300 border-border hover:border-accent/50"
              data-testid={`card-property-${property.id}`}
            >
              {/* Property Image Carousel */}
              <Carousel className="w-full max-w-md mx-auto">
                <CarouselContent>
                  {property.images.map((imageUrl, i) => (
                    <CarouselItem key={i}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`${property.title} image ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2" />
              </Carousel>

              {/* Occupancy Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getOccupancyBgColor(property.occupancy)}`}
              >
                <span
                  className={`text-sm font-medium ${getOccupancyColor(property.occupancy)}`}
                >
                  {property.occupancy}% ocupado
                </span>
              </div>

              {/* Price Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-background/90 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-golden">
                    ${property.currentPrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${property.basePrice}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {Math.round(
                      ((property.currentPrice - property.basePrice) /
                        property.basePrice) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  por noche (precio dinámico)
                </p>
              </div>

              <div className="p-6">
                {/* Property Info */}
                <h3 className="font-bold text-xl mb-2">{property.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{property.maxGuests}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.amenities.length - 3} más
                    </Badge>
                  )}
                </div>

                {/* AI Stats */}
                <div className="bg-accent/5 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">
                      Actividad IA Hoy
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p
                        className="text-lg font-bold text-accent"
                        data-testid={`stat-consultas-${property.id}`}
                      >
                        {liveStats[index]?.consultasHoy}
                      </p>
                      <p className="text-xs text-muted-foreground">Consultas</p>
                    </div>
                    <div>
                      <p
                        className="text-lg font-bold text-success"
                        data-testid={`stat-reservas-${property.id}`}
                      >
                        {liveStats[index]?.reservasCerradas}
                      </p>
                      <p className="text-xs text-muted-foreground">Reservas</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-golden">
                        {property.aiStats.tiempoRespuesta}
                      </p>
                      <p className="text-xs text-muted-foreground">Respuesta</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    console.log(`View details for property ${property.id}`)
                  }
                  data-testid={`button-view-property-${property.id}`}
                >
                  Ver Detalles y Dashboard
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
          <Card className="p-6 text-center bg-success/5 border-success/20">
            <p className="text-3xl font-bold text-success mb-2">
              {Math.round(
                properties.reduce((sum, p) => sum + p.occupancy, 0) /
                  properties.length,
              )}
              %
            </p>
            <p className="text-sm text-muted-foreground">Ocupación Promedio</p>
          </Card>

          <Card className="p-6 text-center bg-accent/5 border-accent/20">
            <p className="text-3xl font-bold text-accent mb-2">
              {liveStats.reduce((sum, s) => sum + s.consultasHoy, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Consultas Hoy</p>
          </Card>

          <Card className="p-6 text-center bg-golden/5 border-golden/20">
            <p className="text-3xl font-bold text-golden mb-2">
              {liveStats.reduce((sum, s) => sum + s.reservasCerradas, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Reservas Cerradas</p>
          </Card>

          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <p className="text-3xl font-bold text-primary mb-2">19s</p>
            <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base px-6 sm:px-8"
            onClick={() => {
              const event = new CustomEvent('openContactForm', { detail: { source: 'Agregar Mi Propiedad al Sistema' } });
              window.dispatchEvent(event);
            }}
            data-testid="button-add-property"
          >
            Agregar Mi Propiedad al Sistema
          </Button>
        </div>
      </div>
    </section>
  );
}