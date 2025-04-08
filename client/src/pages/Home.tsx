import React, { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import TelegramAuthModal from "@/components/TelegramAuthModal";
import WalletAddressModal from "@/components/WalletAddressModal";
import SuccessModal from "@/components/SuccessModal";
import { TelegramAuth } from "@shared/schema";

const Home: React.FC = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  // We'll use a mock user or null for direct wallet submission
  const [mockUser] = useState<TelegramAuth | null>({
    id: "12345",
    first_name: "User",
    username: "user",
    photo_url: "",
    auth_date: Math.floor(Date.now() / 1000),
    hash: "mock-hash"
  });

  const handleCheckEligibility = () => {
    // Open wallet modal directly
    setWalletModalOpen(true);
  };

  const handleWalletSubmit = () => {
    setWalletModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Hero onCheckEligibility={handleCheckEligibility} />
      <Features />
      <HowItWorks />
      <Footer />
      
      {/* We still keep the TelegramAuthModal in case we want to use it later */}
      <WalletAddressModal 
        isOpen={walletModalOpen} 
        onClose={() => setWalletModalOpen(false)} 
        onSubmit={handleWalletSubmit}
        telegramUser={mockUser}
      />
      
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
