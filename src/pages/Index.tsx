
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ServiceSection from "@/components/ServiceSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-deepNavy">
      <Header />
      <Hero />
      <div className="section-gradient">
        <AboutSection />
      </div>
      <div className="bg-navy">
        <TeamSection />
      </div>
      <div className="section-gradient">
        <ServiceSection />
      </div>
      <div className="bg-deepNavy">
        <TestimonialSection />
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
