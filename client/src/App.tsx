import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { lazy, Suspense, useCallback } from "react";
import { memo } from "react";

// Performance optimization: Use lazy loading for route components
// This reduces initial bundle size and improves page load speed
const Home = lazy(() => import("@/pages/Home"));
const ReferralTracker = lazy(() => import("@/pages/ReferralTracker"));

// Loading spinner for lazy-loaded components - just the spinner without text
const PageLoading = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Memoized router to prevent unnecessary re-renders
const Router = memo(function Router() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin/referrals" component={ReferralTracker} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

function App() {
  // Use callback for memoization of event handlers
  const handlePrefetchAdmin = useCallback(() => {
    // Prefetch admin page when user hovers over links or buttons
    import("@/pages/ReferralTracker");
  }, []);

  return (
    <>

      {/* Particles div is now managed in the Hero component */}
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      <div onMouseEnter={handlePrefetchAdmin}>
        <Router />
      </div>
      <Toaster />
    </>
  );
}

export default App;
