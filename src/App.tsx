import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/Not-Found";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Navbar />
        <Routes>
          {/* <Route path="/auth" element={<AuthLayout />} /> */}
          <Route
            path="/"
            element={
              <Index />
            }
          />
          <Route
            path="/about"
            element={
              <About />
            }
          />
          <Route
            path="/products"
            element={
              <Products />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPanel />
            }
          />
          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider >
  );
};

export default App;
