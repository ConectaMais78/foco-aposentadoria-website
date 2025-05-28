
import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deepNavy text-white border-t border-white/10">
      <div className="container mx-auto py-12 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">
              Foco na <span className="text-orange">Aposentadoria</span>
            </h3>
            <p className="text-white/80 mb-4">
              Especialistas em direito previdenciário, ajudando você a conquistar seus benefícios com segurança jurídica.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-white hover:text-orange transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/foconaaposentadoria/?hl=es" className="text-white hover:text-orange transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com" className="text-white hover:text-orange transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Links Rápidos</h3>
            <div className="h-1 w-16 bg-gradient-to-r from-orange/50 to-orange mb-4"></div>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#sobre" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Sobre</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Blog</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Serviços</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Depoimentos</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Serviços</h3>
            <div className="h-1 w-16 bg-gradient-to-r from-orange/50 to-orange mb-4"></div>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Aposentadoria por Tempo</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Aposentadoria por Idade</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Aposentadoria Especial</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Pensão por Morte</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-orange transition-all duration-300 hover:translate-x-1 inline-block">Revisão de Benefícios</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Contato</h3>
            <div className="h-1 w-16 bg-gradient-to-r from-orange/50 to-orange mb-4"></div>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="tel:+5583991034305" className="hover:text-orange transition-all duration-300 hover:scale-105 inline-block">
                  +55 83 99103-4305
                </a>
              </li>
              <li>
                <a href="mailto:foconaaposentadoria@gmail.com" className="hover:text-orange transition-all duration-300 hover:scale-105 inline-block">
                  foconaaposentadoria@gmail.com
                </a>
              </li>
              <li>CEP: 58402-000, Brasil</li>
              <li className="mt-3 text-sm">
                <strong>Horário de Atendimento:</strong><br />
                Segunda a Quinta: 8:00 às 18:00<br />
                Sexta-feira: 8:00 às 12:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Foco na Aposentadoria. Todos os direitos reservados.
          </div>
          <div className="text-white/60 text-sm">
            <a href="#" className="hover:text-orange transition-all duration-300 mr-4">Política de Privacidade</a>
            <a href="#" className="hover:text-orange transition-all duration-300">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
