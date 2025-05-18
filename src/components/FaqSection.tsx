
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FaqSection = () => {
  const faqs = [
    {
      id: "faq-1",
      question: "Qual é a idade mínima para se aposentar?",
      answer: "Com a reforma da previdência, a idade mínima para aposentadoria é de 65 anos para homens e 62 anos para mulheres, respeitando períodos de transição. Existem regras especiais para professores e trabalhadores rurais, além das regras de transição para quem já estava no sistema."
    },
    {
      id: "faq-2",
      question: "Como faço para solicitar uma revisão do meu benefício?",
      answer: "Para solicitar uma revisão, é necessário entrar com um pedido administrativo junto ao INSS ou ingressar com uma ação judicial. Recomendamos uma avaliação prévia com nossos especialistas para analisar se há real possibilidade de aumento do benefício e qual a melhor estratégia para seu caso."
    },
    {
      id: "faq-3",
      question: "Quais documentos preciso para dar entrada na aposentadoria?",
      answer: "Geralmente são necessários documentos pessoais (RG, CPF), carteira de trabalho, carnês de contribuição (se autônomo), comprovante de residência e documentos específicos de acordo com o tipo de aposentadoria. Em nossa primeira consulta, fornecemos uma lista personalizada para cada caso."
    },
    {
      id: "faq-4",
      question: "Quanto tempo demora para conseguir a aposentadoria?",
      answer: "O prazo legal para análise pelo INSS é de 45 dias, mas na prática pode levar mais tempo. Com nosso acompanhamento jurídico, buscamos agilizar o processo e, se necessário, podemos ingressar com ações judiciais para garantir uma resposta mais rápida."
    },
    {
      id: "faq-5",
      question: "Posso receber mais de um benefício previdenciário ao mesmo tempo?",
      answer: "Em regra, não é possível acumular benefícios da mesma natureza. Entretanto, existem exceções, como a possibilidade de acumular pensão por morte com aposentadoria, respeitando as regras de redução de valor. Cada caso deve ser analisado individualmente."
    },
    {
      id: "faq-6",
      question: "Como é calculado o custo dos serviços advocatícios?",
      answer: "Nossos honorários variam de acordo com a complexidade do caso. Trabalhamos principalmente com honorários de êxito, ou seja, só recebemos quando você ganha. Na consulta inicial gratuita, apresentamos uma proposta transparente e detalhada para seu caso específico."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tire suas dúvidas sobre direito previdenciário e como
            podemos ajudar você a conquistar seus benefícios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
                <AccordionTrigger className="text-navy font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-navy rounded-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-white/80 text-lg">
                Entre em contato conosco para uma consulta gratuita.
                Nossos especialistas estão prontos para esclarecer todas as suas dúvidas.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Button asChild size="lg" className="bg-orange hover:bg-orangeLight text-white font-medium text-lg px-8">
                <a href="#contato">
                  Agendar Consulta
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
