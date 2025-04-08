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
      <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-700 max-h-[85vh] overflow-y-auto">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 glow-effect">
            <CheckIcon className="text-white h-8 w-8" />
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-white">
            Verification <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Complete!</span>
          </h3>
          
          <p className="text-gray-300 text-sm mb-4">
            Your identity and Solana wallet are now verified. You'll receive on-chain benefits within 7 days.
          </p>
          
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div className="bg-gray-700/80 p-3 rounded-lg border border-gray-600">
              <h4 className="text-white font-medium text-base mb-2">What's Next</h4>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="text-blue-400 h-3 w-3" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium text-white block mb-1">Technical On-Chain Benefits</span>
                    Worth ~$1,000 in trading value, sent within 7 days
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg mb-3">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                <i className="fab fa-telegram-plane text-blue-400"></i>
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium text-sm">Join Our Community</h4>
                <p className="text-gray-300 text-xs">Get exclusive updates and trading signals</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 border-none transition-all duration-300 text-sm"
            >
              <a 
                href="https://t.me/elitetraders" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-telegram-plane mr-2"></i>
                Join Telegram Group
              </a>
            </Button>
          </div>
          
          <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg mb-3">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                <Link className="text-purple-400 h-4 w-4" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium text-sm">Your Referral Link</h4>
                <p className="text-gray-300 text-xs">Share to earn extra benefits</p>
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              <Input 
                value={referralLink}
                readOnly
                className="bg-gray-900 border-gray-600 text-gray-200 text-xs py-1 h-8"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-2 bg-gray-700 border-gray-600 hover:bg-gray-600 h-8 w-8"
                onClick={copyToClipboard}
              >
                <Copy className="h-3 w-3 text-gray-300" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 text-left">
              Code: <span className="font-mono">{referralCode}</span>
            </p>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-1 text-sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
