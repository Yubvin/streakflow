import { BarChart3, Home, Settings, Target } from "lucide-react";
import { Button } from "../ui/button";

interface MobileNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function MobileNav({ activeScreen, onNavigate }: MobileNavProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: Home,
    },
    {
      id: "habits",
      label: "Habits",
      icon: Target,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      id: "profile",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 safe-area-padding-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-full mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center h-14 px-3 py-2 space-y-1 rounded-xl transition-all duration-200 relative flex-1 max-w-20 ${
                isActive
                  ? "text-primary bg-primary/15 scale-110 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 active:scale-95"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-primary rounded-full" />
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-200 stroke-2 ${
                isActive ? "scale-110" : ""
              }`} />
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-2 md:h-0" />
    </div>
  );
}