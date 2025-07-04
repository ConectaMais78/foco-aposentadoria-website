import React from "react";
import { Shield, Gavel, Handshake } from "lucide-react";
const AboutSection = () => {
  return <section id="sobre" className="section-padding bg-white">
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
            <h3 className="text-xl font-bold text-navy mb-4 text-center"> Nossa Missão</h3>
            <p className="text-gray-600 text-center">Oferecer apoio jurídico especializado aos servidores públicos, garantindo segurança e clareza na hora da aposentadoria.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Gavel className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">Nossos Compromissos</h3>
            <p className="text-gray-600 text-center">Cuidamos de cada cliente com atenção e dedicação, buscando sempre o reconhecimento justo de seus direitos.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Handshake className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-4 text-center">Nossos Valores</h3>
            <p className="text-gray-600 text-center">Atuamos com ética, empatia e responsabilidade. Prezamos pela confiança, transparência e excelência em cada atendimento.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-100">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange/20 rounded-lg blur-xl"></div>
              <img alt="Escritório Foco na Aposentadoria" className="relative rounded-lg shadow-md w-full" src="/lovable-uploads/0f271489-d23d-48a2-8d42-f553e784dcde.jpg" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Nossa História
            </h3>
            <p className="text-gray-600 mb-4">Fundada em 2022 pela advogada Keyse Diana, a Foco na Aposentadoria nasceu com o propósito de atender, de forma especializada, servidores públicos que buscam segurança e clareza no processo de aposentadoria. A partir de sua experiência na área, Keyse identificou a necessidade de um serviço focado nas particularidades do direito previdenciário do funcionalismo público.</p>
            <p className="text-gray-600">Desde então, temos atuado com seriedade e compromisso, unindo conhecimento técnico, atendimento humanizado e tecnologia para garantir o melhor resultado aos nossos clientes. Já ajudamos centenas de servidores a planejarem e conquistarem seus direitos com tranquilidade, sempre com foco na qualidade, ética e no cuidado com cada caso.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;