import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Zap, Target, Bell, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface OnboardingModalProps {
  open: boolean;
  onComplete: (habitData: any) => void;
  onSkip: () => void;
}

const HABIT_ICONS = [
  "💧", "💪", "📚", "🧘", "🏃", "🎯", "✍️", "🎵", "🌱", "🍎",
  "💻", "🧠", "🎨", "📱", "☕", "🛌", "🧹", "💼", "🎮", "📝"
];

export function OnboardingModal({ open, onComplete, onSkip }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [habitData, setHabitData] = useState({
    name: "",
    icon: "🎯",
    frequency: "daily",
    goal: 1,
    reminderTime: "09:00"
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep === 1 && !habitData.name.trim()) {
      toast.error("Please enter a habit name");
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    const newHabit = {
      id: Math.random().toString(36).substr(2, 9),
      name: habitData.name,
      icon: habitData.icon,
      currentStreak: 0,
      longestStreak: 0,
      goal: habitData.goal,
      frequency: habitData.frequency,
      color: "#4F46E5",
      lastCheckIn: null,
      completedToday: false,
      progress: 0,
      reminderTime: habitData.reminderTime
    };
    
    onComplete(newHabit);
    toast.success("Welcome to StreakFlow! Your first habit has been created.");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Welcome to StreakFlow!</h3>
                <p className="text-muted-foreground mt-2">
                  Let's get you started by creating your first habit to track
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="habit-name">What habit would you like to track?</Label>
                <Input
                  id="habit-name"
                  placeholder="e.g., Drink 8 glasses of water"
                  value={habitData.name}
                  onChange={(e) => setHabitData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Choose an icon</Label>
                <div className="grid grid-cols-10 gap-2">
                  {HABIT_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setHabitData(prev => ({ ...prev, icon }))}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-lg hover:bg-accent transition-colors ${
                        habitData.icon === icon ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Set your goal</h3>
                <p className="text-muted-foreground mt-2">
                  How often would you like to do this habit?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select
                  value={habitData.frequency}
                  onValueChange={(value) => setHabitData(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Daily Goal</Label>
                <Select
                  value={habitData.goal.toString()}
                  onValueChange={(value) => setHabitData(prev => ({ ...prev, goal: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 10, 15, 30].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {habitData.frequency === "daily" ? "time(s) per day" : "time(s) per week"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Bell className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Set daily reminder</h3>
                <p className="text-muted-foreground mt-2">
                  When would you like to be reminded about this habit?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={habitData.reminderTime}
                  onChange={(e) => setHabitData(prev => ({ ...prev, reminderTime: e.target.value }))}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Habit Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{habitData.icon}</span>
                    <span>{habitData.name}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {habitData.goal} {habitData.frequency === "daily" ? "time(s) per day" : "time(s) per week"} • 
                    Reminder at {habitData.reminderTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideClose>
        <DialogHeader>
          <DialogTitle className="sr-only">Onboarding</DialogTitle>
          <DialogDescription className="sr-only">
            Set up your first habit in StreakFlow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              <Button
                variant="link"
                onClick={onSkip}
                className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
              >
                Skip onboarding
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {renderStep()}

          <Separator />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinish}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Finish Setup
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}