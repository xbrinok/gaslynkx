import React from "react";
import { Button } from "@/components/ui/button";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Verify Your Telegram Account",
    description: "Confirm your identity quickly with a secure one-time code to prove your active use of Bonkbot and Trojan. This step ensures that only genuine, high-engagement traders are recognized.",
    icon: "fa-telegram-plane"
  },
  {
    number: 2,
    title: "Link Your Preferred Solana Wallet",
    description: "Connect your wallet seamlessly to authorize the allocation of on-chain benefits and manage your customized financial advantage.",
    icon: "fa-wallet"
  },
  {
    number: 3,
    title: "Unlock Your Personalized Referral Link",
    description: "Once authenticated, you'll receive an exclusive referral link to share with fellow traders. Expanding your network within this elite community further amplifies your on-chain benefits.",
    icon: "fa-link"
  }
];

const HowItWorks: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                    {step.icon ? (
                      <i className={`fas ${step.icon}`}></i>
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Step content */}
                  <div className="w-full md:ml-8 p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="md:hidden mr-3 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold">
                        {step.icon ? (
                          <i className={`fas ${step.icon} text-sm`}></i>
                        ) : (
                          step.number
                        )}
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

          <div className="mt-16 text-center">
            <div className="p-8 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Security + Transparency
              </h3>
              <p className="text-gray-300 mb-6">
                We’ll never ask you to approve anything or send tokens.
                Everything is powered by:

                Telegram Auth to confirm identity,

                RPC + indexer-based scans to check wallet activity,

                Bot signature detection to validate Bonkbot and Trojan trades,

                Push-only rewards sent directly to eligible wallets
              </p>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
