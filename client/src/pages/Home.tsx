// import React, { useState } from "react";
// import Hero from "@/components/Hero";
// import Features from "@/components/Features";
// import HowItWorks from "@/components/HowItWorks";
// import Footer from "@/components/Footer";
// import TelegramAuthModal from "@/components/TelegramAuthModal";
// import WalletAddressModal from "@/components/WalletAddressModal";
// import SuccessModal from "@/components/SuccessModal";
// import { TelegramAuth } from "@shared/schema";

// const Home: React.FC = () => {
//   const [telegramModalOpen, setTelegramModalOpen] = useState(false);
//   const [walletModalOpen, setWalletModalOpen] = useState(false);
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [authenticatedUser, setAuthenticatedUser] = useState<TelegramAuth | null>(null);

//   const handleCheckEligibility = () => {
//     // First show the Telegram authentication modal
//     setTelegramModalOpen(true);
//   };

//   const handleTelegramSuccess = (user: TelegramAuth) => {
//     // When Telegram auth is successful, close that modal and open wallet modal
//     setTelegramModalOpen(false);
//     setAuthenticatedUser(user);
//     setWalletModalOpen(true);
//   };

//   const handleWalletSubmit = () => {
//     // When wallet is submitted, close that modal and show success
//     setWalletModalOpen(false);
//     setSuccessModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900">
//       <Hero onCheckEligibility={handleCheckEligibility} />
//       <Features />
//       <HowItWorks />
//       <Footer />

//       {/* Telegram authentication modal - shown first */}
//       <TelegramAuthModal 
//         isOpen={telegramModalOpen} 
//         onClose={() => setTelegramModalOpen(false)} 
//         onSuccess={handleTelegramSuccess}
//       />

//       {/* Wallet address modal - shown after Telegram auth */}
//       <WalletAddressModal 
//         isOpen={walletModalOpen} 
//         onClose={() => setWalletModalOpen(false)} 
//         onSubmit={handleWalletSubmit}
//         telegramUser={authenticatedUser}
//       />

//       {/* Success modal - shown after wallet submission */}
//       <SuccessModal 
//         isOpen={successModalOpen} 
//         onClose={() => setSuccessModalOpen(false)} 
//       />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
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
  const [authenticatedUser, setAuthenticatedUser] = useState<TelegramAuth | null>(null);

  const handleCheckEligibility = () => {
    setTelegramModalOpen(true);
  };

  const handleTelegramSuccess = (user: TelegramAuth) => {
    setTelegramModalOpen(false);
    setAuthenticatedUser(user);
    setWalletModalOpen(true);
  };

  const handleWalletSubmit = () => {
    setWalletModalOpen(false);
    setSuccessModalOpen(true);
  };

  // 👇 This listens for a postMessage from the Telegram widget
  useEffect(() => {
    const handleTelegramAuthDone = (event: MessageEvent) => {
      if (event.data?.type === "TELEGRAM_AUTH_SUCCESS") {
        console.log("Received Telegram auth success via postMessage");

        // Close Telegram modal and open Wallet modal
        setTelegramModalOpen(false);
        setWalletModalOpen(true);
      }
    };

    window.addEventListener("message", handleTelegramAuthDone);

    return () => {
      window.removeEventListener("message", handleTelegramAuthDone);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
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
        telegramUser={authenticatedUser}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Home;
