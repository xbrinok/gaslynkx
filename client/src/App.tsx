import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ReferralTracker from "@/pages/ReferralTracker";
import { useEffect } from "react";
import { initParticles } from "@/lib/particles-config";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/referrals" component={ReferralTracker} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize particles.js effect when the component mounts
  useEffect(() => {
    // Delay initialization slightly to ensure DOM is ready
    const timer = setTimeout(() => {
      initParticles();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
