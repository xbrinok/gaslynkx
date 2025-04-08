import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// Add Inter font if not already added
if (!document.querySelector('link[href*="Inter"]')) {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);
}

// Set page title (if not already set in HTML)
if (document.title === "") {
  document.title = "Trading Advantage - On-Chain Benefits for Elite Memecoin Traders";
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
