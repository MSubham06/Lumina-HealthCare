import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

// Import ALL 8 Images
import Facility1 from '../assets/facility1.jpg';
import Facility2 from '../assets/facility2.jpg';
import Facility3 from '../assets/facility3.jpg';
import Facility4 from '../assets/facility4.jpg';
import Facility5 from '../assets/facility5.jpg';
import Facility6 from '../assets/facility6.jpg';
import Facility7 from '../assets/facility7.jpg';
import Facility8 from '../assets/facility8.jpg';

const Facilities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const facilities = [
    { id: 1, image: Facility1, title: "Hybrid Cath Lab", desc: "Advanced interventional cardiology suite." },
    { id: 2, image: Facility2, title: "Advanced Imaging Center", desc: "High-precision PET-CT & MRI Diagnostics." },
    { id: 3, image: Facility3, title: "Modular Operation Theater", desc: "Sterile, robotic-assisted surgical units." },
    { id: 4, image: Facility4, title: "Patient Waiting Lounge", desc: "Spacious, calm, and comfortable environment." },
    { id: 5, image: Facility5, title: "Digital X-Ray Suite", desc: "Low-radiation, rapid diagnostic imaging." },
    { id: 6, image: Facility6, title: "Inpatient Recovery Ward", desc: "Serene corridors and private recovery suites." },
    { id: 7, image: Facility7, title: "Specialist Consultation", desc: "Private soundproofed rooms for patient care." },
    { id: 8, image: Facility8, title: "Main Reception", desc: "Efficient check-in with a personal touch." },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000); 
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === facilities.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? facilities.length - 1 : prev - 1));
  };

  const handleManualNav = (direction) => {
    setIsAutoPlaying(false); 
    if (direction === 'next') handleNext();
    else handlePrev();
  };

  return (
    <section 
      id="facilities" 
      className="py-16 bg-white relative overflow-hidden"
    >
       {/* Background Decor */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
       <div className="absolute -z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header - Fixed Alignment */}
        {/* CHANGED: 'items-start' forces left alignment on mobile. 'md:items-end' keeps bottom alignment on desktop. */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              World-Class Infrastructure
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
              Designed for <br className="block md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">precision & comfort.</span>
            </h2>
          </div>
          
          {/* Controls (Desktop) */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => handleManualNav('prev')}
              className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-primary/50 hover:text-primary transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => handleManualNav('next')}
              className="p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-secondary hover:scale-105 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- MAIN CAROUSEL --- */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] group bg-gray-100">
          
          {/* Images Layer */}
          {facilities.map((facility, index) => (
            <div 
              key={facility.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img 
                src={facility.image} 
                alt={facility.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Caption Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white z-20">
                <div className={`transition-all duration-500 delay-200 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <h3 className="text-xl md:text-3xl font-bold mb-2 leading-tight">{facility.title}</h3>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                    <p className="text-sm md:text-base text-gray-200 font-medium line-clamp-1">{facility.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Touch Targets */}
          <div 
            className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent z-30 md:hidden flex items-center justify-start pl-2 active:bg-black/30 transition-colors" 
            onClick={() => handleManualNav('prev')}
          >
            <ChevronLeft className="text-white/90 drop-shadow-md" size={32}/>
          </div>
          <div 
            className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent z-30 md:hidden flex items-center justify-end pr-2 active:bg-black/30 transition-colors" 
            onClick={() => handleManualNav('next')}
          >
            <ChevronRight className="text-white/90 drop-shadow-md" size={32}/>
          </div>

        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 gap-2 px-2 flex-wrap">
          {facilities.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Facilities;