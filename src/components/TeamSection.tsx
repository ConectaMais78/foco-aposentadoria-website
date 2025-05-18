
import React from "react";
import { Briefcase } from "lucide-react";

const TeamSection = () => {
  const lawyers = [
    {
      id: 1,
      name: "Dr. Carlos Silva",
      role: "Advogado Sênior e Fundador",
      image: "/placeholder.svg",
      bio: "Especialista em Direito Previdenciário com mais de 20 anos de experiência. Formado pela USP e pós-graduado pela FGV.",
      specialties: ["Aposentadoria por tempo de contribuição", "Aposentadoria especial", "Revisões de benefícios"]
    },
    {
      id: 2,
      name: "Dra. Mariana Costa",
      role: "Advogada Previdenciária",
      image: "/placeholder.svg",
      bio: "Mestre em Direito Previdenciário pela PUC-SP com vasta experiência em processos administrativos junto ao INSS.",
      specialties: ["Pensão por morte", "Auxílio-doença", "Defesa administrativa"]
    },
    {
      id: 3,
      name: "Dr. Rafael Mendes",
      role: "Advogado Sênior",
      image: "/placeholder.svg",
      bio: "Especialista em casos complexos de aposentadoria. Doutor em Direito pela UERJ com mais de 15 anos no mercado.",
      specialties: ["Aposentadoria rural", "Benefícios assistenciais (LOAS)", "Contagem de tempo especial"]
    }
  ];

  return (
    <section id="advogados" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Nossa Equipe de Especialistas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Conheça os advogados especialistas que trabalham diariamente
            para garantir seus direitos previdenciários.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <div 
              key={lawyer.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy">{lawyer.name}</h3>
                <p className="text-orange font-semibold mb-3">{lawyer.role}</p>
                <p className="text-gray-600 mb-4">{lawyer.bio}</p>
                <div>
                  <h4 className="text-navy font-medium flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4" />
                    Especialidades:
                  </h4>
                  <ul className="text-gray-600 space-y-1 pl-6">
                    {lawyer.specialties.map((specialty, index) => (
                      <li key={index} className="list-disc">{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
