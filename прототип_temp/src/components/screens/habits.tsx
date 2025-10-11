import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Search, Filter, Calendar, MoreHorizontal, CheckCircle, Circle, Edit, History, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EmptyState } from "../empty-states/empty-state";
import { EditHabitModal } from "../edit-habit-modal";
import { ViewHistoryModal } from "../view-history-modal";
import { DeleteHabitModal } from "../delete-habit-modal";
import { HabitStatusControls } from "../habit-status-controls";
import { toast } from "sonner@2.0.3";

interface HabitsProps {
  habits: any[];
  onAddHabit: () => void;
  onMarkHabitToday: (habitId: string) => void;
  onIncrementStep: (habitId: string) => void;
  onUndoToday: (habitId: string) => void;
  onEditHabit?: (habitId: string, updates: any) => void;
  onDeleteHabit?: (habitId: string) => void;
}

export function Habits({ habits, onAddHabit, onMarkHabitToday, onIncrementStep, onUndoToday, onEditHabit, onDeleteHabit }: HabitsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  // Modal handlers
  const handleEditHabit = (habit: any) => {
    setSelectedHabit(habit);
    setEditModalOpen(true);
  };

  const handleViewHistory = (habit: any) => {
    setSelectedHabit(habit);
    setHistoryModalOpen(true);
  };

  const handleDeleteHabit = (habit: any) => {
    setSelectedHabit(habit);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = (habitId: string, updates: any) => {
    if (onEditHabit) {
      onEditHabit(habitId, updates);
      toast.success("Habit updated successfully!");
    }
  };

  const handleConfirmDelete = (habitId: string) => {
    if (onDeleteHabit) {
      onDeleteHabit(habitId);
      toast.success("Habit deleted successfully!");
    }
  };

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrequency = frequencyFilter === "all" || habit.frequency === frequencyFilter;
    return matchesSearch && matchesFrequency;
  });

  const formatLastCheckIn = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const EmptyState = () => (
    <Card className="p-12 text-center">
      <div className="space-y-4">
        <Calendar className="h-16 w-16 text-muted-foreground mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">No habits yet</h3>
          <p className="text-muted-foreground">
            Start building better habits by creating your first one.
          </p>
        </div>
        <Button onClick={onAddHabit} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Your First Habit
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Habits</h1>
          <p className="text-muted-foreground">Manage and track all your habits</p>
        </div>
        <Button onClick={onAddHabit} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Habit
        </Button>
      </div>

      {/* Toolbar */}
      {habits.length > 0 && (
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Frequency Filter */}
            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frequencies</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Habits Table or Empty State */}
      {habits.length === 0 ? (
        <EmptyState 
          type="habits"
          onAction={onAddHabit}
        />
      ) : filteredHabits.length === 0 ? (
        <EmptyState 
          type="search"
          title="No habits match your search"
          description="Try adjusting your search terms or filter criteria to find the habits you're looking for."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm("");
            setFrequencyFilter("all");
          }}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E2E8F0]">
                  <TableHead className="py-4 pl-6 pr-0 text-[#94A3B8] font-medium text-sm h-12">Habit</TableHead>
                  <TableHead className="py-4 px-6 text-[#94A3B8] font-medium text-sm h-12">Frequency</TableHead>
                  <TableHead className="py-4 px-6 text-center text-[#94A3B8] font-medium text-sm h-12">Current Streak</TableHead>
                  <TableHead className="py-4 px-6 text-[#94A3B8] font-medium text-sm h-12">Last Updated</TableHead>
                  <TableHead className="py-4 px-6 text-[#94A3B8] font-medium text-sm h-12 min-w-[240px]">Status</TableHead>
                  <TableHead className="py-4 pl-6 pr-6 text-center text-[#94A3B8] font-medium text-sm h-12 w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHabits.map((habit) => (
                  <TableRow key={habit.id} className="group transition-colors duration-200 border-b border-border/30" style={{ height: '68px' }}>
                    <TableCell className="py-0 pl-6 pr-0 relative">
                      <div className="absolute inset-0 left-6 right-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-lg"></div>
                      <div className="relative flex items-center gap-3 py-5">
                        <span className="text-lg w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ lineHeight: 1 }}>{habit.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-foreground text-sm leading-tight">{habit.name}</div>
                          <div className="text-xs text-[#94A3B8] mt-1.5 leading-tight">
                            Goal: {habit.goal} {habit.frequency === "daily" ? "times/day" : "times/week"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-0 px-6 relative">
                      <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative flex items-center py-5">
                        <Badge 
                          variant="secondary" 
                          className="capitalize text-xs px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] border-0 font-medium"
                        >
                          {habit.frequency}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-0 px-6 relative">
                      <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative flex flex-col items-center justify-center py-5">
                        <span className="font-semibold text-sm text-[#0F172A] leading-tight">{habit.currentStreak}</span>
                        <span className="text-[#94A3B8] text-xs leading-tight mt-0.5">days</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-0 px-6 relative">
                      <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative flex items-center py-5">
                        <span className="text-sm text-[#94A3B8] leading-tight">
                          {formatLastCheckIn(habit.lastCheckIn)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-0 px-6 relative">
                      <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="relative flex items-center py-5">
                        <HabitStatusControls
                          habit={habit}
                          onIncrement={() => onIncrementStep(habit.id)}
                          onMarkComplete={() => onMarkHabitToday(habit.id)}
                          onUndo={() => onUndoToday(habit.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-0 pl-6 pr-6 relative">
                      <div className="absolute inset-0 right-6 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-lg"></div>
                      <div className="relative flex items-center justify-center py-5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                              <MoreHorizontal className="h-5 w-5 stroke-2" />
                            </Button>
                          </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-lg shadow-md">
                          <DropdownMenuItem 
                            onClick={() => handleEditHabit(habit)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Habit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleViewHistory(habit)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <History className="h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteHabit(habit)}
                            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Habit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Modals */}
      <EditHabitModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSave={handleSaveEdit}
        habit={selectedHabit}
      />

      <ViewHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        habit={selectedHabit}
      />

      <DeleteHabitModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        habit={selectedHabit}
      />
    </div>
  );
}