import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon, Copy, Link, Clock, Gift, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralLink, setReferralLink] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      // Get the user's referral code from localStorage (saved during wallet submission)
      const storedCode = localStorage.getItem('userReferralCode');
      if (storedCode) {
        setReferralCode(storedCode);
        
        // Create a referral link with the current domain and referral code
        const currentUrl = new URL(window.location.href);
        currentUrl.search = `?ref=${storedCode}`;
        setReferralLink(currentUrl.toString());
      } else {
        // Fallback if no stored code (shouldn't happen in normal flow)
        const code = window.location.hostname + '_ref';
        setReferralCode(code);
        setReferralLink(`${window.location.origin}?ref=${code}`);
      }
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "Referral link copied to clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Copy Failed",
          description: "Please try again",
          variant: "destructive"
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-700">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 glow-effect">
            <CheckIcon className="text-white h-12 w-12" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-white">
            Verification <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Complete!</span>
          </h3>
          
          <p className="text-gray-300 mb-6">
            Your identity and Solana wallet are now verified. You will receive your on-chain benefits within 7 days.
          </p>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gray-700/80 p-5 rounded-lg border border-gray-600">
              <h4 className="text-white font-medium text-lg mb-3">What's Next</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Clock className="text-blue-400 h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-white block mb-1">Technical On-Chain Benefits</span>
                      Will be allocated to your wallet within 7 days, worth approximately $1,000 in trading value
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-lg mb-5">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <i className="fab fa-telegram-plane text-blue-400 text-xl"></i>
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">Join Our Elite Community</h4>
                <p className="text-gray-300 text-sm">Join our Telegram group for exclusive updates and trading signals</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 border-none transition-all duration-300 mb-2"
            >
              <a 
                href="https://t.me/elitetraders" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-telegram-plane mr-2 text-lg"></i>
                Join Telegram Group
              </a>
            </Button>
          </div>
          
          <div className="bg-purple-500/10 border border-purple-500/30 p-5 rounded-lg mb-5">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <Link className="text-purple-400 h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">Your Personal Referral Link</h4>
                <p className="text-gray-300 text-sm">Share this link with others to earn extra benefits</p>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <Input 
                value={referralLink}
                readOnly
                className="bg-gray-900 border-gray-600 text-gray-200 text-sm"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-2 bg-gray-700 border-gray-600 hover:bg-gray-600"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4 text-gray-300" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 text-left">
              <i className="fas fa-info-circle mr-1"></i>
              Referral code: <span className="font-mono">{referralCode}</span> (unique to your wallet)
            </p>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-2"
            onClick={onClose}
          >
            Back to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
