import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12 mt-auto border-t border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              TradingAdvantage
            </a>
            <p className="text-gray-300 mt-2">Elevate your memecoin trading strategy</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="social-links flex mb-4">
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 border border-gray-600"
              >
                <i className="fab fa-telegram-plane text-xl"></i>
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 border border-gray-600"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 border border-gray-600"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
            <p className="text-gray-300">© {currentYear} TradingAdvantage. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
