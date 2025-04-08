import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "fa-chart-line",
    title: "Advanced Trading Insights",
    description: "Get real-time market analysis and trading signals from seasoned professionals in the memecoin space."
  },
  {
    icon: "fa-lock",
    title: "Exclusive Community Access",
    description: "Join an elite community of traders sharing strategies, tips, and early memecoin opportunities."
  },
  {
    icon: "fa-rocket",
    title: "On-Chain Benefits",
    description: "Receive airdrops, gain early access to promising tokens, and participate in exclusive presales."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-lg transition border border-gray-600">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-6 mx-auto md:mx-0">
                <i className={`fas ${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center md:text-left text-white">{feature.title}</h3>
              <p className="text-gray-300 text-center md:text-left">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
