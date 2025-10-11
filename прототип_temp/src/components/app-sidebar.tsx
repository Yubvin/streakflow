import { BarChart3, Calendar, Home, Settings, User } from "lucide-react";
import { cn } from "./ui/utils";

interface AppSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "habits", name: "Habits", icon: Calendar },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "profile", name: "Settings", icon: Settings },
];

export function AppSidebar({ activeScreen, onNavigate }: AppSidebarProps) {
  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">StreakFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeScreen === item.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}