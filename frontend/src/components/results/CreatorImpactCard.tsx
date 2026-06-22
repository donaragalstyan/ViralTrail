import { Card, CardContent } from "@/components/ui/card";
import { ScoreBar, ScoreRing } from "@/components/shared/ScoreDisplay";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { CreatorImpactMetrics } from "@/types/trip";

interface CreatorImpactCardProps {
  metrics: CreatorImpactMetrics;
}

export function CreatorImpactCard({ metrics }: CreatorImpactCardProps) {
  const scoreItems = [
    { label: "Visual Appeal", value: metrics.visualAppeal },
    { label: "Trend Potential", value: metrics.trendPotential },
    { label: "Content Variety", value: metrics.contentVariety },
    { label: "Budget Efficiency", value: metrics.budgetEfficiency },
  ];

  return (
    <section>
      <SectionHeader
        title="Creator Impact Score"
        description="How well this destination performs across key creator metrics."
      />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex flex-col items-center">
              <ScoreRing score={metrics.overallScore} label="Overall Score" />
            </div>
            <div className="w-full flex-1 space-y-5">
              {scoreItems.map((item) => (
                <ScoreBar key={item.label} label={item.label} score={item.value} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
