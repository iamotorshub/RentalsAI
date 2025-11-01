import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PhoneOff, Clock, Calendar, DollarSign, Bot, Zap, BarChart3, TrendingUp } from "lucide-react";

export default function ProblemSolutionSplit() {
  const [lostBookings, setLostBookings] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setLostBookings(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const problemItems = [
    {
      icon: PhoneOff,
      title: "Llamadas perdidas después de las 18hs",
      description: "Los clientes llaman fuera del horario y nadie responde",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Respuestas tardías (clientes se van)",
      description: "Demoras de horas en responder = reservas perdidas",
      color: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Calendarios desactualizados",
      description: "Información incorrecta genera confusión y cancelaciones",
      color: "text-blue-600"
    },
    {
      icon: DollarSign,
      title: "Temporada perdida = $25,000 USD menos",
      description: "Cada oportunidad perdida cuesta miles de dólares",
      color: "text-blue-600"
    }
  ];

  const solutionItems = [
    {
      icon: Bot,
      title: "IA atiende 24/7/365",
      description: "Nunca más pierdas una consulta, sin importar la hora",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Respuesta en menos de 30 segundos",
      description: "Respuestas instantáneas que convierten consultas en reservas",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "Sincronización automática total",
      description: "Calendarios, pagos y facturas siempre actualizados",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      title: "150% más reservas garantizadas",
      description: "Resultados comprobados con garantía de satisfacción",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-blue-600">EL PROBLEMA</span> vs{" "}
            <span className="text-orange-600">LA SOLUCIÓN</span>
          </h2>

          {/* Real-time Counter */}
          <Card className="inline-block p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg max-w-sm mx-auto">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Reservas perdidas en tiempo real</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600" data-testid="text-lost-bookings">
              {lostBookings.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-blue-500">Solo en Monte Hermoso este año</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Problem Column */}
          <div className="space-y-4 sm:space-y-6 px-4">
            <div className="text-center lg:text-left mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-blue-600 mb-3 sm:mb-4">
                LO QUE PASA HOY
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Propietarios perdiendo oportunidades todos los días
              </p>
            </div>

            {problemItems.map((item, index) => (
              <Card
                key={index}
                className="p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover-elevate transition-all duration-300 shadow-md"
                data-testid={`card-problem-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-blue-100">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md">
              <p className="text-xl font-bold text-blue-600">
                RESULTADO: 70% menos ocupación promedio
              </p>
            </div>
          </div>

          {/* Solution Column */}
          <div className="space-y-4 sm:space-y-6 px-4">
            <div className="text-center lg:text-left mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-orange-600 mb-3 sm:mb-4">
                CON RENTALS AI
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Automatización inteligente que nunca duerme
              </p>
            </div>

            {solutionItems.map((item, index) => (
              <Card
                key={index}
                className="p-6 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 hover-elevate transition-all duration-300 shadow-md"
                data-testid={`card-solution-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-orange-100">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg shadow-md">
              <p className="text-xl font-bold text-orange-600">
                RESULTADO: 95%+ ocupación garantizada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}