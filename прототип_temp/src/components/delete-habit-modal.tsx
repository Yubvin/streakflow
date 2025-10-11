import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

interface DeleteHabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (habitId: string) => void;
  habit: any;
}

export function DeleteHabitModal({ open, onOpenChange, onConfirm, habit }: DeleteHabitModalProps) {
  const handleDelete = () => {
    onConfirm(habit.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {/* Backdrop blur effect */}
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="relative"
        >
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            
            <DialogTitle className="text-xl">Delete Habit?</DialogTitle>
            
            <DialogDescription className="text-center space-y-2">
              <p>
                Are you sure you want to permanently delete{" "}
                <span className="font-medium text-foreground">
                  "{habit?.name}"
                </span>
                ?
              </p>
              <p className="text-sm text-destructive">
                This action cannot be undone.
              </p>
            </DialogDescription>
          </DialogHeader>

          {/* Habit Preview */}
          <div className="my-6 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <span className="text-xl">{habit?.icon}</span>
              <div>
                <p className="font-medium">{habit?.name}</p>
                <p className="text-sm text-muted-foreground">
                  Current streak: {habit?.currentStreak || 0} days
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
              className="w-full sm:w-auto bg-destructive hover:bg-destructive/90"
            >
              Delete Habit
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}