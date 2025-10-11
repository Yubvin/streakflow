import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

interface ViewHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit: any;
}

export function ViewHistoryModal({ open, onOpenChange, habit }: ViewHistoryModalProps) {
  // Generate mock history data for the last 30 days
  const generateHistoryData = () => {
    const history = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock completion status (80% completion rate for active habits)
      const isCompleted = Math.random() > 0.2;
      
      history.push({
        date: date.toISOString(),
        completed: isCompleted,
        streak: i < 7 ? habit?.currentStreak : Math.max(0, habit?.currentStreak - Math.floor(i / 7)),
      });
    }
    
    return history;
  };

  const historyData = generateHistoryData();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric",
        weekday: "short"
      });
    }
  };

  const completedDays = historyData.filter(day => day.completed).length;
  const completionRate = Math.round((completedDays / historyData.length) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-lg">{habit?.icon}</span>
              {habit?.name} History
            </DialogTitle>
            <DialogDescription>
              Your progress over the last 30 days
            </DialogDescription>
          </DialogHeader>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-semibold text-primary">{habit?.currentStreak || 0}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-semibold text-success">{completionRate}%</p>
                <p className="text-xs text-muted-foreground">last 30 days</p>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="text-2xl font-semibold text-warning">{habit?.longestStreak || 0}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </Card>
          </div>

          <Separator />

          {/* History List */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Daily History
            </h4>
            
            <ScrollArea className="h-[300px] w-full">
              <div className="space-y-2 pr-4">
                {historyData.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                  >
                    <Card className={`p-3 transition-colors duration-200 ${
                      day.completed ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {day.completed ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                          <div>
                            <p className="font-medium">{formatDate(day.date)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(day.date).toLocaleDateString("en-US", { 
                                year: "numeric", 
                                month: "short", 
                                day: "numeric" 
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={day.completed ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {day.completed ? "Completed" : "Missed"}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}