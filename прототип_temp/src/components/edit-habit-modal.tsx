import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Info } from "lucide-react";

interface EditHabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (habitId: string, updates: any) => void;
  habit: any;
}

const habitIcons = ["🎯", "💧", "💪", "📚", "🧘", "🏃", "🥗", "💤", "🎨", "🎵"];
const habitColors = ["#4F46E5", "#06B6D4", "#22C55E", "#A855F7", "#F97316", "#EF4444", "#FACC15", "#EC4899"];

export function EditHabitModal({ open, onOpenChange, onSave, habit }: EditHabitModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    goal: 1,
    frequency: "daily" as "daily" | "weekly" | "custom",
    icon: "🎯",
    color: "#4F46E5",
    weekdays: [true, true, true, true, true, true, true], // Mon-Sun
  });

  // Populate form with habit data when modal opens
  const populateForm = () => {
    if (habit) {
      setFormData({
        name: habit.name || "",
        goal: habit.goal || 1,
        frequency: habit.frequency || "daily",
        icon: habit.icon || "🎯",
        color: habit.color || "#4F46E5",
        weekdays: habit.weekdays || [true, true, true, true, true, true, true],
      });
    }
  };

  // Populate form when modal is opened or habit changes
  React.useEffect(() => {
    if (open && habit) {
      populateForm();
    }
  }, [open, habit]);

  // Reset weekdays when frequency changes
  const handleFrequencyChange = (frequency: "daily" | "weekly" | "custom") => {
    let newWeekdays;
    
    if (frequency === "daily") {
      // Daily: All days active (but not shown)
      newWeekdays = [true, true, true, true, true, true, true];
    } else if (frequency === "weekly") {
      // Weekly: Start with weekdays selected (Mon-Fri)
      newWeekdays = [true, true, true, true, true, false, false];
    } else {
      // Custom: Start with no days selected (user must choose)
      newWeekdays = [false, false, false, false, false, false, false];
    }
    
    setFormData(prev => ({ 
      ...prev, 
      frequency, 
      weekdays: newWeekdays 
    }));
  };

  // Computed values for dynamic UI
  const goalFieldLabel = useMemo(() => {
    switch (formData.frequency) {
      case "daily": return "Goal per day";
      case "weekly": return "Goal per week";
      case "custom": return "Goal per selected day";
      default: return "Goal per day";
    }
  }, [formData.frequency]);

  const goalPlaceholder = useMemo(() => {
    switch (formData.frequency) {
      case "daily": return "e.g., 8 times/day";
      case "weekly": return "e.g., 5 times/week";
      case "custom": return "e.g., 3 times/day";
      default: return "e.g., 8 times/day";
    }
  }, [formData.frequency]);

  const selectedDaysCount = useMemo(() => {
    return formData.weekdays.filter(Boolean).length;
  }, [formData.weekdays]);

  const selectedDayNames = useMemo(() => {
    const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return formData.weekdays
      .map((selected, index) => selected ? weekdayNames[index] : null)
      .filter(Boolean);
  }, [formData.weekdays]);

  const isFormValid = useMemo(() => {
    const hasName = formData.name.trim().length > 0;
    const hasValidDays = formData.frequency === "custom" ? selectedDaysCount > 0 : true;
    return hasName && hasValidDays;
  }, [formData.name, formData.frequency, selectedDaysCount]);

  const habitSummary = useMemo(() => {
    if (!formData.name.trim()) return "";
    
    switch (formData.frequency) {
      case "daily":
        return `This habit will repeat every day — 7 times per week.`;
      case "weekly":
        if (selectedDaysCount === 0) return "Please select at least one day.";
        if (selectedDaysCount === 7) return `This habit will track ${formData.goal} total completions across all days of the week.`;
        return `This habit will track ${formData.goal} total completions across ${selectedDayNames.join(", ")} — ${selectedDaysCount} days per week.`;
      case "custom":
        if (selectedDaysCount === 0) return "Please select at least one day.";
        if (selectedDaysCount === 1) return `This habit will repeat only on ${selectedDayNames[0]}.`;
        return `This habit will repeat on ${selectedDayNames.join(", ")} — ${selectedDaysCount} days per week.`;
      default:
        return "";
    }
  }, [formData.frequency, formData.name, formData.goal, selectedDaysCount, selectedDayNames]);

  const handleSave = () => {
    const updates = {
      name: formData.name,
      icon: formData.icon,
      goal: formData.goal,
      frequency: formData.frequency,
      color: formData.color,
      weekdays: formData.weekdays,
    };

    onSave(habit.id, updates);
    onOpenChange(false);
  };

  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>
            Update your habit details. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Habit Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              placeholder="e.g., Drink 8 glasses of water"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select 
              value={formData.frequency} 
              onValueChange={handleFrequencyChange}
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

          {/* Goal - Dynamic label and placeholder */}
          <div className="space-y-2">
            <Label htmlFor="goal">{goalFieldLabel}</Label>
            <Input
              id="goal"
              type="number"
              min="1"
              placeholder={goalPlaceholder}
              value={formData.goal}
              onChange={(e) => setFormData(prev => ({ ...prev, goal: parseInt(e.target.value) || 1 }))}
            />
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
              <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Define how many times you want to complete this habit per selected period.</span>
            </div>
          </div>

          {/* Day Selection (for Weekly and Custom) */}
          {(formData.frequency === "weekly" || formData.frequency === "custom") && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>
                  {formData.frequency === "weekly" ? "Track progress across these days" : "Select specific days"}
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {weekdayNames.map((day, index) => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.weekdays[index] ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newWeekdays = [...formData.weekdays];
                        newWeekdays[index] = !newWeekdays[index];
                        setFormData(prev => ({ ...prev, weekdays: newWeekdays }));
                      }}
                      className={`h-8 px-3 rounded-full text-xs font-medium transition-all duration-200 ${
                        formData.weekdays[index]
                          ? "bg-[#6366F1] text-white hover:bg-[#6366F1] shadow-sm scale-105"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] hover:border-[#CBD5E1] hover:scale-105"
                      }`}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Visual Summary */}
              {habitSummary && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{habitSummary}</p>
                      {selectedDaysCount > 0 && (
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {selectedDayNames.map((day) => (
                            <Badge key={day} variant="secondary" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Daily Summary (for daily frequency) */}
          {formData.frequency === "daily" && formData.name.trim() && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground font-medium">{habitSummary}</p>
              </div>
            </div>
          )}

          {/* Icon Selector */}
          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {habitIcons.map((icon) => (
                <Button
                  key={icon}
                  variant={formData.icon === icon ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className="text-lg p-2"
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {habitColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className="w-8 h-8 rounded-full border-2 border-border"
                  style={{ 
                    backgroundColor: color,
                    borderColor: formData.color === color ? '#000' : 'var(--border)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!isFormValid}
            className="min-w-[100px]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}