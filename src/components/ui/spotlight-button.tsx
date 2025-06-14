
import React, { useState } from 'react';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  indicatorPosition: number;
  position: number;
}

const NavItem: React.FC<NavItemProps> = ({ 
  label, 
  isActive = false, 
  onClick,
  indicatorPosition,
  position
}) => {
  const distance = Math.abs(indicatorPosition - position);
  const spotlightOpacity = isActive ? 0.4 : Math.max(0, 0.2 - distance * 0.1);

  return (
    <button
      className="relative flex items-center justify-center w-20 h-10 mx-1 transition-all duration-300"
      onClick={onClick}
    >
      {/* Spotlight effect - mais sutil e integrado */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-radial from-orange/40 via-orange/20 to-transparent blur-sm rounded-full transition-all duration-300"
        style={{
          opacity: spotlightOpacity,
          transitionDelay: isActive ? '0.05s' : '0s',
        }}
      />
      {/* Background suave para o item ativo */}
      {isActive && (
        <div className="absolute inset-0 bg-orange/5 border border-orange/20 rounded-lg transition-all duration-200" />
      )}
      <span
        className={`text-sm font-medium transition-colors duration-200 relative z-10 ${
          isActive ? 'text-orange' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

interface AdminSpotlightNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export const AdminSpotlightNav: React.FC<AdminSpotlightNavProps> = ({ 
  activeIndex, 
  onNavigate 
}) => {
  const navItems = [
    { label: 'Blog' },
    { label: 'Mensagens' },
    { label: 'Sair' },
  ];

  return (
    <nav className="relative flex items-center px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
      {/* Indicador superior mais sutil */}
      <div 
        className="absolute top-0 h-[1px] bg-orange/60 transition-all duration-300 ease-in-out"
        style={{
          left: `${activeIndex * 88 + 12}px`,
          width: '80px',
          transform: 'translateY(-0.5px)',
        }}
      />
      {navItems.map((item, index) => (
        <NavItem
          key={item.label}
          label={item.label}
          isActive={activeIndex === index}
          onClick={() => onNavigate(index)}
          indicatorPosition={activeIndex}
          position={index}
        />
      ))}
    </nav>
  );
};
