import React from "react";
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
  
  const { register, handleSubmit, formState: { errors } } = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      walletAddress: ""
    }
  });

  const walletSubmitMutation = useMutation({
    mutationFn: async (data: WalletFormValues) => {
      if (!telegramUser) {
        throw new Error("Telegram authentication required");
      }
      
      const payload = {
        telegramId: telegramUser.id,
        walletAddress: data.walletAddress
      };
      
      const response = await apiRequest('POST', '/api/submit/wallet', payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Wallet Submitted Successfully",
        description: "Your wallet address has been registered.",
      });
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Enter Your Solana Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Provide your Solana wallet address to receive benefits
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="walletAddress" className="text-gray-700 font-medium">
              Solana Wallet Address
            </Label>
            <Input
              id="walletAddress"
              {...register("walletAddress")}
              placeholder="Enter your Solana wallet address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2"
            />
            {errors.walletAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.walletAddress.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Example: 5KL6aEUNJCAyRsNt8Pk2YwXqmstbm6RKUHFRKR2Qcfpp
            </p>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full gradient-bg text-white py-6 border-none"
              disabled={walletSubmitMutation.isPending}
            >
              {walletSubmitMutation.isPending ? "Submitting..." : "Submit Wallet Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WalletAddressModal;
