import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon, Zap, Share2, Clock, Gift, Users } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
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
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Users className="text-purple-400 h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-white block mb-1">Exclusive Community Access</span>
                      You'll be added to a private channel of verified memecoin traders
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Gift className="text-green-400 h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-white block mb-1">Personal Referral Link</span>
                      Will be sent to your Telegram account, earn additional benefits by inviting others
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 border-none transition-all duration-300 text-base"
            >
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-telegram-plane mr-2 text-lg"></i>
                Join Elite Traders Community
              </a>
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-2"
              onClick={onClose}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share with Friends
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
