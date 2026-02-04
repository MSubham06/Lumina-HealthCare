import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react'; 
import DoctorProfile from '../assets/doctor_profile.jpg';
import DoctorProfile2 from '../assets/doctor_profile2.jpg';
import DoctorProfile3 from '../assets/doctor_profile3.jpg';
import DoctorProfile4 from '../assets/doctor_profile4.jpg';

const Doctors = () => {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const doctors = [
    { id: 1, name: "Dr. Sarah Bennett", role: "Senior GP & Cardiologist", image: DoctorProfile },
    { id: 2, name: "Dr. James Lee", role: "Neurologist", image: DoctorProfile2 },
    { id: 3, name: "Dr. Emily Chen", role: "Pediatrician", image: DoctorProfile3 },
    { id: 4, name: "Dr. Michael Ross", role: "Orthopedic Surgeon", image: DoctorProfile4 }
  ];

  return (
    <section 
      id="doctors" 
      ref={sectionRef}
      // UPDATED: Removed 'min-h-screen' and reduced mobile padding to 'py-12'
      className="py-12 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
      <div className="absolute -z-10 top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute -z-10 -bottom-32 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-primary text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Our Top Specialists
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">medical team.</span>
          </h2>
        </div>

        {/* Doctor Grid - 2 Cols on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          
          {doctors.map((doctor, index) => (
            <div 
              key={doctor.id} 
              className={`
                group bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] 
                hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] 
                
                transform-gpu transition-all duration-500 ease-out hover:-translate-y-2 cursor-default
                antialiased [backface-visibility:hidden] [transform:translateZ(0)]

                /* VISIBILITY LOGIC */
                ${index >= 2 && !showAll ? 'hidden md:block' : 'block'}

                /* ANIMATION STATES */
                ${showAll && index >= 2 ? 'animate-fade-in-up' : ''}
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
              `}
            >
              {/* Image Area */}
              <div className="relative aspect-[3/4] w-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-3 md:mb-4 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                
                {/* Floating Role Badge */}
                <div className="absolute bottom-3 left-3 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <span className="bg-white/95 backdrop-blur text-[10px] md:text-xs font-black text-primary px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
                     {doctor.role}
                   </span>
                </div>
              </div>

              {/* Minimalist Text Info */}
              <div className="text-center">
                <h3 className="text-sm md:text-xl font-black text-gray-900 tracking-tight mb-0.5 md:mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {doctor.name}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                  {doctor.role}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Mobile View More Button */}
        <div className={`mt-8 text-center md:hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-[0_10px_20px_-5px_rgba(14,165,233,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(14,165,233,0.6)] hover:-translate-y-0.5 transition-all active:scale-95 group"
          >
            {showAll ? 'Show Less' : 'View More Doctors'}
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`} 
            />
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>

    </section>
  );
};

export default Doctors;