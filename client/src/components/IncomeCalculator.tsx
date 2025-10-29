import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function IncomeCalculator() {
  const [currentOccupancy, setCurrentOccupancy] = useState([45]);
  const [averageRate, setAverageRate] = useState([150]);
  const [propertyType, setPropertyType] = useState("apartment");

  // Calculation logic - Realistic for Monte Hermoso (5 month season)
  const seasonDays = 150; // 5 months main season (Dec-April)
  const offSeasonDays = 215; // Rest of the year

  // Max rate for slider and calculation
  const maxRate = 250;

  // Current situation
  const currentSeasonOccupancy = currentOccupancy[0] / 100;
  const currentOffSeasonOccupancy = Math.max(0.1, currentOccupancy[0] / 400); // Much lower off-season

  const currentSeasonDays = Math.round(seasonDays * currentSeasonOccupancy);
  const currentOffSeasonDays = Math.round(offSeasonDays * currentOffSeasonOccupancy);
  const currentDaysOccupied = currentSeasonDays + currentOffSeasonDays;

  const seasonRate = averageRate[0];
  const offSeasonRate = Math.round(averageRate[0] * 0.6); // 40% less in off-season

  const currentAnnualIncome = (currentSeasonDays * seasonRate) + (currentOffSeasonDays * offSeasonRate);

  // With AI - Valores realistas y conservadores
  const aiSeasonOccupancy = Math.min(0.92, currentSeasonOccupancy * 1.45); // Max 92% en temporada
  const aiOffSeasonOccupancy = Math.min(0.15, currentOffSeasonOccupancy * 2.5); // Mejor pero realista fuera de temporada

  const aiSeasonDays = Math.round(seasonDays * aiSeasonOccupancy);
  const aiOffSeasonDays = Math.round(offSeasonDays * aiOffSeasonOccupancy);
  const aiDaysOccupied = aiSeasonDays + aiOffSeasonDays;

  // Tarifa temporada alta mejorada, baja temporada al 50%
  const aiSeasonRate = Math.min(maxRate, averageRate[0] * 1.20); // 20% aumento máximo
  const aiOffSeasonRate = averageRate[0] * 0.50; // 50% en baja temporada

  const aiAnnualIncome = (aiSeasonDays * aiSeasonRate) + (aiOffSeasonDays * aiOffSeasonRate);

  const totalIncrease = aiAnnualIncome - currentAnnualIncome;
  const percentageIncrease = Math.round(((aiAnnualIncome - currentAnnualIncome) / currentAnnualIncome) * 100);

  // System cost (mock)
  const systemCost = 2400; // Annual cost
  const netProfit = totalIncrease - systemCost;
  const roi = Math.round((netProfit / systemCost) * 100);

  const propertyTypes = [
    { id: "apartment", label: "Departamento", multiplier: 1.0 },
    { id: "house", label: "Casa", multiplier: 1.2 },
    { id: "penthouse", label: "Penthouse", multiplier: 1.5 },
    { id: "studio", label: "Monoambiente", multiplier: 0.8 }
  ];

  const getMultiplier = () => {
    return propertyTypes.find(p => p.id === propertyType)?.multiplier || 1.0;
  };

  const adjustedIncrease = totalIncrease * getMultiplier();
  const adjustedNetProfit = adjustedIncrease - systemCost;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Calculadora de <span className="text-golden">Ingresos Potenciales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre cuánto dinero podrías ganar con nuestra IA en tu propiedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Datos de Tu Propiedad</h3>
            </div>

            <div className="space-y-8">
              {/* Property Type */}
              <div>
                <Label className="text-base font-medium mb-4 block">Tipo de Propiedad</Label>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setPropertyType(type.id)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all hover-elevate ${
                        propertyType === type.id
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:border-accent/50"
                      }`}
                      data-testid={`button-property-${type.id}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Occupancy */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base font-medium">
                    Ocupación en Temporada Alta
                  </Label>
                  <span className="text-accent font-semibold">{currentOccupancy[0]}%</span>
                </div>
                <Slider
                  value={currentOccupancy}
                  onValueChange={setCurrentOccupancy}
                  max={90}
                  min={10}
                  step={5}
                  className="mb-2"
                  data-testid="slider-occupancy"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>10% (Baja)</span>
                  <span>90% (Alta)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentDaysOccupied} días ocupados al año (estimado)
                </p>
              </div>

              {/* Average Rate */}
              <div>
                <Label className="text-base font-medium mb-4 block">
                  Tarifa Promedio por Noche: <span className="text-accent font-semibold">${averageRate[0]} USD</span>
                </Label>
                <Slider
                  value={averageRate}
                  onValueChange={setAverageRate}
                  min={100}
                  max={250}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$100 USD</span>
                  <span>$250 USD</span>
                </div>
              </div>

              {/* Current Stats */}
              <Card className="p-4 bg-destructive/5 border-destructive/20">
                <h4 className="font-medium text-destructive mb-3">Situación Actual (Sin IA)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Días ocupados:</span>
                    <span className="font-medium">{currentDaysOccupied}/365</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Días vacíos:</span>
                    <span className="font-medium text-destructive">{365 - currentDaysOccupied}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Ingresos anuales estimados:</span>
                    <span className="font-bold">${currentAnnualIncome.toLocaleString()} USD</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* AI Projection */}
            <Card className="p-8 bg-success/5 border-success/20">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-success" />
                <h3 className="text-2xl font-bold text-success">Proyección con Rentals AI</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Ocupación proyectada:</span>
                  <Badge className="bg-orange-500 text-white">
                    {Math.round((aiDaysOccupied/365)*100)}% (+{Math.round(((aiDaysOccupied-currentDaysOccupied)/365)*100)}%)
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span>Tarifa promedio optimizada:</span>
                  <Badge className="bg-golden text-golden-foreground">
                    ${Math.round((aiSeasonRate + aiOffSeasonRate)/2)} USD (+{Math.round(((aiSeasonRate-seasonRate)/seasonRate)*100)}% temporada)
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span>Días ocupados:</span>
                  <span className="font-medium">{aiDaysOccupied}/365</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Nuevos ingresos anuales estimados:</span>
                  <span className="text-2xl font-bold text-success" data-testid="text-ai-income">
                    ${Math.round(aiAnnualIncome * getMultiplier()).toLocaleString()} USD
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Incremento estimado de ${Math.round(adjustedIncrease).toLocaleString()} USD (+{percentageIncrease}%)
                </p>
              </div>
            </Card>

            {/* ROI Analysis */}
            <Card className="p-8 bg-golden/5 border-golden/20">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-golden" />
                <h3 className="text-2xl font-bold text-golden">Análisis de Retorno</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                  <span>Costo anual del sistema:</span>
                  <span className="font-medium">$2,400 USD</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-success/20 rounded">
                  <span>Incremento anual potencial:</span>
                  <span className="font-bold text-success">
                    +${Math.round(adjustedIncrease).toLocaleString()} USD
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-golden/20 rounded">
                  <span>Ganancia neta anual estimada:</span>
                  <span className="font-bold text-golden" data-testid="text-net-profit">
                    ${Math.round(adjustedNetProfit).toLocaleString()} USD
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-accent/20 rounded">
                  <span>ROI anual estimado:</span>
                  <span className="font-bold text-accent">{Math.round((adjustedNetProfit/systemCost)*100)}%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">El sistema se paga solo en:</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {Math.ceil((systemCost * 12) / adjustedIncrease)} meses
                </p>
              </div>
            </Card>

            {/* Warning */}
            <Card className="p-6 bg-destructive/5 border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive mb-2">Costo de No Actuar</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada mes que retrases la implementación, podrías estar perdiendo aproximadamente
                    <span className="font-bold text-destructive"> ${Math.round(adjustedIncrease/12).toLocaleString()} USD</span> en ingresos potenciales.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-golden hover:bg-golden/90 text-golden-foreground text-lg py-6"
                onClick={() => {
                  const event = new CustomEvent('openContactForm', { detail: { source: 'Conseguir Estos Resultados Ahora' } });
                  window.dispatchEvent(event);
                }}
                data-testid="button-calculator-cta"
              >
                Conseguir Estos Resultados Ahora
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Resultados estimados basados en datos de +150 propiedades gestionadas con Rentals AI.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            * Los resultados son estimaciones y pueden variar según la ubicación específica, tipo de propiedad, demanda del mercado y la correcta aplicación de las estrategias. Los cálculos se basan en el promedio de mejoras observadas en propiedades gestionadas por Rentals AI durante los primeros meses de implementación.
          </p>
        </div>
      </div>
    </section>
  );
}