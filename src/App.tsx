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
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Navbar />
        <Routes>
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
          <Route
            path="/register"
            element={
              <SignUp />
            }
          />
          <Route
            path="/login"
            element={
              <Login />
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider >
  );
};

export default App;
