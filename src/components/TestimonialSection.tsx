
import React from "react";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Oliveira",
      role: "Cliente desde 2018",
      image: "/placeholder.svg",
      text: "Depois de anos tentando sozinha, consegui minha aposentadoria em apenas 4 meses com a ajuda do escritório. A equipe foi extremamente atenciosa e profissional durante todo o processo.",
      stars: 5
    },
    {
      id: 2,
      name: "João Santos",
      role: "Cliente desde 2020",
      image: "/placeholder.svg",
      text: "Meu caso era complexo e já tinha sido negado duas vezes. O Dr. Carlos e sua equipe conseguiram reverter a situação com uma estratégia perfeita. Recomendo a todos.",
      stars: 5
    },
    {
      id: 3,
      name: "Ana Carolina",
      role: "Cliente desde 2021",
      image: "/placeholder.svg",
      text: "Profissionalismo, atenção aos detalhes e comunicação clara durante todo o processo. Graças à Dra. Mariana, consegui minha aposentadoria especial sem complicações.",
      stars: 5
    }
  ];

  return (
    <section id="depoimentos" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A satisfação dos nossos clientes é o nosso maior orgulho.
            Confira alguns depoimentos de quem já conquistou seus direitos conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-orange text-orange" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-navy">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
