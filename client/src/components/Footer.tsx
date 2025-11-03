import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-golden to-accent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid md:grid-cols-3 gap-8 mb-1">
          {/* Logo Rentals AI - Agrandado 25% + Responsive */}
          <div className="text-center md:text-left">
            <img
              src="/images/rentalsai-finalsinfondo.png"
              alt="Rentals AI"
              className="h-32 sm:h-40 mx-auto md:mx-0 mb-3 sm:mb-4 filter drop-shadow-lg"
              onError={(e) => {
                // Fallback si no existe el logo
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-accent to-golden bg-clip-text text-transparent">
                Rentals AI
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 leading-relaxed px-4 md:px-0">
              Transformamos propiedades en máquinas de generar ingresos con IA de última generación.
            </p>
          </div>

          {/* Información de Contacto */}
          <div className="text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-golden">Contacto</h4>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
              <a
                href="tel:+5492915206692"
                className="flex items-center gap-3 hover:text-golden transition-colors group justify-center md:justify-start"
              >
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span>+54 9 291 520-6692</span>
              </a>

              <a
                href="mailto:contacto@iamotorshub.com"
                className="flex items-center gap-3 hover:text-golden transition-colors group justify-center md:justify-start"
              >
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span>contacto@iamotorshub.com</span>
              </a>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>Bahía Blanca, Buenos Aires</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-golden">Empresa</h4>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <a
                href="https://wa.me/5492915206692"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors justify-center md:justify-start group"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openContactForm', { detail: { source: 'Footer' }}))}
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors justify-center md:justify-start w-full md:w-auto"
              >
                <span>Solicitar Demo</span>
              </button>

              <a
                href="https://www.iamotorshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors justify-center md:justify-start group"
              >
                <span>Nuestra Tecnología</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-0"></div>

        {/* Powered by IA MOTORSHUB - Profesional y compacto */}
        <div className="text-center py-1">
          <p className="text-gray-400 text-sm mb-0">Powered by</p>
          <img
            src="/images/logo-footer.png"
            alt="IA MOTORSHUB"
            className="h-[400px] w-auto mx-auto -my-32"
            style={{ maxWidth: '100%', objectFit: 'contain' }}
            onError={(e) => {
              // Fallback si no existe el logo
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden">
            <h3 className="text-2xl font-bold text-white mb-6">
              IA MOTORSHUB
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-base font-semibold mb-0 -mt-4 animate-[fadeInUp_0.8s_ease-out]">
            <span className="text-golden animate-[fadeInUp_0.8s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">🚀 Inteligencia Artificial</span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="text-accent animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">💡 Soluciones Tecnológicas</span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="text-success animate-[fadeInUp_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">🎯 Automatización de Negocios</span>
          </div>

          <p className="text-gray-500 text-xs mt-1 mb-0 animate-[fadeInUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            © {new Date().getFullYear()} IA MOTORSHUB. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
