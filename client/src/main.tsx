import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import React from "react";

// Performance optimization: Remove the Inter font loading
// We already have Rubik font from index.html

// Set page title (if not already set in HTML)
if (document.title === "") {
  document.title = "Trading Advantage - On-Chain Benefits for Elite Memecoin Traders";
}

// Performance optimization: Create root outside of render to avoid unnecessary operations
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Custom error boundary for better error handling
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Application error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen flex items-center justify-center min-h-screen bg-gray-900">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Performance optimization: Disable StrictMode in production to avoid double rendering
root.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>
);
