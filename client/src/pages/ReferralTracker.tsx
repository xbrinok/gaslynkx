import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import Web3LoadingSpinner from '@/components/Web3LoadingSpinner';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    walletList: string[];
  };
}

const ReferralTracker: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/referrals'],
    enabled: isAuthorized,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'solana2025$') { // Updated password as requested
      setIsAuthorized(true);
      // Store auth state in localStorage to persist between refreshes
      localStorage.setItem('referralAdmin', 'authorized');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid password');
    }
  };
  
  // Check for saved auth state when component mounts
  useEffect(() => {
    const savedAuth = localStorage.getItem('referralAdmin');
    if (savedAuth === 'authorized') {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    // For admin panel, don't use animations but ensure content is visible
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el) => {
      // Remove opacity-0 class and add full opacity
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
    });
  }, []);
  
  // Removed particle.js initialization for admin page as requested

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-gray-900 relative z-10">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl relative z-20">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Referral <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Tracker</span>
          </h1>
          
          <p className="text-gray-300 mb-8 text-center">
            Enter the admin password to access referral analytics.
          </p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            
            {errorMessage && (
              <div className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-md hover:opacity-90 transition-all duration-300 font-medium"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-gray-900 relative z-10">
        <Web3LoadingSpinner size="large" text="Loading referral data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-gray-900 relative z-10">
        <div className="max-w-lg text-center relative z-20">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
          <p className="text-gray-300 mb-8">
            There was a problem loading the referral data. Please try again later.
          </p>
          <button
            onClick={() => setIsAuthorized(false)}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get wallet addresses from API data
  // If no wallet addresses are available, show sample data
  const walletList = data?.data?.walletList || [];
  
  console.log("API data received:", data);
  
  // Use the wallet list from the API
  // Server will provide sample data if real data isn't available
  const displayWalletList = [...walletList];

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-900 relative z-10">
      <div className="max-w-6xl mx-auto relative z-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Wallet <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Addresses</span>
          </h1>
          <p className="text-xl text-gray-300">
            All registered wallet addresses with referral info
          </p>
        </header>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Wallet List</h2>
          
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {displayWalletList.length > 0 ? (
              displayWalletList.map((walletInfo, index) => (
                <div 
                  key={index} 
                  className="flex items-center py-3 px-4 bg-gray-700/50 rounded-md text-lg font-mono"
                >
                  <span className="text-gray-300 break-all">{walletInfo}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No wallet addresses found</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setIsAuthorized(false);
              localStorage.removeItem('referralAdmin');
            }}
            className="px-6 py-3 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralTracker;