import { HabitCard } from "../habit-card";
import { KPICard } from "../kpi-card";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Target, TrendingUp, Zap, Plus } from "lucide-react";
import { HabitStatusControls } from "../habit-status-controls";

interface DashboardProps {
  habits: any[];
  onMarkHabitToday: (habitId: string) => void;
  onIncrementStep: (habitId: string) => void;
  onUndoToday: (habitId: string) => void;
  onAddHabit: () => void;
}

// Sample chart data
const weeklyData = [
  { day: "Mon", completion: 85 },
  { day: "Tue", completion: 92 },
  { day: "Wed", completion: 78 },
  { day: "Thu", completion: 88 },
  { day: "Fri", completion: 95 },
  { day: "Sat", completion: 82 },
  { day: "Sun", completion: 90 },
];

export function Dashboard({ habits, onMarkHabitToday, onIncrementStep, onUndoToday, onAddHabit }: DashboardProps) {
  const completionRate = Math.round(
    (habits.filter(h => h.completedToday).length / habits.length) * 100
  );
  
  const currentStreakAvg = Math.round(
    habits.reduce((sum, h) => sum + h.currentStreak, 0) / habits.length
  );
  
  const longestStreak = Math.max(...habits.map(h => h.longestStreak));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your habit progress for today</p>
        </div>
        <Button onClick={onAddHabit} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Habit
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Today's Completion"
          value={`${completionRate}%`}
          icon={Target}
          trend="up"
          trendValue="+5% from yesterday"
        />
        <KPICard
          title="Current Streak"
          value={`${currentStreakAvg} days`}
          icon={Zap}
          trend="up"
          trendValue="Average across habits"
        />
        <KPICard
          title="Longest Streak"
          value={`${longestStreak} days`}
          icon={TrendingUp}
          trend="neutral"
          trendValue="Personal best"
        />
        <KPICard
          title="Active Habits"
          value={habits.length}
          icon={Calendar}
          trend="neutral"
          trendValue="Total tracked"
        />
      </div>

      {/* Today's Streaks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Today's Streaks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              emoji={habit.icon}
              currentStreak={habit.currentStreak}
              progress={habit.progress}
              goal={habit.goal}
              isCompleted={habit.completedToday}
              currentStep={habit.currentStep}
              onMarkToday={() => onMarkHabitToday(habit.id)}
              onIncrementStep={() => onIncrementStep(habit.id)}
              onUndoToday={() => onUndoToday(habit.id)}
            />
          ))}
        </div>
      </div>

      {/* Weekly Progress + Habits Overview - Responsive Layout */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start lg:gap-6 xl:gap-8">
          {/* Weekly Progress Chart */}
          <Card className="p-6 w-full">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Progress</h3>
              <div className="h-64 w-full min-w-0 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" minWidth={320}>
                  <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid 
                      strokeDasharray="1 1" 
                      stroke="#E2E8F0" 
                      strokeOpacity={0.3}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#475569' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#475569' }}
                      width={30}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                        color: '#0F172A',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px',
                        padding: '12px',
                        backdropFilter: 'blur(8px)',
                        transition: 'opacity 150ms ease-in-out'
                      }}
                      labelStyle={{
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#475569'
                      }}
                      itemStyle={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#0F172A'
                      }}
                      cursor={{ stroke: '#5B4DFF', strokeWidth: 1, strokeOpacity: 0.3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#5B4DFF" 
                      strokeWidth={2.5}
                      dot={{ fill: '#5B4DFF', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: '#5B4DFF', strokeWidth: 2, stroke: '#FFFFFF' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Habits Overview Table */}
          <Card className="w-full min-w-0">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Habits Overview</h3>
              <div className="overflow-x-auto -mx-6 px-6">
                <div className="min-w-[420px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#E2E8F0]">
                        <TableHead className="py-4 pl-6 pr-0 text-[#94A3B8] font-medium text-sm h-12">Habit</TableHead>
                        <TableHead className="text-center py-4 px-4 w-20 text-[#94A3B8] font-medium text-sm h-12">Current</TableHead>
                        <TableHead className="text-center py-4 px-4 w-20 text-[#94A3B8] font-medium text-sm h-12">Longest</TableHead>
                        <TableHead className="py-4 pl-4 pr-6 w-56 text-[#94A3B8] font-medium text-sm h-12">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {habits.slice(0, 5).map((habit) => (
                        <TableRow key={habit.id} className="group transition-colors duration-200 border-b border-border/30" style={{ height: '68px' }}>
                          <TableCell className="py-0 pl-6 pr-0 relative">
                            <div className="absolute inset-0 left-6 right-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-lg"></div>
                            <div className="relative flex items-center gap-3 py-5">
                              <span className="text-lg w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ lineHeight: 1 }}>{habit.icon}</span>
                              <span className="font-medium text-sm truncate min-w-0 text-[#0F172A] leading-tight">{habit.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-0 px-4 relative">
                            <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            <div className="relative flex flex-col items-center justify-center py-5">
                              <span className="font-semibold text-sm text-[#0F172A] leading-tight">{habit.currentStreak}</span>
                              <span className="text-xs text-[#94A3B8] leading-tight mt-0.5">days</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-0 px-4 relative">
                            <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            <div className="relative flex flex-col items-center justify-center py-5">
                              <span className="font-semibold text-sm text-[#0F172A] leading-tight">{habit.longestStreak}</span>
                              <span className="text-xs text-[#94A3B8] leading-tight mt-0.5">days</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-0 pl-4 pr-6 relative">
                            <div className="absolute inset-0 right-6 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-lg"></div>
                            <div className="relative flex items-center py-5">
                              <HabitStatusControls
                                habit={habit}
                                onIncrement={() => onIncrementStep(habit.id)}
                                onMarkComplete={() => onMarkHabitToday(habit.id)}
                                onUndo={() => onUndoToday(habit.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {habits.length > 5 && (
                <div className="flex justify-center pt-2">
                  <p className="text-xs text-muted-foreground">
                    Showing {Math.min(5, habits.length)} of {habits.length} habits
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}