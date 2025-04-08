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
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [telegramUser, setTelegramUser] = useState<TelegramAuth | null>(null);

  const handleCheckEligibility = () => {
    setTelegramModalOpen(true);
  };

  const handleTelegramSuccess = (user: TelegramAuth) => {
    setTelegramUser(user);
    setTelegramModalOpen(false);
    setWalletModalOpen(true);
  };

  const handleWalletSubmit = () => {
    setWalletModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Hero onCheckEligibility={handleCheckEligibility} />
      <Features />
      <HowItWorks />
      <Footer />
      
      <TelegramAuthModal 
        isOpen={telegramModalOpen} 
        onClose={() => setTelegramModalOpen(false)} 
        onSuccess={handleTelegramSuccess}
      />
      
      <WalletAddressModal 
        isOpen={walletModalOpen} 
        onClose={() => setWalletModalOpen(false)} 
        onSubmit={handleWalletSubmit}
        telegramUser={telegramUser}
      />
      
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
