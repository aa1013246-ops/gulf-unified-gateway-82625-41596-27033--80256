import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Track from "./pages/Track";
import CreateChaletLink from "./pages/CreateChaletLink";
import CreateShippingLink from "./pages/CreateShippingLink";
import CreateInvoiceLink from "./pages/CreateInvoiceLink";
import CreateHealthLink from "./pages/CreateHealthLink";
import CreateLogisticsLink from "./pages/CreateLogisticsLink";
import CreateContractLink from "./pages/CreateContractLink";
import Microsite from "./pages/Microsite";
import PaymentDetails from "./pages/PaymentDetails";
import PaymentCard from "./pages/PaymentCard";
import PaymentOTP from "./pages/PaymentOTP";
import PaymentReceipt from "./pages/PaymentReceipt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/track" element={<Track />} />
        <Route path="/create/:country/chalet" element={<CreateChaletLink />} />
        <Route path="/create/:country/shipping" element={<CreateShippingLink />} />
        <Route path="/create/:country/invoice" element={<CreateInvoiceLink />} />
        <Route path="/create/:country/health" element={<CreateHealthLink />} />
        <Route path="/create/:country/logistics" element={<CreateLogisticsLink />} />
        <Route path="/create/:country/contract" element={<CreateContractLink />} />
        <Route path="/r/:country/:type/:id" element={<Microsite />} />
        <Route path="/pay/:id/details" element={<PaymentDetails />} />
        <Route path="/pay/:id/card/:paymentId" element={<PaymentCard />} />
        <Route path="/pay/:id/otp/:paymentId" element={<PaymentOTP />} />
        <Route path="/pay/:id/receipt/:paymentId" element={<PaymentReceipt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
