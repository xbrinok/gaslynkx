import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TelegramAuth, walletAddressSchema } from "@shared/schema";

interface WalletAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  telegramUser: TelegramAuth | null;
}

const walletFormSchema = z.object({
  walletAddress: z.string()
    .min(32, "Invalid Solana wallet address")
    .max(64, "Invalid Solana wallet address")
    .regex(/^[a-zA-Z0-9]{32,64}$/, "Invalid Solana wallet address format")
});

type WalletFormValues = z.infer<typeof walletFormSchema>;

const WalletAddressModal: React.FC<WalletAddressModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  telegramUser
}) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Extract referral code from URL when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const ref = searchParams.get('ref');
        if (ref) {
          setReferralCode(ref);
        }
      } catch (error) {
        console.error("Error parsing URL params:", error);
      }
    }
  }, [isOpen]);

  const { register, handleSubmit, formState: { errors } } = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      walletAddress: ""
    }
  });

  const walletSubmitMutation = useMutation({
    mutationFn: async (data: WalletFormValues) => {

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const payload = {
        telegramId: `${Math.floor(10000 + Math.random() * 90000)}`,
        walletAddress: data.walletAddress,
        referralCode: referralCode
      };

      const response = await apiRequest('POST', '/api/submit/wallet', payload);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Wallet Submitted Successfully",
        description: "Your wallet address has been registered.",
      });
      // Store the referral code in local storage for the success modal
      if (data?.data?.referralCode) {
        localStorage.setItem('userReferralCode', data.data.referralCode);
      }
      onSubmit();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onFormSubmit = (data: WalletFormValues) => {
    walletSubmitMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gray-800 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Link Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Solana</span> Wallet
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Connect your wallet to receive technical on-chain benefits
          </DialogDescription>
        </DialogHeader>


        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
            <i className="fab fa-telegram-plane text-teal-400"></i>
          </div>
          <div>
            <p className="text-sm text-white flex items-center">
              <span className="font-medium">Telegram Verified</span>
              <i className="fas fa-check-circle text-green-400 ml-2"></i>
            </p>
          </div>
        </div>


        {referralCode && (
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <i className="fas fa-user-friends text-purple-400"></i>
            </div>
            <div>
              <p className="text-sm text-white">
                <span className="font-medium">Referred by:</span>
                <span className="ml-2 font-mono text-xs bg-gray-700 rounded px-2 py-1">{referralCode}</span>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="walletAddress" className="text-gray-200 font-medium flex items-center text-lg pb-1">
              <i className="fab fa-ethereum text-purple-400 mr-3"></i>
              Solana Wallet Address
            </Label>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg blur-sm"></div>
              <Input
                id="walletAddress"
                {...register("walletAddress")}
                placeholder="Enter your Solana wallet address"
                className="relative w-full border border-gray-600 bg-gray-700/90 text-white rounded-lg px-4 py-3"
              />
            </div>

            {errors.walletAddress && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.walletAddress.message}
              </p>
            )}

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg mt-3 border border-gray-700">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-400 mr-3 mt-1"></i>
                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    Your on-chain benefits will be sent to this wallet address
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    Example: 5KL6aEUNJCAyRsNt8Pk2YwXqmstbm6RKUHFRKR2Qcfpp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/20"
              disabled={walletSubmitMutation.isPending}
            >
              {walletSubmitMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-link mr-2"></i>
                  Link Wallet Address
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WalletAddressModal;
