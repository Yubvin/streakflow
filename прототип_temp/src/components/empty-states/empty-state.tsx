import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Target, Plus, TrendingUp, Calendar, Search, BarChart3 } from "lucide-react";

interface EmptyStateProps {
  type?: "habits" | "analytics" | "search" | "notifications";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showAnimation?: boolean;
}

export function EmptyState({ 
  type = "habits",
  title,
  description,
  actionLabel,
  onAction,
  showAnimation = true 
}: EmptyStateProps) {
  const getEmptyStateConfig = () => {
    switch (type) {
      case "habits":
        return {
          icon: Target,
          title: title || "No habits yet",
          description: description || "Start building better habits by creating your first habit tracker. Set goals, track progress, and build lasting streaks.",
          actionLabel: actionLabel || "Create Your First Habit",
          iconColor: "text-primary",
          bgColor: "bg-primary/10"
        };
      case "analytics":
        return {
          icon: BarChart3,
          title: title || "No data to analyze",
          description: description || "Once you start tracking habits, you'll see detailed analytics and insights about your progress here.",
          actionLabel: actionLabel || "Add Some Habits",
          iconColor: "text-secondary",
          bgColor: "bg-secondary/10"
        };
      case "search":
        return {
          icon: Search,
          title: title || "No results found",
          description: description || "Try adjusting your search terms or browse all habits instead.",
          actionLabel: actionLabel || "Clear Search",
          iconColor: "text-muted-foreground",
          bgColor: "bg-muted/30"
        };
      case "notifications":
        return {
          icon: Calendar,
          title: title || "All caught up!",
          description: description || "You have no new notifications right now. Keep tracking your habits to stay updated on your progress.",
          actionLabel: actionLabel || "View Dashboard",
          iconColor: "text-success",
          bgColor: "bg-success/10"
        };
      default:
        return {
          icon: Target,
          title: title || "Nothing here yet",
          description: description || "Get started by adding some content.",
          actionLabel: actionLabel || "Get Started",
          iconColor: "text-muted-foreground",
          bgColor: "bg-muted/30"
        };
    }
  };

  const config = getEmptyStateConfig();
  const Icon = config.icon;

  return (
    <Card className="p-8 lg:p-12">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
        {/* Animated Icon */}
        <motion.div
          initial={showAnimation ? { scale: 0.8, opacity: 0 } : {}}
          animate={showAnimation ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center`}
        >
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={showAnimation ? { y: 20, opacity: 0 } : {}}
          animate={showAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="space-y-3"
        >
          <h3 className="text-xl font-semibold text-foreground">
            {config.title}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {/* Action Button */}
        {onAction && (
          <motion.div
            initial={showAnimation ? { y: 20, opacity: 0 } : {}}
            animate={showAnimation ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Button 
              onClick={onAction}
              size="lg"
              className="gap-2"
            >
              {type === "habits" && <Plus className="w-4 h-4" />}
              {type === "analytics" && <TrendingUp className="w-4 h-4" />}
              {config.actionLabel}
            </Button>
          </motion.div>
        )}

        {/* Additional Context for Habits */}
        {type === "habits" && (
          <motion.div
            initial={showAnimation ? { opacity: 0 } : {}}
            animate={showAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 space-y-4"
          >
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Track Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>Build Streaks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Stay Motivated</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}