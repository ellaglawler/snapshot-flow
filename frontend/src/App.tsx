import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { CandidateSubmission } from "./pages/CandidateSubmission";
import { Report } from "./pages/Report";
import { CandidateConsent } from "./pages/CandidateConsent";
import { CandidatePortal } from "./pages/CandidatePortal";
import { IdentityVerification } from "./pages/IdentityVerification";
import { EmploymentHistory } from "./pages/EmploymentHistory";
import { CriminalRecord } from "./pages/CriminalRecord";
import { Education } from "./pages/Education";
import { SocialMedia } from "./pages/SocialMedia";
import { OnlinePresence } from "./pages/OnlinePresence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/submit-candidate" element={<CandidateSubmission />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/report/:id/identity" element={<IdentityVerification />} />
          <Route path="/report/:id/employment" element={<EmploymentHistory />} />
          <Route path="/report/:id/criminal" element={<CriminalRecord />} />
          <Route path="/report/:id/education" element={<Education />} />
          <Route path="/report/:id/social-media" element={<SocialMedia />} />
          <Route path="/report/:id/online-presence" element={<OnlinePresence />} />
          <Route path="/candidate/:id" element={<CandidateConsent />} />
          <Route path="/candidate-portal/:id" element={<CandidatePortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
