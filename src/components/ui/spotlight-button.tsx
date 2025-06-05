
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
  const spotlightOpacity = isActive ? 1 : Math.max(0, 1 - distance * 0.6);

  return (
    <button
      className="relative flex items-center justify-center w-20 h-12 mx-2 transition-all duration-400"
      onClick={onClick}
    >
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-b from-white/40 to-transparent blur-lg rounded-full transition-opacity duration-400"
        style={{
          opacity: spotlightOpacity,
          transitionDelay: isActive ? '0.1s' : '0s',
        }}
      />
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
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
    { label: 'Dashboard' },
    { label: 'Blog' },
    { label: 'Mensagens' },
    { label: 'Admin' },
    { label: 'Sair' },
  ];

  return (
    <nav className="relative flex items-center px-2 py-3 bg-black/90 backdrop-blur-sm rounded-md shadow-lg border border-white/10">
      <div 
        className="absolute top-0 h-[2px] bg-white transition-all duration-400 ease-in-out"
        style={{
          left: `${activeIndex * 96 + 16}px`,
          width: '80px',
          transform: 'translateY(-1px)',
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
