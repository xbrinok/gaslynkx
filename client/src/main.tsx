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
        <div className="error-screen flex items-center justify-center min-h-screen bg-gray-900 p-4 text-center">
          <div>
            <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
            <p className="text-gray-300 mb-6">The application encountered an error. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
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
