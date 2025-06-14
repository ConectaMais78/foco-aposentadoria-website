
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5583991034305?text=Olá%2C%20tudo%20bem%3F', '_blank');
  };

  return (
    <section 
      id="home" 
      className="relative h-screen w-full"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
          alt="Justiça e Previdência Social"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay bg-gradient-to-b from-deepNavy/90 via-navy/80 to-darkNavy/90"></div>
      </div>
      
      {/* Centered content */}
      <div className="container mx-auto h-full relative flex flex-col items-center justify-center text-center px-6">
        <div className="animate-fade-in max-w-4xl glass-effect p-10 rounded-lg">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-gradient leading-tight mb-6">
            Seu direito à <span className="text-orange">aposentadoria</span> é nossa prioridade
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange/50 to-orange mx-auto mb-6"></div>
          <p className="text-white/90 mt-6 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Há mais de 15 anos ajudamos nossos clientes a conquistar seus benefícios previdenciários com segurança jurídica e eficiência.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleWhatsAppClick} size="lg" className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white font-medium text-lg transition-all duration-300">
              Consulta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-white/10 text-white border-white/30 font-medium text-lg">
              <a href="#servicos">
                Nossos Serviços
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
