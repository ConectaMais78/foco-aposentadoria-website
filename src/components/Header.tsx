
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto py-4 px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <span className="text-navy font-montserrat font-bold text-xl md:text-2xl">
                Foco na <span className="text-orange">Aposentadoria</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#sobre"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Sobre
            </a>
            <a
              href="#advogados"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Advogados
            </a>
            <a
              href="#servicos"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Serviços
            </a>
            <a
              href="#depoimentos"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              FAQ
            </a>
            <Button
              asChild
              className="bg-orange hover:bg-orangeLight text-white"
            >
              <a href="#contato">Contato</a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            <a
              href="#sobre"
              className="text-gray-700 hover:text-navy transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Sobre
            </a>
            <a
              href="#advogados"
              className="text-gray-700 hover:text-navy transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Advogados
            </a>
            <a
              href="#servicos"
              className="text-gray-700 hover:text-navy transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Serviços
            </a>
            <a
              href="#depoimentos"
              className="text-gray-700 hover:text-navy transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-navy transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              FAQ
            </a>
            <Button
              asChild
              className="bg-orange hover:bg-orangeLight text-white w-full"
            >
              <a href="#contato" onClick={toggleMenu}>
                Contato
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
