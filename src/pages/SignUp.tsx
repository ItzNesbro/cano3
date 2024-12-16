import React, { useState, useEffect } from "react";
import { registerUser, getCurrentUser } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate("/");
    }
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        variant: "default",
      })
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4 flex flex-col items-center w-[250px]">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          className="mb-4 w-full"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="bg-[#9b87f5]">Sign Up</Button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-[#9b87f5] hover:text-[#9b87f5]">Login</Link></p>
    </div>
  )
}

export default SignUp
