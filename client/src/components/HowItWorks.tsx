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
    <section id="how-it-works" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="steps-container flex flex-col items-center mb-12 md:mb-0 md:mr-10">
              {steps.map((step, index) => (
                <div key={index} className="step-item flex flex-col items-center mb-12 md:mb-20">
                  <div className="step-number w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-bold text-white text-xl mb-4">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="step-line hidden md:block"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="step-content flex-1">
              {steps.map((step, index) => (
                <div key={index} className="step-description mb-12 md:mb-20">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
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
