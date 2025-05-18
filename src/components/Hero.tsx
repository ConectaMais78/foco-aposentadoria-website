
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="gradient-bg pt-32 pb-20 md:pt-40 md:pb-24"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Seu direito à <span className="text-orange">aposentadoria</span> é nossa prioridade
            </h1>
            <p className="text-white/90 mt-6 text-lg md:text-xl max-w-lg">
              Há mais de 15 anos ajudamos nossos clientes a conquistar seus benefícios previdenciários com segurança jurídica e eficiência.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange hover:bg-orangeLight text-white font-medium text-lg">
                <a href="#contato">
                  Consulta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 font-medium text-lg">
                <a href="#servicos">
                  Nossos Serviços
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-orange/20 rounded-lg blur-2xl"></div>
              <img 
                src="/placeholder.svg" 
                alt="Advogados de previdência" 
                className="relative rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
