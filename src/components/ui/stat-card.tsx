import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-3 sm:p-5 shadow-card animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-1">{title}</span>
        <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-foreground" />
        </div>
      </div>
      <div className="text-lg sm:text-2xl font-bold tracking-tight">{value}</div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
          )}
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
