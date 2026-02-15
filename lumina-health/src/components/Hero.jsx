import React from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import DoctorImage from '../assets/Banner2.png'; 

const Hero = () => {
  return (
    <section 
      // ADDED: select-none (removes I-Beam) and cursor-pointer (hand icon)
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white cursor-pointer select-none"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. Left Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-6 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Accepting New Patients</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-6">
              Modern care<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">for real life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              No judgment. No wait times. Just expert medical advice from doctors who actually listen to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#appointment" className="group bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Book Appointment
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </a>
              <a href="#services" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center">
                Explore Services
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-gray-500 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span>4.9/5 Ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                <span>Board Certified</span>
              </div>
            </div>
          </div>

          {/* 2. Right Content: The Image */}
          <div className="flex-1 relative w-full max-w-lg md:max-w-none">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                src={DoctorImage} 
                alt="Medical Team" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[200px]">
                <p className="font-bold text-gray-900 text-sm">Top Rated Team</p>
                <p className="text-xs text-primary font-bold mt-1">5000+ Happy Patients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;