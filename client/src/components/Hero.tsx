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
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center bg-gray-900">
      {/* Particle background */}
      <div id="particles-js" className="absolute inset-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary opacity-20 blur-circle"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary opacity-20 blur-circle"></div>
      
      <div className="container mx-auto px-6 py-12 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Upgrade Your Trading Advantage
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Unlock Exclusive On-Chain Benefits for Elite Memecoin Traders
          </p>
          <p className="text-md md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience the ultimate trading edge.
            If you've been powering your trades with Bonkbot and Trojan, it's time to verify your Telegram account 
            and connect your Solana wallet. Eligible traders will access a technical on-chain benefit valued at 
            up to ~$1,000, designed to elevate your trading performance.
          </p>
          <Button 
            onClick={onCheckEligibility}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-8 rounded-lg text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl z-20 relative"
          >
            Verify Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
