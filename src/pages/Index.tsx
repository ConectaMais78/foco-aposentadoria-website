
import React from "react";
import Header from "@/components/Header";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import TeamSection from "@/components/TeamSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-deepNavy">
      <Header />
      <HeroGeometric 
        badge="Foco na Aposentadoria"
        title1="Seu direito à aposentadoria"
        title2="é nossa prioridade" 
      />
      <div className="section-gradient">
        <AboutSection />
      </div>
      <div className="section-gradient">
        <ServiceSection />
      </div>
      <div className="bg-deepNavy">
        <TestimonialSection />
      </div>
      <div className="section-gradient">
        <BlogSection />
      </div>
      <div className="section-gradient">
        <FaqSection />
      </div>
      <div className="bg-darkNavy">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
