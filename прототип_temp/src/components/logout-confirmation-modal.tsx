import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";

interface LogoutConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutConfirmationModal({ open, onOpenChange, onConfirm }: LogoutConfirmationModalProps) {
  const handleLogout = () => {
    onConfirm();
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
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="relative"
        >
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
              <LogOut className="h-6 w-6 text-destructive" />
            </div>
            
            <DialogTitle className="text-xl">Log out?</DialogTitle>
            
            <DialogDescription className="text-center">
              Are you sure you want to log out of StreakFlow?
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleLogout}
              className="w-full sm:w-auto bg-destructive hover:bg-destructive/90"
            >
              Logout
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}