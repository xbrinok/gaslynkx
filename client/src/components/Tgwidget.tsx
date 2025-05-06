// // components/TelegramWidgetModal.tsx
// import React, { useEffect, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";

// interface TelegramWidgetModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const TelegramWidgetModal: React.FC<TelegramWidgetModalProps> = ({ isOpen, onClose }) => {
//     const [authPage, setAuthPage] = useState<string | null>(null);

//     useEffect(() => {
//         if (isOpen) {
//             fetch("/tgauth")
//                 .then(res => res.text())
//                 .then(setAuthPage)
//                 .catch(err => {
//                     console.error("Failed to load Telegram auth page:", err);
//                 });
//         }
//     }, [isOpen]);

//     return (
//         <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//             <DialogContent className="sm:max-w-md p-0 bg-transparent border-none">
//                 <div className="w-full min-h-[300px] bg-black">
//                     {authPage ? (
//                         <div dangerouslySetInnerHTML={{ __html: authPage }} />
//                     ) : (
//                         <div className="text-white text-center p-6">Loading Telegram Authentication...</div>
//                     )}
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default TelegramWidgetModal;

import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TelegramWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
}



const TelegramWidgetModal: React.FC<TelegramWidgetModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "TELEGRAM_AUTH_SUCCESS") {
                console.log("Received TELEGRAM_AUTH_SUCCESS message from iframe");
                localStorage.clear();
                onClose(); // ✅ Close the modal when Telegram auth is done
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [onClose]);
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-full max-w-2xl h-[600px] p-0 overflow-hidden">
                <iframe
                    src="/tgauth"
                    onLoad={() => setLoading(false)}
                    title="Telegram Auth"
                    className="w-full h-full border-0"
                />

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                        <i className="fas fa-spinner fa-spin text-2xl" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TelegramWidgetModal;

