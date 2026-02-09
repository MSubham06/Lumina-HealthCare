import React from 'react';
import { Phone, Mail, MapPin, Calendar, User, Clock, CheckCircle } from 'lucide-react';

const Appointment = () => {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Ready to prioritize your health?
          </h2>
          <p className="text-gray-500 text-lg">
            Book an appointment online or visit us at our clinic. We are here to help.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* LEFT SIDE: Contact Info & Map */}
          <div className="w-full lg:w-5/12 bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
            
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
              <p className="text-slate-400 mb-8">Fill out the form or reach us directly.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Phone</p>
                    <p className="text-lg font-semibold">+1 (555) 123-4567</p>
                    <p className="text-sm text-slate-500">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Email</p>
                    <p className="text-lg font-semibold">hello@lumina.health</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Location</p>
                    <p className="text-lg font-semibold leading-tight">123 Wellness Avenue,<br/>Medical District, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Map Preview */}
            <div className="relative z-10 mt-10 rounded-xl overflow-hidden h-48 border border-slate-700 grayscale hover:grayscale-0 transition-all duration-500">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841263725515!2d-73.98773128459413!3d40.74844057932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620835032515!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy"
                 title="Google Map"
               ></iframe>
            </div>

          </div>

          {/* RIGHT SIDE: Booking Form */}
          <div className="w-full lg:w-7/12 p-8 md:p-12 bg-white">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-primary" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Phone size={16} className="text-primary" /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="(555) 000-0000" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Calendar size={16} className="text-primary" /> Preferred Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700 text-sm"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> Preferred Time
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700 cursor-pointer">
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 6PM)</option>
                  </select>
                </div>
              </div>

              {/* Department/Service */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Department</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['General', 'Cardiology', 'Pediatrics', 'Neurology'].map((dept) => (
                    <label key={dept} className="cursor-pointer">
                      <input type="radio" name="dept" className="peer sr-only" />
                      <div className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 text-sm font-semibold text-center peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">
                        {dept}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message (Optional)</label>
                <textarea 
                  rows="3" 
                  placeholder="Tell us about your symptoms or reason for visit..." 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                <CheckCircle size={20} />
                Book Appointment
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Appointment;