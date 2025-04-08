import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "fa-chart-line",
    title: "Optimize Your Trading Experience",
    description: "We're empowering dedicated traders with state-of-the-art on-chain tools that streamline transactions and provide tangible economic enhancements for your trading journey."
  },
  {
    icon: "fa-users",
    title: "Build an Elite, Verified Community",
    description: "By uniting heavy users of Bonkbot and Trojan, we create a trusted network of serious traders. This exclusive environment nurtures community innovation, improves market insights, and unlocks special on-chain opportunities."
  },
  {
    icon: "fa-shield-alt",
    title: "Ensure Genuine Engagement",
    description: "Our streamlined verification securely ties your Telegram identity to your Solana wallet. This process ensures that only eligible, active participants receive these on-chain benefits, aligning economic incentives with proven trading activity."
  },
  {
    icon: "fa-coins",
    title: "Provide Direct Economic Benefits",
    description: "Beyond lowering transaction costs, eligible users gain access to a benefit mechanism valued at roughly $1,000. This technical advantage boosts your liquidity and gives your trading strategy a real-world economic uplift."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Why We're <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Doing This</span>
        </h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className="badge-icon flex items-center justify-center bg-purple-500/10 border border-purple-500/30 rounded-full p-2 mr-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <i className="fas fa-robot text-purple-400"></i>
            </div>
            <span className="ml-2 text-white font-medium">For Bonkbot Users</span>
          </div>
          <span className="text-gray-500 mx-2">&</span>
          <div className="badge-icon flex items-center justify-center bg-blue-500/10 border border-blue-500/30 rounded-full p-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <i className="fas fa-horse-head text-blue-400"></i>
            </div>
            <span className="ml-2 text-white font-medium">For Trojan Users</span>
          </div>
        </div>
        
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our mission is to create an ecosystem that rewards active traders and provides 
          real economic advantages for those who contribute to the memecoin community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-md hover:shadow-lg transition border border-gray-700">
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-5 border border-blue-500/30">
                  <i className={`fas ${feature.icon} text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
