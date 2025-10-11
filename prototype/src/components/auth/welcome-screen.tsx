import { motion } from "motion/react";
import { Button } from "../ui/button";
import { BarChart3, CalendarCheck, Zap, Target } from "lucide-react";

interface WelcomeScreenProps {
  onNavigateToSignUp: () => void;
  onNavigateToLogin: () => void;
}

export function WelcomeScreen({ onNavigateToSignUp, onNavigateToLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto"
            >
              <Zap className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">StreakFlow</h1>
              <p className="text-muted-foreground text-lg">
                Build better habits, one streak at a time
              </p>
            </div>
          </div>

          {/* Features Grid - Responsive Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="py-8"
          >
            {/* Desktop: 4 columns, Tablet: 2x2 grid, Mobile: stacked */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-16">
              {/* Track Progress */}
              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto transition-colors duration-200 hover:bg-primary/8">
                  <BarChart3 className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-tight">Track Progress</p>
              </div>
              
              {/* Daily Reminders */}
              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto transition-colors duration-200 hover:bg-primary/8">
                  <CalendarCheck className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-tight">Daily Reminders</p>
              </div>
              
              {/* Build Streaks */}
              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto transition-colors duration-200 hover:bg-primary/8">
                  <Zap className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-tight">Build Streaks</p>
              </div>
              
              {/* Stay Motivated */}
              <div className="flex flex-col items-center space-y-3 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto transition-colors duration-200 hover:bg-primary/8">
                  <Target className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-tight">Stay Motivated</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4 max-w-md mx-auto"
          >
            <Button 
              onClick={onNavigateToSignUp}
              size="lg"
              className="w-full h-12"
            >
              Sign Up
            </Button>
            
            <Button 
              onClick={onNavigateToLogin}
              variant="outline"
              size="lg"
              className="w-full h-12"
            >
              Log In
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xs text-muted-foreground pt-4"
          >
            Start your journey to better habits today
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}