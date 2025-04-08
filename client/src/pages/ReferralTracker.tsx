import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import Web3LoadingSpinner from '@/components/Web3LoadingSpinner';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { initParticles } from '@/lib/particles-config';

interface Referral {
  referrer: string;
  referred: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    referrals: Referral[];
  };
}

interface ReferralData {
  referrals: Referral[];
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
    if (password === 'admin123') { // Simple password for demo purposes
      setIsAuthorized(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid password');
    }
  };

  useEffect(() => {
    // Apply animation classes when component mounts
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('page-transition-fade-in');
      }, index * 150);
    });
  }, []);
  
  // Initialize particles.js when authorized
  useEffect(() => {
    if (isAuthorized) {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        initParticles();
      }, 100);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-gray-900 relative z-10">
        {/* Add particle.js background */}
        <div className="absolute inset-0 -z-10 opacity-30" id="particles-js"></div>
        <div className="animate-on-mount opacity-0 max-w-md w-full bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700 shadow-xl relative z-10">
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
        {/* Add particle.js background */}
        <div className="absolute inset-0 -z-10 opacity-30" id="particles-js"></div>
        <Web3LoadingSpinner size="large" text="Loading referral data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-gray-900 relative z-10">
        {/* Add particle.js background */}
        <div className="absolute inset-0 -z-10 opacity-30" id="particles-js"></div>
        <div className="max-w-lg text-center relative z-10">
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

  // Use API data when available, otherwise use fallback data
  const referralData: ReferralData = {
    referrals: data?.data?.referrals || [
      {
        referrer: "SolWa...ab15c",
        referred: ["SolWa...e92a1", "SolWa...f83b2"]
      },
      {
        referrer: "SolWa...d72e4",
        referred: ["SolWa...c61a5"]
      },
      {
        referrer: "SolWa...9b3c7",
        referred: ["SolWa...a25d8", "SolWa...b14e9", "SolWa...c35f0"]
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-900 relative z-10">
      {/* Add particle.js background */}
      <div className="absolute inset-0 -z-10 opacity-30" id="particles-js"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 animate-on-mount opacity-0">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Referral <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Analytics</span>
          </h1>
          <p className="text-xl text-gray-300">
            Track and analyze the effectiveness of your referral program
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg animate-on-mount opacity-0">
            <h3 className="text-xl font-medium mb-2 text-white">Total Referrers</h3>
            <p className="text-4xl font-bold text-blue-400">
              {referralData.referrals.length}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg animate-on-mount opacity-0">
            <h3 className="text-xl font-medium mb-2 text-white">Total Referrals</h3>
            <p className="text-4xl font-bold text-purple-400">
              {referralData.referrals.reduce((acc, item) => acc + item.referred.length, 0)}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg animate-on-mount opacity-0">
            <h3 className="text-xl font-medium mb-2 text-white">Conversion Rate</h3>
            <p className="text-4xl font-bold text-green-400">85%</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-lg mb-8 animate-on-mount opacity-0">
          <h2 className="text-2xl font-bold mb-6 text-white">Referral Connections</h2>
          
          <div className="space-y-6">
            {referralData.referrals.map((item, index) => (
              <div key={index} className="animate-on-mount opacity-0">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 mr-4">
                    <span className="text-blue-400 font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{item.referrer}</h3>
                    <p className="text-sm text-gray-400">{item.referred.length} referrals</p>
                  </div>
                </div>
                
                <div className="ml-16 space-y-3">
                  {item.referred.map((ref, refIndex) => (
                    <div key={refIndex} className="flex items-center py-2 px-4 bg-gray-700/50 rounded-md">
                      <ArrowRight className="h-4 w-4 text-blue-400 mr-3" />
                      <span className="text-gray-300">{ref}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center animate-on-mount opacity-0">
          <button
            onClick={() => setIsAuthorized(false)}
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