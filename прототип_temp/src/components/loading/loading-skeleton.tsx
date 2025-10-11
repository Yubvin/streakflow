import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export function HabitCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="text-center">
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-60" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Header */}
          <div className="flex items-center p-4 border-b bg-muted/30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1">
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          
          {/* Rows */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center p-4 border-b">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex-1 text-center">
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
              <div className="flex-1 text-center">
                <Skeleton className="h-8 w-20 mx-auto" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex-1 text-center">
                <Skeleton className="h-8 w-8 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}