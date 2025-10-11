import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { AppTopbar } from "./components/app-topbar";
import { Dashboard } from "./components/screens/dashboard";
import { Habits } from "./components/screens/habits";
import { Analytics } from "./components/screens/analytics";
import { Profile } from "./components/screens/profile";
import { AddHabitModal } from "./components/add-habit-modal";
import { WelcomeScreen } from "./components/auth/welcome-screen";
import { SignUpScreen } from "./components/auth/sign-up-screen";
import { LoginScreen } from "./components/auth/login-screen";
import { ForgotPasswordModal } from "./components/auth/forgot-password-modal";
import { OnboardingModal } from "./components/onboarding/onboarding-modal";
import { MobileNav } from "./components/mobile/mobile-nav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

// Sample habit data
const initialHabits = [
  {
    id: "1",
    name: "Drink 8 glasses of water",
    icon: "💧",
    currentStreak: 7,
    longestStreak: 15,
    goal: 8,
    frequency: "daily",
    color: "#06B6D4",
    lastCheckIn: new Date().toISOString(),
    completedToday: false,
    progress: 62,
    currentStep: 5,
  },
  {
    id: "2",
    name: "30 minutes exercise",
    icon: "💪",
    currentStreak: 12,
    longestStreak: 20,
    goal: 1,
    frequency: "daily",
    color: "#22C55E",
    lastCheckIn: new Date(Date.now() - 86400000).toISOString(),
    completedToday: true,
    progress: 100,
    currentStep: 1,
  },
  {
    id: "3",
    name: "Read for 20 minutes",
    icon: "📚",
    currentStreak: 5,
    longestStreak: 8,
    goal: 1,
    frequency: "daily",
    color: "#A855F7",
    lastCheckIn: new Date().toISOString(),
    completedToday: false,
    progress: 0,
    currentStep: 0,
  },
  {
    id: "4",
    name: "Take vitamins",
    icon: "💊",
    currentStreak: 10,
    longestStreak: 15,
    goal: 3,
    frequency: "daily",
    color: "#EF4444",
    lastCheckIn: new Date().toISOString(),
    completedToday: false,
    progress: 33,
    currentStep: 1,
  },
  {
    id: "5",
    name: "Meditate",
    icon: "🧘",
    currentStreak: 3,
    longestStreak: 10,
    goal: 1,
    frequency: "daily",
    color: "#F97316",
    lastCheckIn: new Date().toISOString(),
    completedToday: true,
    progress: 100,
    currentStep: 1,
  },
];

type AuthScreen = "welcome" | "signup" | "login";
type User = {
  id: string;
  fullName: string;
  email: string;
  avatar?: string | null;
  isNewUser: boolean;
};

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState<AuthScreen>("welcome");
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  
  // App state
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");
  const [isDark, setIsDark] = useState(false);
  const [habits, setHabits] = useState(initialHabits);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Load theme and auth state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    // Check for saved authentication
    const savedUser = localStorage.getItem("streakflow_user");
    const savedOnboardingComplete = localStorage.getItem("streakflow_onboarding_complete");
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Show onboarding for new users who haven't completed it
      if (userData.isNewUser && !savedOnboardingComplete) {
        setShowOnboarding(true);
      }
    }
  }, []);

  // Handle mobile detection and responsive breakpoints
  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      
      // Auto-close sidebar on mobile
      if (width <= 768) {
        setSidebarOpen(false);
      } else if (width >= 1024) {
        // Auto-open sidebar on desktop
        setSidebarOpen(true);
      }
    };
    
    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);
    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on "/" key
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Close modals on Escape key
      if (e.key === "Escape") {
        setIsAddHabitOpen(false);
        setShowOnboarding(false);
      }

      // Quick navigation with Cmd/Ctrl + number keys
      if ((e.metaKey || e.ctrlKey) && e.key >= "1" && e.key <= "4") {
        e.preventDefault();
        const screens = ["dashboard", "habits", "analytics", "profile"];
        const screenIndex = parseInt(e.key) - 1;
        if (screens[screenIndex]) {
          setActiveScreen(screens[screenIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated]);

  // Authentication handlers
  const handleSignUpSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("streakflow_user", JSON.stringify(userData));
    
    if (userData.isNewUser) {
      setShowOnboarding(true);
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("streakflow_user", JSON.stringify(userData));
  };

  const handleOnboardingComplete = (habitData: any) => {
    setHabits(prev => [habitData, ...prev]);
    setShowOnboarding(false);
    localStorage.setItem("streakflow_onboarding_complete", "true");
    
    // Mark user as no longer new
    if (user) {
      const updatedUser = { ...user, isNewUser: false };
      setUser(updatedUser);
      localStorage.setItem("streakflow_user", JSON.stringify(updatedUser));
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem("streakflow_onboarding_complete", "true");
    
    if (user) {
      const updatedUser = { ...user, isNewUser: false };
      setUser(updatedUser);
      localStorage.setItem("streakflow_user", JSON.stringify(updatedUser));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentAuthScreen("welcome");
    localStorage.removeItem("streakflow_user");
    localStorage.removeItem("streakflow_onboarding_complete");
    toast.success("Logged out successfully");
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleAddHabit = (newHabit: any) => {
    setHabits(prev => [...prev, newHabit]);
    toast.success("Habit added successfully!");
  };

  const handleMarkHabitToday = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          progress: !wasCompleted ? 100 : 0,
          currentStreak: !wasCompleted ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1),
          lastCheckIn: new Date().toISOString(),
          currentStep: !wasCompleted ? (habit.goal || 1) : 0,
        };
      }
      return habit;
    }));
  };

  const handleIncrementHabitStep = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newStep = Math.min((habit.currentStep || 0) + 1, habit.goal || 1);
        const newProgress = (newStep / (habit.goal || 1)) * 100;
        const isCompleted = newStep >= (habit.goal || 1);
        
        return {
          ...habit,
          currentStep: newStep,
          progress: newProgress,
          completedToday: isCompleted,
          currentStreak: isCompleted && !habit.completedToday ? habit.currentStreak + 1 : habit.currentStreak,
          lastCheckIn: new Date().toISOString(),
        };
      }
      return habit;
    }));
  };

  const handleUndoHabitToday = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        // For multi-goal habits, decrement by one step
        if ((habit.goal || 1) > 1) {
          const newStep = Math.max((habit.currentStep || 0) - 1, 0);
          const newProgress = (newStep / (habit.goal || 1)) * 100;
          const wasCompleted = habit.completedToday;
          
          return {
            ...habit,
            currentStep: newStep,
            progress: newProgress,
            completedToday: newStep >= (habit.goal || 1),
            currentStreak: wasCompleted && newStep < (habit.goal || 1) ? Math.max(0, habit.currentStreak - 1) : habit.currentStreak,
            lastCheckIn: new Date().toISOString(),
          };
        }
        
        // For single-goal habits, reset completely
        return {
          ...habit,
          completedToday: false,
          progress: 0,
          currentStep: 0,
          currentStreak: Math.max(0, habit.currentStreak - 1),
          lastCheckIn: new Date().toISOString(),
        };
      }
      return habit;
    }));
  };

  const handleEditHabit = (habitId: string, updates: any) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          ...updates,
        };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const handleNavigateToSettings = (tab?: string) => {
    setActiveScreen("profile");
    if (tab) {
      setActiveSettingsTab(tab);
    }
  };

  const getScreenTitle = () => {
    switch (activeScreen) {
      case "dashboard": return "Dashboard";
      case "habits": return "Habits";
      case "analytics": return "Analytics & Insights";
      case "profile": return "Settings";
      default: return "StreakFlow";
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return (
          <Dashboard 
            habits={habits} 
            onMarkHabitToday={handleMarkHabitToday}
            onIncrementStep={handleIncrementHabitStep}
            onUndoToday={handleUndoHabitToday}
            onAddHabit={() => setIsAddHabitOpen(true)}
          />
        );
      case "habits":
        return (
          <Habits 
            habits={habits} 
            onAddHabit={() => setIsAddHabitOpen(true)}
            onMarkHabitToday={handleMarkHabitToday}
            onIncrementStep={handleIncrementHabitStep}
            onUndoToday={handleUndoHabitToday}
            onEditHabit={handleEditHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        );
      case "analytics":
        return <Analytics habits={habits} />;
      case "profile":
        return <Profile isDark={isDark} onToggleTheme={toggleTheme} activeTab={activeSettingsTab} />;
      default:
        return (
          <Dashboard 
            habits={habits} 
            onMarkHabitToday={handleMarkHabitToday}
            onIncrementStep={handleIncrementHabitStep}
            onUndoToday={handleUndoHabitToday}
            onAddHabit={() => setIsAddHabitOpen(true)}
          />
        );
    }
  };

  // If not authenticated, show auth screens
  if (!isAuthenticated) {
    if (currentAuthScreen === "welcome") {
      return (
        <>
          <WelcomeScreen
            onNavigateToSignUp={() => setCurrentAuthScreen("signup")}
            onNavigateToLogin={() => setCurrentAuthScreen("login")}
          />
          <Toaster 
            position={isMobile ? "top-center" : "bottom-right"}
            toastOptions={{
              duration: 3000,
              className: "bg-card text-card-foreground border-border",
            }}
          />
        </>
      );
    }

    if (currentAuthScreen === "signup") {
      return (
        <>
          <SignUpScreen
            onNavigateToLogin={() => setCurrentAuthScreen("login")}
            onNavigateBack={() => setCurrentAuthScreen("welcome")}
            onSignUpSuccess={handleSignUpSuccess}
          />
          <ForgotPasswordModal
            open={isForgotPasswordOpen}
            onOpenChange={setIsForgotPasswordOpen}
          />
          <Toaster 
            position={isMobile ? "top-center" : "bottom-right"}
            toastOptions={{
              duration: 3000,
              className: "bg-card text-card-foreground border-border",
            }}
          />
        </>
      );
    }

    if (currentAuthScreen === "login") {
      return (
        <>
          <LoginScreen
            onNavigateToSignUp={() => setCurrentAuthScreen("signup")}
            onNavigateBack={() => setCurrentAuthScreen("welcome")}
            onLoginSuccess={handleLoginSuccess}
            onForgotPassword={() => setIsForgotPasswordOpen(true)}
          />
          <ForgotPasswordModal
            open={isForgotPasswordOpen}
            onOpenChange={setIsForgotPasswordOpen}
          />
          <Toaster 
            position={isMobile ? "top-center" : "bottom-right"}
            toastOptions={{
              duration: 3000,
              className: "bg-card text-card-foreground border-border",
            }}
          />
        </>
      );
    }
  }

  // Authenticated user interface
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - Hidden on mobile, collapsible on tablet */}
          {!isMobile && (
            <div className={`transition-all duration-300 ease-in-out ${
              sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
            } flex-shrink-0`}>
              <AppSidebar 
                activeScreen={activeScreen} 
                onNavigate={setActiveScreen} 
              />
            </div>
          )}

          {/* Main Content Area - Full responsive */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <AppTopbar
              title={getScreenTitle()}
              onAddHabit={() => setIsAddHabitOpen(true)}
              onToggleTheme={toggleTheme}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              isDark={isDark}
              showAddButton={activeScreen === "dashboard" || activeScreen === "habits"}
              user={user || undefined}
              onLogout={handleLogout}
              habits={habits}
              onNavigateToSettings={handleNavigateToSettings}
            />
            
            {/* Main Content with proper spacing */}
            <main className={`flex-1 overflow-auto transition-all duration-200 ${
              isMobile 
                ? 'p-4 pb-24' // Extra bottom padding for mobile nav
                : sidebarOpen 
                  ? 'p-4 lg:p-6' 
                  : 'p-4 lg:p-8' // More padding when sidebar is closed
            }`}>
              <div className="max-w-full mx-auto">
                {renderScreen()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNav
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
        />
      )}

      {/* Add Habit Modal */}
      <AddHabitModal
        open={isAddHabitOpen}
        onOpenChange={setIsAddHabitOpen}
        onSave={handleAddHabit}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        open={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />

      {/* Toast Notifications */}
      <Toaster 
        position={isMobile ? "top-center" : "bottom-right"}
        toastOptions={{
          duration: 3000,
          className: "bg-card text-card-foreground border-border",
        }}
      />
    </div>
  );
}