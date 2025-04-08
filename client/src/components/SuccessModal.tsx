import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="text-green-500 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your wallet has been successfully registered. You will receive updates and benefits shortly.
          </p>
          <div>
            <Button 
              asChild
              className="w-full gradient-bg text-white py-6 border-none"
            >
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Our Telegram Channel
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
