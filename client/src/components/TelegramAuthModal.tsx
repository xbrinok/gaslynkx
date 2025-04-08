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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Connect with Telegram</DialogTitle>
          <DialogDescription className="text-center">
            Authenticate using your Telegram account to proceed
          </DialogDescription>
        </DialogHeader>
        
        <div id="telegramLoginContainer" className="flex justify-center mb-6">
          {/* In a real implementation, this would be replaced by the Telegram widget */}
          <div className="w-full h-14 bg-gray-100 rounded-lg flex items-center justify-center">
            <i className="fab fa-telegram-plane text-primary text-2xl mr-3"></i>
            <span className="font-medium">Telegram Login Widget</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm text-center mb-6">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
        
        <Button 
          onClick={handleMockLogin}
          className="w-full gradient-bg text-white py-6 border-none"
          disabled={telegramAuthMutation.isPending}
        >
          {telegramAuthMutation.isPending ? "Connecting..." : "Connect with Telegram"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramAuthModal;
