import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollAssist from "./components/ScrollAssist";
import AmbientBackground from "./components/AmbientBackground";

const queryClient = new QueryClient();

import { useState } from "react";
import ThreeDIntro from "./components/ThreeDIntro";
import AvatarIntro from "./components/AvatarIntro";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowAvatar(true);
  };

  const handleAvatarComplete = () => {
    setShowAvatar(false);
  };

  const isContentVisible = !showIntro && !showAvatar;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showIntro && <ThreeDIntro onEnter={handleIntroComplete} />}
        {showAvatar && <AvatarIntro onComplete={handleAvatarComplete} />}

        <div className={`transition-opacity duration-1000 ${!isContentVisible ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <BrowserRouter>
            <AmbientBackground />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollAssist />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
