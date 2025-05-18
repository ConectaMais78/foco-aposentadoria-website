
import React from "react";
import { Shield, FileText, ClipboardCheck, Gavel, Search, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      title: "Aposentadoria por Tempo de Contribuição",
      description: "Avaliamos seu tempo de contribuição e organizamos a documentação necessária para garantir sua aposentadoria.",
      icon: Shield
    },
    {
      id: 2,
      title: "Aposentadoria por Idade",
      description: "Orientação completa para quem atingiu a idade mínima e deseja requerer o benefício previdenciário.",
      icon: FileText
    },
    {
      id: 3,
      title: "Aposentadoria Especial",
      description: "Análise e comprovação de trabalho em condições prejudiciais à saúde ou integridade física.",
      icon: ClipboardCheck
    },
    {
      id: 4,
      title: "Pensão por Morte",
      description: "Assistência aos dependentes na obtenção da pensão por morte de segurado do INSS.",
      icon: Gavel
    },
    {
      id: 5,
      title: "Revisão de Benefícios",
      description: "Identificamos e corrigimos erros no cálculo do seu benefício previdenciário.",
      icon: Search
    },
    {
      id: 6,
      title: "Auxílio-doença e Invalidez",
      description: "Suporte jurídico para requerimento de benefícios por incapacidade temporária ou permanente.",
      icon: ClipboardList
    }
  ];

  return (
    <section id="servicos" className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossos Serviços
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Oferecemos soluções completas em direito previdenciário,
            garantindo o melhor caminho para você conquistar seus benefícios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-orange/20 rounded-full flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Não encontrou o serviço que precisa?
              </h3>
              <p className="text-white/90 text-lg">
                Entre em contato conosco para uma avaliação personalizada do seu caso.
                Nossa equipe de especialistas está pronta para ajudar.
              </p>
            </div>
            <div className="md:w-1/4 flex justify-center">
              <Button asChild size="lg" className="bg-orange hover:bg-orangeLight text-white font-medium text-lg w-full md:w-auto">
                <a href="#contato">
                  Fale Conosco
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
