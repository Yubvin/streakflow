import { useState, useEffect } from "react";
import { CheckCircle, Circle, Flame, Undo2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface HabitCardProps {
  id: string;
  name: string;
  emoji?: string;
  currentStreak: number;
  progress: number;
  goal?: number;
  isCompleted?: boolean;
  currentStep?: number;
  onMarkToday?: () => void;
  onIncrementStep?: () => void;
  onUndoToday?: () => void;
}

export function HabitCard({ 
  id,
  name, 
  emoji = "🎯", 
  currentStreak, 
  progress, 
  goal = 1,
  isCompleted = false,
  currentStep = 0,
  onMarkToday,
  onIncrementStep,
  onUndoToday
}: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  // Unified logic based on goal
  const isMultiGoal = goal > 1;
  const currentProgress = currentStep || 0;
  const displayProgress = isMultiGoal ? (currentProgress / goal) * 100 : progress;
  const isFullyCompleted = isMultiGoal ? currentProgress >= goal : isCompleted;

  // Handle action button click
  const handleActionClick = () => {
    if (isFullyCompleted && onUndoToday) {
      // Undo action
      setIsAnimating(true);
      onUndoToday();
      toast.success("Habit unmarked for today", {
        duration: 2000,
      });
      setTimeout(() => setIsAnimating(false), 300);
    } else if (isMultiGoal && onIncrementStep) {
      // Increment step
      setIsAnimating(true);
      onIncrementStep();
      
      const newStep = currentProgress + 1;
      if (newStep >= goal) {
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 2000);
        toast.success(`🎉 Great job! ${name} completed!`, {
          duration: 3000,
        });
      } else {
        toast.success(`Progress: ${newStep}/${goal}`, {
          duration: 2000,
        });
      }
      
      setTimeout(() => setIsAnimating(false), 300);
    } else if (onMarkToday) {
      // Simple mark action
      setIsAnimating(true);
      setJustCompleted(true);
      onMarkToday();
      setTimeout(() => setJustCompleted(false), 2000);
      toast.success(`🎉 Great job! ${name} completed!`, {
        duration: 3000,
      });
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // Render progress indicators for multi-goal habits
  const renderMultiGoalProgress = () => {
    if (!isMultiGoal) return null;

    return (
      <div className="flex gap-1 mt-2">
        {Array.from({ length: goal }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ease-in-out ${
              index < currentProgress
                ? "bg-primary scale-105"
                : index === currentProgress && isAnimating
                ? "bg-primary/60 scale-105"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  // Get button content based on state
  const getButtonContent = () => {
    if (isFullyCompleted) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        text: "Done",
        variant: "secondary" as const,
        showUndo: currentProgress > 0
      };
    } else {
      return {
        icon: <Circle className="h-4 w-4" />,
        text: "Mark",
        variant: "ghost" as const,
        showUndo: currentProgress > 0 && currentProgress < goal
      };
    }
  };

  const buttonContent = getButtonContent();

  return (
    <Card className={`p-4 transition-all duration-300 ease-in-out border-border group hover:shadow-md ${
      justCompleted ? "ring-2 ring-green-500/20 bg-green-50/50 dark:bg-green-950/20" : "hover:shadow-md"
    } ${isAnimating ? "scale-[0.98]" : "hover:scale-[1.02]"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-xl transition-transform duration-200 ${
            justCompleted ? "animate-bounce" : ""
          }`}>
            {emoji}
          </span>
          <div>
            <h3 className="font-medium text-foreground">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>{currentStreak} day streak</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Undo button - show only when progress is between 1 and Goal-1 */}
          {buttonContent.showUndo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndoToday}
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Undo"
            >
              <Undo2 className="h-3 w-3" />
            </Button>
          )}
          
          {/* Main action button */}
          <Button
            variant={buttonContent.variant}
            size="sm"
            onClick={handleActionClick}
            className={`flex items-center gap-1 h-8 transition-all duration-300 ease-in-out ${
              isAnimating ? "scale-95" : "hover:scale-105"
            } ${isFullyCompleted ? "bg-[#DCFCE7] dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-200" : ""}`}
          >
            <span className={`transition-transform duration-300 ease-in-out ${
              isAnimating ? "scale-110" : ""
            }`}>
              {buttonContent.icon}
            </span>
            <span className="hidden sm:inline text-xs font-medium">
              {buttonContent.text}
            </span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Steps Today label and counter for multi-goal habits */}
        {isMultiGoal && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Steps Today</span>
            <span className="font-medium">{currentProgress} / {goal}</span>
          </div>
        )}
        
        {/* Progress label for single-goal habits */}
        {!isMultiGoal && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Today's Progress</span>
            <span className="font-medium">{Math.round(displayProgress)}%</span>
          </div>
        )}
        
        {/* Progress visualization */}
        {isMultiGoal ? (
          renderMultiGoalProgress()
        ) : (
          <Progress 
            value={displayProgress} 
            className={`h-2 transition-all duration-300 ease-in-out ${
              justCompleted ? "bg-green-100 dark:bg-green-900/30" : ""
            }`}
          />
        )}
      </div>
    </Card>
  );
}