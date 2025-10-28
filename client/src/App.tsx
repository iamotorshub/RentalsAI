import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HeroSection from "./components/HeroSection";
import ProblemSolutionSplit from "./components/ProblemSolutionSplit";
import AITechnologyShowcase from "./components/AITechnologyShowcase";
import InteractiveDemo from "./components/InteractiveDemo";
import PropertyGrid from "./components/PropertyGrid";
import TestimonialsSection from "./components/TestimonialsSection";
import GuaranteeSection from "./components/GuaranteeSection";
import IncomeCalculator from "./components/IncomeCalculator";
import WhatsAppCTA from "./components/WhatsAppCTA";
import ContactFormDialog from "./components/ContactFormDialog";

function App() {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactSource, setContactSource] = useState("");

  useEffect(() => {
    const handleOpenContactForm = (event: CustomEvent) => {
      setContactSource(event.detail?.source || "");
      setContactFormOpen(true);
    };

    window.addEventListener('openContactForm' as any, handleOpenContactForm);

    return () => {
      window.removeEventListener('openContactForm' as any, handleOpenContactForm);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <HeroSection />
        <ProblemSolutionSplit />
        <AITechnologyShowcase />
        <InteractiveDemo />
        <PropertyGrid />
        <TestimonialsSection />
        <IncomeCalculator />
        <GuaranteeSection />
        <WhatsAppCTA />
        <ContactFormDialog
          open={contactFormOpen}
          onOpenChange={setContactFormOpen}
          source={contactSource}
        />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
