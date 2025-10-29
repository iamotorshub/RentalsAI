
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Phone, Video, Calendar as CalendarIcon, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface ContactFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  webInstagram?: string;
  descripcion?: string;
}

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

export default function ContactFormDialog({ open, onOpenChange, source = "" }: ContactFormDialogProps) {
  const [contactType, setContactType] = useState<"call" | "meeting" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  // Configuración de WhatsApp
  const WHATSAPP_EMPRESA = "5492915206692"; // Número de IA MOTORSHUB (del WhatsAppCTA.tsx)

  // Horarios disponibles de 11:00 a 20:00 cada 30 minutos
  const timeSlots = [];
  for (let hour = 11; hour <= 19; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 19) timeSlots.push(`${hour}:30`);
  }
  timeSlots.push("20:00");

  const sendEmailMutation = useMutation({
    mutationFn: async (data: ContactFormData & { tipo: string; fecha?: string; hora?: string }) => {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error al enviar el email');
      return response.json();
    },
    onSuccess: (_, variables) => {
      setIsSuccess(true);

      // Mensaje de WhatsApp para la EMPRESA
      const whatsappMensajeEmpresa = `🔔 *Nueva Solicitud - Rentals AI*\n\n` +
        `📋 *Tipo:* ${variables.tipo}\n` +
        `👤 *Nombre:* ${variables.nombre}\n` +
        `📱 *WhatsApp:* ${variables.whatsapp}\n` +
        `📧 *Email:* ${variables.email}\n` +
        (variables.webInstagram ? `🌐 *Web/Instagram:* ${variables.webInstagram}\n` : '') +
        (variables.descripcion ? `💬 *Descripción:* ${variables.descripcion}\n` : '') +
        (variables.fecha && variables.hora ? `📅 *Fecha y hora:* ${variables.fecha} a las ${variables.hora}\n` : '') +
        `\n📍 *Fuente:* ${source || 'Web'}`;

      const whatsappUrlEmpresa = `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(whatsappMensajeEmpresa)}`;

      // Mensaje de WhatsApp para el CLIENTE
      const clienteWhatsapp = variables.whatsapp.replace(/[^0-9]/g, ''); // Limpiar número
      const whatsappMensajeCliente = `¡Hola ${variables.nombre}! 👋\n\n` +
        `Gracias por tu solicitud de *${variables.tipo}* en Rentals AI.\n\n` +
        `Hemos recibido tu información:\n` +
        (variables.fecha && variables.hora ? `📅 Fecha: ${variables.fecha} a las ${variables.hora}\n` : '') +
        `\n✅ Confirmamos que nos pondremos en contacto contigo pronto.\n\n` +
        `Mientras tanto, si tenés alguna consulta, podés responder este mensaje.\n\n` +
        `*Equipo Rentals AI*\n` +
        `IA MOTORSHUB - Bahía Blanca`;

      const whatsappUrlCliente = `https://wa.me/${clienteWhatsapp}?text=${encodeURIComponent(whatsappMensajeCliente)}`;

      // Abrir WhatsApp para enviar a la empresa (delay 1 segundo)
      setTimeout(() => {
        window.open(whatsappUrlEmpresa, '_blank', 'noopener,noreferrer');
      }, 1000);

      // Abrir WhatsApp para enviar al cliente (delay 2.5 segundos)
      setTimeout(() => {
        window.open(whatsappUrlCliente, '_blank', 'noopener,noreferrer');
      }, 2500);

      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
        reset();
        setContactType(null);
        setSelectedDate(undefined);
        setSelectedTime(undefined);
      }, 4000);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    if (!contactType) return;

    const emailData = {
      ...data,
      tipo: contactType === "call" ? "Llamada" : "Videollamada",
      fuente: source,
      ...(contactType === "meeting" && selectedDate && selectedTime && {
        fecha: selectedDate.toLocaleDateString('es-AR'),
        hora: selectedTime
      })
    };

    sendEmailMutation.mutate(emailData);
  };

  const handleContactTypeSelect = (type: "call" | "meeting") => {
    setContactType(type);
    if (type === "call") {
      handleSubmit(onSubmit)();
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Solicitud Enviada!</h3>
            <p className="text-muted-foreground mb-4">
              ✅ Email enviado a nuestro equipo y a tu correo
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              📱 Se abrirán 2 ventanas de WhatsApp:
            </p>
            <ul className="text-xs text-muted-foreground text-left mx-auto max-w-xs space-y-1">
              <li>• WhatsApp a nuestro equipo (notificación)</li>
              <li>• WhatsApp de confirmación para ti</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Solo haz click en "Enviar" en cada ventana
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contactanos</DialogTitle>
          <DialogDescription>
            {source && `Fuente: ${source}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input
              id="nombre"
              {...register("nombre", { required: "El nombre es requerido" })}
              placeholder="Juan Pérez"
            />
            {errors.nombre && <p className="text-sm text-destructive mt-1">{errors.nombre.message}</p>}
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input
              id="whatsapp"
              {...register("whatsapp", { 
                required: "El WhatsApp es requerido",
                pattern: { value: /^[0-9+\s()-]+$/, message: "Formato de teléfono inválido" }
              })}
              placeholder="+54 9 291 123-4567"
            />
            {errors.whatsapp && <p className="text-sm text-destructive mt-1">{errors.whatsapp.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "El email es requerido",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
              })}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="webInstagram">Web/Instagram (Opcional)</Label>
            <Input
              id="webInstagram"
              {...register("webInstagram")}
              placeholder="@tuinstagram o www.tuweb.com"
            />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción (Opcional)</Label>
            <Textarea
              id="descripcion"
              {...register("descripcion")}
              placeholder="Cuéntanos sobre tu propiedad o tus necesidades..."
              rows={3}
            />
          </div>

          {!contactType && (
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2"
                onClick={() => setContactType("call")}
              >
                <Phone className="w-6 h-6" />
                <span className="font-bold">Quiero que me llamen</span>
              </Button>

              <Button
                type="button"
                size="lg"
                className="h-auto py-6 flex flex-col gap-2 bg-accent hover:bg-accent/90"
                onClick={() => setContactType("meeting")}
              >
                <Video className="w-6 h-6" />
                <span className="font-bold">Agendar Videollamada Gratuita</span>
              </Button>
            </div>
          )}

          {contactType === "call" && (
            <div className="pt-4 border-t">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-golden hover:bg-golden/90 text-golden-foreground font-bold"
                disabled={sendEmailMutation.isPending}
                onClick={handleSubmit(onSubmit)}
              >
                {sendEmailMutation.isPending ? "Enviando..." : "Enviar Solicitud de Llamada"}
              </Button>
            </div>
          )}

          {contactType === "meeting" && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-accent font-medium">
                <CalendarIcon className="w-5 h-5" />
                <span>Selecciona fecha y horario</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <Label>Horario disponible</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? "bg-accent" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-golden hover:bg-golden/90 text-golden-foreground font-bold"
                disabled={!selectedDate || !selectedTime || sendEmailMutation.isPending}
              >
                {sendEmailMutation.isPending ? "Enviando..." : "Agendar Cita"}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
