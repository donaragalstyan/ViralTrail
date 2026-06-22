import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  className?: string;
}

export function ScoreBar({ label, score, className }: ScoreBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-semibold text-primary">{score}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

interface ScoreRingProps {
  score: number;
  size?: "sm" | "lg";
  label?: string;
  variant?: "default" | "light";
}

export function ScoreRing({ score, size = "lg", label, variant = "default" }: ScoreRingProps) {
  const dimensions = size === "lg" ? 120 : 80;
  const strokeWidth = size === "lg" ? 8 : 6;
  const radius = (dimensions - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dimensions, height: dimensions }}>
        <svg width={dimensions} height={dimensions} className="-rotate-90">
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            fill="none"
            stroke={variant === "light" ? "rgba(255,255,255,0.3)" : "hsl(var(--muted))"}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(262 83% 58%)" />
              <stop offset="50%" stopColor="hsl(330 81% 60%)" />
              <stop offset="100%" stopColor="hsl(24 95% 58%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-bold",
              variant === "light" ? "text-white" : "text-foreground",
              size === "lg" ? "text-3xl" : "text-xl"
            )}
          >
            {score}
          </span>
          {size === "lg" && (
            <span className={cn("text-xs", variant === "light" ? "text-white/70" : "text-muted-foreground")}>/ 100</span>
          )}
        </div>
      </div>
      {label && (
        <span className={cn("text-sm font-medium", variant === "light" ? "text-white/80" : "text-muted-foreground")}>{label}</span>
      )}
    </div>
  );
}
