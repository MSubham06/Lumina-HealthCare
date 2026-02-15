import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo_cir.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    // Points to #appointment so it scrolls to the form
    { name: 'Contact', href: '#appointment' }, 
  ];

  return (
    <nav 
      // ADDED: cursor-pointer to the main container to enforce hand cursor everywhere
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 cursor-pointer ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center cursor-pointer">
        
        {/* BRAND LOGO SECTION */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <img 
            src={Logo} 
            alt="Lumina Health Logo" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover group-hover:scale-105 transition-transform cursor-pointer"
          />
          <span className="text-2xl md:text-3xl font-black text-primary tracking-tighter cursor-pointer">
            Lumina<span className="text-secondary-foreground cursor-pointer">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 cursor-pointer">
          <div className="flex gap-8 cursor-pointer">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-gray-600 hover:text-primary transition-colors tracking-tight cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <a 
            href="#appointment"
            className="bg-primary text-white px-7 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
          >
            Book Visit
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-gray-800 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} strokeWidth={2.5} className="cursor-pointer" /> : <Menu size={24} strokeWidth={2.5} className="cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-300 origin-top cursor-pointer ${
          isOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 cursor-pointer">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xl font-bold text-gray-800 tracking-tight cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#appointment"
            className="w-full bg-primary text-white text-center py-4 rounded-2xl font-bold text-lg shadow-lg cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Book Visit
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;