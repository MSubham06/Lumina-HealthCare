import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Facilities from './components/Facilities';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment'; // <--- FIXED NAME HERE
import Footer from './components/Footer'; 
import DoctorBio from './components/DoctorBio';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Facilities />
      <Doctors />
      <Appointment /> {/* <--- Now this matches the import */}
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="font-sans text-gray-900 bg-background antialiased selection:bg-secondary/30">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-bio" element={<DoctorBio />} />
      </Routes>
    </div>
  );
}

export default App;