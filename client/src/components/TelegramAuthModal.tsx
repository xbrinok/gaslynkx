import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TelegramAuth } from "@shared/schema";

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: TelegramAuth) => void;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramAuth) => void;
    };
  }
}

const TelegramAuthModal: React.FC<TelegramAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();

  // For the real implementation, use the Telegram Login Widget
  // Here, for demonstration, we'll use a mock function
  useEffect(() => {
    if (isOpen) {
      // In a real implementation, the Telegram widget script would be loaded here
      // and the login button would be rendered by Telegram's widget
      window.TelegramLoginWidget = {
        dataOnauth: (user) => {
          handleTelegramAuth(user);
        }
      };
    }
  }, [isOpen]);

  const telegramAuthMutation = useMutation({
    mutationFn: async (user: TelegramAuth) => {
      const response = await apiRequest('POST', '/api/auth/telegram', user);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Authentication Successful",
          description: "Your Telegram account has been verified.",
        });
        onSuccess(data.data);
      }
    },
    onError: (error) => {
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleTelegramAuth = (user: TelegramAuth) => {
    telegramAuthMutation.mutate(user);
  };

  // Mock function for demo
  const handleMockLogin = () => {
    const mockUser: TelegramAuth = {
      id: "123456789",
      first_name: "Demo",
      last_name: "User",
      username: "demouser",
      photo_url: "",
      auth_date: Math.floor(Date.now() / 1000),
      hash: "mockhash"
    };
    handleTelegramAuth(mockUser);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Verify Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Telegram</span> Account
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Confirm your identity to verify your Bonkbot and Trojan usage
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 border border-gray-700 rounded-lg p-5 bg-gray-700/40 backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
              <i className="fab fa-telegram-plane text-blue-400 text-2xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Telegram Authentication</h4>
              <p className="text-gray-300 text-sm">Secure, one-click verification process</p>
            </div>
          </div>
          
          <div id="telegramLoginContainer" className="flex justify-center mb-4">
            {/* In a real implementation, this would be replaced by the Telegram widget */}
            <div className="w-full h-16 bg-gray-900/70 rounded-lg flex items-center justify-center border border-gray-600">
              <i className="fab fa-telegram-plane text-blue-400 text-2xl mr-3"></i>
              <span className="font-medium text-white">Telegram Authentication</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm text-center mb-6">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
        
        <Button 
          onClick={handleMockLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-lg text-lg font-medium transition-all duration-300"
          disabled={telegramAuthMutation.isPending}
        >
          {telegramAuthMutation.isPending ? "Verifying..." : "Verify with Telegram"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramAuthModal;
