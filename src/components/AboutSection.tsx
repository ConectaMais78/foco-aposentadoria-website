
import React from "react";
import { Shield, Gavel, Handshake } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Sobre o Foco na Aposentadoria
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Somos um escritório especializado em direito previdenciário, dedicados a
            garantir os direitos dos nossos clientes com ética e excelência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">
              Nossa Missão
            </h3>
            <p className="text-gray-600 text-center">
              Oferecer soluções jurídicas personalizadas e eficazes para que cada cliente
              conquiste seus direitos previdenciários de forma segura e tranquila.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Gavel className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">
              Nossa Visão
            </h3>
            <p className="text-gray-600 text-center">
              Ser reconhecido como referência nacional em direito previdenciário,
              inovando constantemente para oferecer o melhor atendimento aos nossos clientes.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Handshake className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">
              Nossos Valores
            </h3>
            <p className="text-gray-600 text-center">
              Transparência, ética, compromisso, atendimento humanizado e
              resultados consistentes são os pilares que norteiam nosso trabalho.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-100">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange/20 rounded-lg blur-xl"></div>
              <img
                src="/placeholder.svg"
                alt="Escritório Foco na Aposentadoria"
                className="relative rounded-lg shadow-md w-full"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Nossa História
            </h3>
            <p className="text-gray-600 mb-4">
              Fundado em 2008 pelo Dr. Carlos Silva, o escritório Foco na Aposentadoria nasceu da paixão por defender os direitos previdenciários dos cidadãos brasileiros. Após anos trabalhando em grandes escritórios, Dr. Carlos decidiu criar uma firma especializada exclusivamente no direito previdenciário.
            </p>
            <p className="text-gray-600">
              Hoje, contamos com uma equipe de advogados especializados e já ajudamos mais de 5.000 clientes a conquistar seus benefícios previdenciários. Nossa abordagem combina conhecimento técnico, atendimento humanizado e tecnologia para oferecer o melhor serviço possível aos nossos clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
