import {
  Bus,
  Camera,
  DollarSign,
  Utensils,
  BedDouble,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { BudgetBreakdown } from "@/types/trip";

interface BudgetBreakdownCardProps {
  budget: BudgetBreakdown;
}

const categories = [
  { key: "transportation" as const, label: "Transportation", icon: Bus, color: "text-violet-600" },
  { key: "lodging" as const, label: "Lodging", icon: BedDouble, color: "text-fuchsia-600" },
  { key: "food" as const, label: "Food", icon: Utensils, color: "text-orange-500" },
  { key: "activities" as const, label: "Activities", icon: Camera, color: "text-emerald-600" },
];

export function BudgetBreakdownCard({ budget }: BudgetBreakdownCardProps) {
  const total = Object.values(budget).reduce((sum, val) => sum + val, 0);

  return (
    <section>
      <SectionHeader
        title="Budget Breakdown"
        description="Estimated costs optimized for maximum creator impact per dollar."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.key} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {category.label}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${budget[category.key]}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((budget[category.key] / total) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4 border-dashed">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-medium">Total Estimated Budget</span>
          </div>
          <span className="text-2xl font-bold text-gradient">${total}</span>
        </CardContent>
      </Card>
    </section>
  );
}
