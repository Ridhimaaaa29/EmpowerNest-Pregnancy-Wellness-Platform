'use client'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { tokenService } from "@/services/api";
import Index from "./pages/Index";
import BabyCare from "./pages/BabyCare";
import TrackerPage from "./pages/TrackerPage"
import PregnancyPage from "./pages/PregnancyPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Postpartum from "./pages/Postpartum";
import Resources from "./pages/Resources";


const queryClient = new QueryClient();

/**
 * RootRedirect Component
 * Redirects "/" to login if not authenticated, 
 * otherwise shows the home page
 */
function RootRedirect() {
  const isAuthenticated = tokenService.isAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Index />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root route - redirects to login if not authenticated */}
            <Route path="/" element={<RootRedirect />} />
            
            {/* Public routes - accessible without authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/baby-care" element={<ProtectedRoute><BabyCare /></ProtectedRoute>} />
            <Route path="/tracker" element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
            <Route path="/pregnancy" element={<ProtectedRoute><PregnancyPage /></ProtectedRoute>} />
            <Route path="/postpartum" element={<ProtectedRoute><Postpartum /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
// Extend the Window interface to include chatbase
declare global {
  interface Window {
    chatbase?: any;
  }
}

(function () {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...args: any[]) => {
      if (!window.chatbase.q) {
        window.chatbase.q = [];
      }
      window.chatbase.q.push(args);
    };

    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") {
          return target.q;
        }
        return (...args: any[]) => target(prop, ...args);
      },
    });
  }

  const onLoad = function () {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "PoU8R1qg6EfzYfee88uTz";
    (script as any).domain = "www.chatbase.co"; // Type assertion to avoid errors
    document.body.appendChild(script);
  };

  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
  }
})();

export default App;
