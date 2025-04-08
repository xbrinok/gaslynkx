import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon, Zap, Share2 } from "lucide-react";

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
            Wallet Registration <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Successful!</span>
          </h3>
          
          <p className="text-gray-300 mb-6">
            Your wallet has been successfully registered. You'll receive on-chain benefits and updates shortly.
          </p>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Zap className="text-yellow-400 mr-2 h-5 w-5" />
                <span className="text-white font-medium">Next Steps</span>
              </div>
              <p className="text-gray-300 text-sm text-left">
                Join our Telegram community to receive the latest updates, trade signals, and exclusive opportunities.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 border-none transition-all duration-300"
            >
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-telegram-plane mr-2"></i>
                Join Our Telegram Channel
              </a>
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
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
