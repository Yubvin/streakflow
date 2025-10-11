import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { CheckCircle, Circle, Undo2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HabitStatusControlsProps {
  habit: any;
  onIncrement: () => void;
  onMarkComplete: () => void;
  onUndo: () => void;
}

export function HabitStatusControls({ habit, onIncrement, onMarkComplete, onUndo }: HabitStatusControlsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentProgress = habit.currentStep || 0;
  const totalGoal = habit.goal || 1;
  const isCompleted = habit.completedToday || currentProgress >= totalGoal;
  const isMultiGoal = totalGoal > 1;
  const progressPercentage = (currentProgress / totalGoal) * 100;
  const showUndo = currentProgress > 0 && !isCompleted;

  const handleIncrement = () => {
    if (currentProgress < totalGoal) {
      setIsAnimating(true);
      onIncrement();
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleUndo = () => {
    if (currentProgress > 0) {
      setIsAnimating(true);
      onUndo();
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleToggleComplete = () => {
    if (!isMultiGoal) {
      onMarkComplete();
    }
  };

  // Single-goal habit (binary behavior) - Centered with 12px vertical padding
  if (!isMultiGoal) {
    return (
      <div className="flex items-center justify-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isCompleted ? "default" : "ghost"}
                size="sm"
                onClick={handleToggleComplete}
                className={`h-8 px-3 text-xs rounded-lg transition-all duration-200 font-medium ${
                  isCompleted 
                    ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] cursor-default shadow-sm" 
                    : "hover:bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 mr-2 stroke-2" />
                ) : (
                  <Circle className="h-4 w-4 mr-2 stroke-2" />
                )}
                {isCompleted ? "Done" : "Mark"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCompleted ? "Habit completed today" : "Mark as complete"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Multi-goal habit (incremental behavior) - Unified status cluster
  return (
    <div className="flex items-center justify-start">
      {/* For completed habits, show only Done button */}
      {isCompleted ? (
        <Button
          variant="default"
          size="sm"
          className="h-8 px-3 text-xs rounded-lg bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] cursor-default shadow-sm font-medium"
        >
          <CheckCircle className="h-4 w-4 mr-2 stroke-2" />
          Done
        </Button>
      ) : (
        <div className="flex items-baseline gap-4">
          {/* Progress Counter and Bar Group - Horizontal alignment */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-sm font-medium text-foreground min-w-[38px] leading-none"
            >
              {currentProgress}/{totalGoal}
            </motion.div>
            
            {/* Thin Progress Bar - 3px height, soft blue */}
            <div className="w-14 h-[3px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#93C5FD] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Control Buttons - Baseline aligned */}
          <div className="flex items-center gap-1">
            {/* Mark Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleIncrement}
                    className="h-8 px-3 text-xs rounded-lg transition-all duration-200 hover:bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-medium"
                  >
                    <Circle className="h-4 w-4 mr-2 stroke-2" />
                    Mark
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add one completion</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Undo Button - Only show when progress > 0 and not completed */}
            <AnimatePresence>
              {showUndo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleUndo}
                          className="h-8 w-8 p-0 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#64748B] hover:text-[#DC2626]"
                        >
                          <Undo2 className="h-4 w-4 stroke-2" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove last completion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}