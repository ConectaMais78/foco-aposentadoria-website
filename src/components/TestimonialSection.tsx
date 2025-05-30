
import React from "react";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const TestimonialSection = () => {
  const testimonials = [
    {
      author: {
        name: "Maria Oliveira",
        handle: "Cliente desde 2018",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "Depois de anos tentando sozinha, consegui minha aposentadoria em apenas 4 meses com a ajuda do escritório. A equipe foi extremamente atenciosa e profissional durante todo o processo."
    },
    {
      author: {
        name: "João Santos",
        handle: "Cliente desde 2020",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Meu caso era complexo e já tinha sido negado duas vezes. O Dr. Carlos e sua equipe conseguiram reverter a situação com uma estratégia perfeita. Recomendo a todos."
    },
    {
      author: {
        name: "Ana Carolina",
        handle: "Cliente desde 2021",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Profissionalismo, atenção aos detalhes e comunicação clara durante todo o processo. Graças à Dra. Mariana, consegui minha aposentadoria especial sem complicações."
    }
  ];

  return (
    <TestimonialsSection
      title="O Que Nossos Clientes Dizem"
      description="A satisfação dos nossos clientes é o nosso maior orgulho. Confira alguns depoimentos de quem já conquistou seus direitos conosco."
      testimonials={testimonials}
      className="bg-white text-gray-900"
    />
  );
};

export default TestimonialSection;
