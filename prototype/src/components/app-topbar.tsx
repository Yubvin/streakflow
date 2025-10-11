import { useState, useEffect, useRef } from "react";
import { Bell, Menu, Moon, Plus, Search, Sun, User, LogOut, Settings, UserCircle, X, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SearchResults } from "./search/search-results";
import { NotificationDropdown } from "./notifications/notification-dropdown";
import { AvatarUploadModal } from "./avatar/avatar-upload-modal";
import { LogoutConfirmationModal } from "./logout-confirmation-modal";

interface AppTopbarProps {
  title: string;
  onAddHabit?: () => void;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  isDark: boolean;
  showAddButton?: boolean;
  user?: {
    fullName: string;
    email: string;
    avatar?: string | null;
  };
  onLogout?: () => void;
  habits?: any[];
  onNavigateToSettings?: (tab?: string) => void;
}

export function AppTopbar({ 
  title, 
  onAddHabit, 
  onToggleTheme, 
  onToggleSidebar,
  isDark, 
  showAddButton = false,
  user,
  onLogout,
  habits = [],
  onNavigateToSettings
}: AppTopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(user?.avatar || null);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "habit" as const,
      title: "Daily reminder",
      message: "Don't forget to log your water intake!",
      time: "2 hours ago",
      read: false,
      icon: null
    },
    {
      id: "2", 
      type: "streak" as const,
      title: "Streak milestone!",
      message: "You've reached a 7-day streak for exercise!",
      time: "5 hours ago", 
      read: false,
      icon: null
    },
    {
      id: "3",
      type: "achievement" as const,
      title: "New achievement",
      message: "Consistent performer - 5 habits completed this week!",
      time: "1 day ago",
      read: true,
      icon: null
    }
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on "/" key
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const searchInput = searchInputRef.current;
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Close search on Escape
      if (e.key === "Escape") {
        setIsSearchFocused(false);
        if (searchQuery) {
          setSearchQuery("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  // Generate search results based on query
  const searchResults = searchQuery.trim() ? [
    ...habits.filter(habit => 
      habit.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(habit => ({
      id: habit.id,
      title: habit.name,
      type: "habit" as const,
      description: `${habit.frequency} habit`,
      streak: habit.currentStreak,
      icon: habit.icon
    })),
    // Mock reports
    ...(searchQuery.toLowerCase().includes("report") || searchQuery.toLowerCase().includes("analytics") ? [
      {
        id: "weekly-report",
        title: "Weekly Progress Report",
        type: "report" as const,
        description: "Your habit completion summary"
      },
      {
        id: "monthly-report", 
        title: "Monthly Analytics",
        type: "report" as const,
        description: "Detailed insights and trends"
      }
    ] : [])
  ] : [];

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAvatarSave = (newAvatarUrl: string) => {
    setUserAvatar(newAvatarUrl);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleNavigateToProfile = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings("profile");
    }
  };

  const handleNavigateToPreferences = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings("preferences");
    }
  };

  const handleNavigateToNotifications = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings("notifications");
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const userInitials = user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <>
      <header className="sticky top-0 h-16 border-b border-border bg-card/95 backdrop-blur-sm px-4 lg:px-6 flex items-center justify-between relative z-40 w-full">
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hidden md:flex lg:hidden flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <Menu className="h-5 w-5 stroke-2" />
          </Button>
          <h1 className="font-semibold text-lg text-foreground truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8] pointer-events-none z-10 stroke-2" />
            <Input
              ref={searchInputRef}
              placeholder="Search habits... (Press / to focus)"
              className={`pl-9 transition-all duration-200 ease-in-out ${
                isSearchFocused ? "w-80 shadow-md ring-2 ring-primary/20" : "w-48 lg:w-64"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/60 transition-colors"
              >
                <X className="h-4 w-4 stroke-2" />
              </Button>
            )}
            {(isSearchFocused || searchQuery) && (
              <SearchResults
                query={searchQuery}
                results={searchResults}
                onClose={() => setIsSearchFocused(false)}
              />
            )}
          </div>

          {/* Add Habit Button */}
          {showAddButton && onAddHabit && (
            <Button 
              onClick={onAddHabit} 
              size="sm" 
              className="gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4 stroke-2" />
              <span className="hidden sm:inline">Add Habit</span>
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-accent/50"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4 stroke-2" /> : <Moon className="h-4 w-4 stroke-2" />}
          </Button>

          {/* Notifications */}
          <NotificationDropdown
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 rounded-full p-0 transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] hover:ring-2 hover:ring-primary/20"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar || undefined} />
                  <AvatarFallback className="text-xs font-medium">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56"
              style={{
                animation: "fadeSlideIn 150ms ease-in-out"
              }}
            >
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleNavigateToProfile}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <UserCircle className="w-4 h-4 mr-2 stroke-2 text-[#64748B] dark:text-[#94A3B8]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleNavigateToPreferences}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <Palette className="w-4 h-4 mr-2 stroke-2 text-[#64748B] dark:text-[#94A3B8]" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleNavigateToNotifications}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <Bell className="w-4 h-4 mr-2 stroke-2 text-[#64748B] dark:text-[#94A3B8]" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogoutClick} 
                className="text-[#DC2626] cursor-pointer hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2 stroke-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        open={isAvatarModalOpen}
        onOpenChange={setIsAvatarModalOpen}
        currentAvatar={userAvatar}
        userInitials={userInitials}
        onSave={handleAvatarSave}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}