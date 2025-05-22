
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            <Link
              to="/#sobre"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Sobre
            </Link>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              to="/#servicos"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Serviços
            </Link>
            <Link
              to="/#depoimentos"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Depoimentos
            </Link>
            <Link
              to="/#faq"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              FAQ
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white transition-all duration-300"
            >
              <Link to="/#contato">Contato</Link>
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
            <Link
              to="/#sobre"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/#servicos"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Serviços
            </Link>
            <Link
              to="/#depoimentos"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Depoimentos
            </Link>
            <Link
              to="/#faq"
              className="text-white/80 hover:text-white transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white w-full transition-all duration-300"
            >
              <Link to="/#contato" onClick={toggleMenu}>
                Contato
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
