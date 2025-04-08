import React from 'react';

interface Web3LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const Web3LoadingSpinner: React.FC<Web3LoadingSpinnerProps> = ({ 
  size = 'medium',
  text
}) => {
  // Size mappings
  const sizeMap = {
    small: {
      container: 'w-16 h-16',
      outerRing: 'w-12 h-12',
      middleRing: 'w-8 h-8',
      innerRing: 'w-4 h-4',
      textSize: 'text-xs'
    },
    medium: {
      container: 'w-24 h-24',
      outerRing: 'w-20 h-20',
      middleRing: 'w-14 h-14',
      innerRing: 'w-8 h-8',
      textSize: 'text-sm'
    },
    large: {
      container: 'w-32 h-32',
      outerRing: 'w-28 h-28',
      middleRing: 'w-20 h-20',
      innerRing: 'w-12 h-12',
      textSize: 'text-base'
    }
  };

  const styles = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${styles.container} flex items-center justify-center`}>
        {/* Outer ring - purple glow */}
        <div 
          className={`absolute ${styles.outerRing} rounded-full border-4 border-t-purple-500 border-r-purple-500/30 border-b-purple-500/10 border-l-purple-500/60 animate-spin`} 
          style={{ animationDuration: '3s' }}
        />
        
        {/* Middle ring - blue glow */}
        <div 
          className={`absolute ${styles.middleRing} rounded-full border-4 border-t-blue-500/10 border-r-blue-500 border-b-blue-500/60 border-l-blue-500/30 animate-spin`}
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        />
        
        {/* Inner hexagon - Ethereum-like */}
        <div
          className={`absolute ${styles.innerRing} bg-gradient-to-br from-blue-500 to-purple-600 rotate-45 animate-pulse`}
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', animationDuration: '1.5s' }}
        />
      </div>
      
      {text && (
        <p className={`mt-4 text-gray-300 ${styles.textSize} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Web3LoadingSpinner;