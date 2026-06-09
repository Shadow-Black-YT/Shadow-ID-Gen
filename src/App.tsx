import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Bulk from "./pages/Bulk";
import NotFound from "./pages/NotFound";

const SEOHandler = () => { useSEO(); return null; };

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SEOHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create />} />
          <Route path="/bulk" element={<Bulk />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
