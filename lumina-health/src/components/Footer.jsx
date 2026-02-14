import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Doctors', href: '#doctors' },
    { name: 'Services', href: '#services' },
  ];

  const services = [
    'General Care', 'Cardiology', 'Pediatrics', 'Neurology'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 md:py-14 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Main Grid: Left (Brand) & Right (Links/Specialties) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-10">
          
          {/* LEFT COLUMN: Brand & Social (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <a href="#home" className="inline-block mb-5 group w-fit">
              <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-1">
                Lumina
                <span className="w-2 h-2 rounded-full bg-primary mt-3 group-hover:scale-125 transition-transform duration-300"></span>
              </h2>
            </a>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              Providing world-class healthcare with a focus on precision, comfort, and patient-centered excellence.
            </p>
            
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-full bg-slate-800 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-primary">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Links & Specialties (Spans 7 cols - Split internally) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            
            {/* Sub-Col 1: Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wide">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="hover:text-primary transition-colors flex items-center gap-2 group w-fit"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-Col 2: Specialties */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wide">Specialties</h3>
              <ul className="space-y-3 text-sm">
                {services.map((item) => (
                  <li key={item}>
                    <a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Lumina Health. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;