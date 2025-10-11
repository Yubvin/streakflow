import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./ui/card";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function KPICard({ title, value, icon: Icon, trend = "neutral", trendValue }: KPICardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {trendValue && (
            <div className="flex items-center gap-1 text-xs">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
              <span className={
                trend === "up" ? "text-green-600" : 
                trend === "down" ? "text-red-600" : 
                "text-muted-foreground"
              }>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}