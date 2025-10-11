import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LoginScreenProps {
  onNavigateToSignUp: () => void;
  onNavigateBack: () => void;
  onLoginSuccess: (user: { id: string; fullName: string; email: string; avatar?: string | null; isNewUser: boolean }) => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onNavigateToSignUp, onNavigateBack, onLoginSuccess, onForgotPassword }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Simulate login validation
      if (formData.email === "demo@streakflow.com" && formData.password === "password") {
        const user = {
          id: "demo-user",
          fullName: "Demo User",
          email: formData.email,
          avatar: null,
          isNewUser: false
        };
        
        toast.success("Logged in successfully!");
        onLoginSuccess(user);
      } else {
        // For demo purposes, accept any valid email/password combination
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: formData.email.split("@")[0],
          email: formData.email,
          avatar: null,
          isNewUser: false
        };
        
        toast.success("Logged in successfully!");
        onLoginSuccess(user);
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onNavigateBack}
            className="mb-6 -ml-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader className="space-y-1 text-center pb-4">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-muted-foreground">
                Sign in to continue your habit journey
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  
                  <Button
                    type="button"
                    variant="link"
                    onClick={onForgotPassword}
                    className="p-0 h-auto text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Button
                    type="button"
                    variant="link"
                    onClick={onNavigateToSignUp}
                    className="p-0 h-auto text-primary hover:underline"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>

              {/* Demo credentials hint */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  Demo: Any valid email and password will work
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}