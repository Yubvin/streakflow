import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsProps {
  habits: any[];
}

// Sample data for charts
const streakTrendData = [
  { date: "Jan 1", streak: 5 },
  { date: "Jan 8", streak: 8 },
  { date: "Jan 15", streak: 12 },
  { date: "Jan 22", streak: 10 },
  { date: "Jan 29", streak: 15 },
  { date: "Feb 5", streak: 18 },
  { date: "Feb 12", streak: 22 },
];

const completionData = [
  { habit: "Water", completion: 85 },
  { habit: "Exercise", completion: 92 },
  { habit: "Reading", completion: 78 },
  { habit: "Meditation", completion: 95 },
];

const monthlyOverview = [
  { name: "Completed", value: 75, color: "#22C55E" },
  { name: "Missed", value: 25, color: "#EF4444" },
];

export function Analytics({ habits }: AnalyticsProps) {
  const [dateRange, setDateRange] = useState("30d");

  const EmptyState = () => (
    <Card className="p-12 text-center">
      <div className="space-y-4">
        <Calendar className="h-16 w-16 text-muted-foreground mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">No data yet</h3>
          <p className="text-muted-foreground">
            Start tracking habits to see your analytics and insights.
          </p>
        </div>
      </div>
    </Card>
  );

  if (habits.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your progress and discover patterns</p>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your progress and discover patterns</p>
        </div>
        
        {/* Date Range Selector */}
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Streak Trend */}
        <Card className="p-6">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 stroke-2 text-[#5B4DFF]" />
              <h3 className="text-lg font-semibold text-foreground">Streak Trend</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={streakTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid 
                    strokeDasharray="1 1" 
                    stroke="#E2E8F0" 
                    strokeOpacity={0.3}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="date" 
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
                    dataKey="streak" 
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

        {/* Completion Rate by Habit */}
        <Card className="p-6">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-5 w-5 stroke-2 text-[#22D3EE]" />
              <h3 className="text-lg font-semibold text-foreground">Completion Rate by Habit</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid 
                    strokeDasharray="1 1" 
                    stroke="#E2E8F0" 
                    strokeOpacity={0.3}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="habit" 
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
                    cursor={{ fill: 'rgba(91, 77, 255, 0.05)' }}
                  />
                  <Bar 
                    dataKey="completion" 
                    fill="#5B4DFF"
                    radius={[6, 6, 0, 0]}
                    strokeWidth={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Overview */}
        <Card className="p-6">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 stroke-2 text-[#16A34A]" />
              <h3 className="text-lg font-semibold text-foreground">Monthly Overview</h3>
            </div>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={monthlyOverview}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {monthlyOverview.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4">
              {monthlyOverview.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Habits */}
        <Card className="p-6 lg:col-span-2">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-5 w-5 stroke-2 text-[#EAB308]" />
              <h3 className="text-lg font-semibold text-foreground">Top Performing Habits</h3>
            </div>
            <div className="space-y-4">
              {habits
                .sort((a, b) => b.currentStreak - a.currentStreak)
                .slice(0, 4)
                .map((habit, index) => (
                  <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-lg w-5 h-5 flex items-center justify-center" style={{ lineHeight: 1 }}>{habit.icon}</span>
                      <div>
                        <div className="font-medium text-foreground">{habit.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {habit.currentStreak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{habit.progress}%</div>
                      <div className="text-sm text-muted-foreground">completion</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}