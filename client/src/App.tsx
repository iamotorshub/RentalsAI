import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSplit from "@/components/ProblemSolutionSplit";
import AITechnologyShowcase from "@/components/AITechnologyShowcase";
import InteractiveDemo from "@/components/InteractiveDemo";
import PropertyGrid from "@/components/PropertyGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import IncomeCalculator from "@/components/IncomeCalculator";
import WhatsAppCTA from "@/components/WhatsAppCTA";

function RentalsAILanding() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem vs Solution */}
      <ProblemSolutionSplit />
      
      {/* AI Technology Showcase */}
      <AITechnologyShowcase />
      
      {/* Interactive Demo */}
      <InteractiveDemo />
      
      {/* Property Grid */}
      <PropertyGrid />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Income Calculator */}
      <IncomeCalculator />
      
      {/* Guarantee Section */}
      <GuaranteeSection />
      
      {/* WhatsApp CTA (Floating) */}
      <WhatsAppCTA />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RentalsAILanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
