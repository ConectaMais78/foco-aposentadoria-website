
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

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
          ? "bg-deepNavy/95 backdrop-blur-sm shadow-lg py-2 sm:py-3 border-b border-white/10" 
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-playfair font-bold text-lg sm:text-xl md:text-2xl">
                Foco na <span className="text-orange">Aposentadoria</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Melhor alinhamento */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white/80 hover:text-white transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              Sobre
            </button>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-white/80 hover:text-white transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-white/80 hover:text-white transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-white/80 hover:text-white transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white transition-all duration-300 text-sm xl:text-base px-4 xl:px-6 whitespace-nowrap"
            >
              Contato
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2 touch-manipulation menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-deepNavy border-t border-white/10 z-50 mobile-menu">
          <div className="container mx-auto py-6 px-4 sm:px-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white/80 hover:text-white transition-colors font-medium py-3 text-left text-lg touch-manipulation"
            >
              Sobre
            </button>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium py-3 text-lg touch-manipulation"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-white/80 hover:text-white transition-colors font-medium py-3 text-left text-lg touch-manipulation"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-white/80 hover:text-white transition-colors font-medium py-3 text-left text-lg touch-manipulation"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-white/80 hover:text-white transition-colors font-medium py-3 text-left text-lg touch-manipulation"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white w-full transition-all duration-300 py-4 text-lg touch-manipulation"
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
