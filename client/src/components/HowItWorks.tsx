import React from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Connect with Telegram",
    description: "Authenticate using your Telegram account to verify your identity and start the eligibility process."
  },
  {
    number: 2,
    title: "Link Your Solana Wallet",
    description: "Provide your Solana wallet address to receive exclusive on-chain benefits and airdrops."
  },
  {
    number: 3,
    title: "Gain Access",
    description: "Once verified, you'll receive immediate access to our exclusive community and trading benefits."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Works</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start">
                  {/* Step number circle */}
                  <div className="hidden md:flex shrink-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {step.number}
                  </div>
                  
                  {/* Step content */}
                  <div className="w-full md:ml-8 p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="md:hidden mr-3 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold">
                        {step.number}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
