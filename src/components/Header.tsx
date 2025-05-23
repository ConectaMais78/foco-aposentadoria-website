
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // If we're on the home page, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-deepNavy/95 backdrop-blur-sm shadow-lg py-3 border-b border-white/10" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-playfair font-bold text-xl md:text-2xl">
                Foco na <span className="text-orange">Aposentadoria</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Sobre
            </button>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white transition-all duration-300"
            >
              Contato
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-deepNavy border-t border-white/10">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white/80 hover:text-white transition-colors font-medium py-2 text-left"
            >
              Sobre
            </button>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-white/80 hover:text-white transition-colors font-medium py-2 text-left"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-white/80 hover:text-white transition-colors font-medium py-2 text-left"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-white/80 hover:text-white transition-colors font-medium py-2 text-left"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white w-full transition-all duration-300"
            >
              Contato
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
