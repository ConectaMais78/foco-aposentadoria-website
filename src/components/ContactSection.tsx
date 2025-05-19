
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle the form submission
    console.log("Form submitted");
    // Show success message to user
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  return (
    <section id="contato" className="section-padding bg-darkNavy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Entre em Contato
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange/50 to-orange mx-auto"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Estamos prontos para ajudar você a conquistar seus direitos.
            Entre em contato para uma consulta gratuita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-gradient p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">
              Envie uma mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-200 font-medium">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-200 font-medium">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-gray-200 font-medium">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-gray-200 font-medium">
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  required
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-gray-200 font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Descreva sua situação..."
                  rows={5}
                  required
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white resize-none"
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white font-medium text-lg w-full transition-all duration-300"
                >
                  Enviar mensagem
                </Button>
                
                <a 
                  href="https://www.instagram.com/foconaaposentadoria/?hl=es" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full"
                >
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium text-lg w-full transition-all duration-300"
                  >
                    <Instagram className="mr-2 h-5 w-5" />
                    Siga-nos no Instagram
                  </Button>
                </a>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Informações de contato
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Telefone</h4>
                  <p className="text-gray-300">(11) 5555-5555</p>
                  <p className="text-gray-300">(11) 99999-9999 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">E-mail</h4>
                  <p className="text-gray-300">contato@foconaaposentadoria.com.br</p>
                  <p className="text-gray-300">atendimento@foconaaposentadoria.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Endereço</h4>
                  <p className="text-gray-300">
                    Av. Paulista, 1000, Sala 101
                    <br />
                    Bela Vista, São Paulo - SP
                    <br />
                    CEP: 01310-100
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Horário de atendimento</h4>
                  <p className="text-gray-300">
                    Segunda a Sexta: 9h às 18h
                    <br />
                    Sábado: 9h às 13h (com agendamento)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 h-64 md:h-80 bg-navy/30 rounded-lg overflow-hidden border border-white/10">
              {/* Here you would embed a map */}
              <div className="w-full h-full">
                <iframe
                  title="Mapa do escritório"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0761805513785!2d-46.65413572363864!3d-23.56529056137126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce599727838909%3A0x37fb388170b85486!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1684966837754!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
