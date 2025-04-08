import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white py-10 md:py-14 mt-auto border-t border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <a href="#" className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Elite Trader Benefits
            </a>
            <p className="text-gray-300 mt-2 max-w-md">
              Unlock exclusive on-chain advantages for active Bonkbot and Trojan users.
              Elevate your trading with economic benefits and community access.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="social-links flex mb-6">
              <a 
                href="https://t.me/elitetraders" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button group"
              >
                <div className="button-background"></div>
                <div className="w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center relative z-10 border border-blue-500/30 group-hover:border-blue-400 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <i className="fab fa-telegram-plane text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300"></i>
                </div>
                <span className="block text-sm text-center text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Telegram</span>
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {currentYear} Elite Trader Benefits.</p>
              <p className="text-gray-500 text-sm mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700/50">
          <div className="text-center text-gray-500 text-sm">
            <p>The exact details of on-chain benefits will be disclosed to eligible users.</p>
            <p className="mt-1">Not affiliated with Telegram, Solana, Bonkbot, or Trojan.</p>
          </div>
        </div>
      </div>
      
      {/* CSS for the social button is handled in index.css */}
    </footer>
  );
};

export default Footer;
