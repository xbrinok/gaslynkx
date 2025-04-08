import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { initParticles } from "@/lib/particles-config";

interface HeroProps {
  onCheckEligibility: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCheckEligibility }) => {
  useEffect(() => {
    // Initialize particles.js when the component mounts
    if (typeof window !== 'undefined' && window.particlesJS) {
      initParticles();
    } else {
      // If particlesJS is not loaded yet, wait for it
      const checkForParticles = setInterval(() => {
        if (typeof window !== 'undefined' && window.particlesJS) {
          initParticles();
          clearInterval(checkForParticles);
        }
      }, 100);

      return () => clearInterval(checkForParticles);
    }
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Particle background */}
      <div id="particles-js" className="absolute inset-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary opacity-20 blur-circle"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary opacity-20 blur-circle"></div>
      
      <div className="container mx-auto px-6 py-12 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Upgrade Your Trading Advantage
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            Unlock Exclusive On-Chain Benefits for Elite Memecoin Traders
          </p>
          <Button 
            onClick={onCheckEligibility}
            className="gradient-bg text-white py-7 px-8 rounded-lg text-lg font-medium shadow-lg transform transition hover:scale-105 hover:shadow-xl border-none"
          >
            Check Eligibility
          </Button>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,149.3C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
