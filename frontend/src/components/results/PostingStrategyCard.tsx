import { Calendar, Clock, Star, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { PostingStrategy } from "@/types/trip";

interface PostingStrategyCardProps {
  strategy: PostingStrategy;
}

export function PostingStrategyCard({ strategy }: PostingStrategyCardProps) {
  const { postingCalendar, bestPerformingRecommendation } = strategy;

  return (
    <section>
      <SectionHeader
        title="Posting Strategy"
        description="When and what to post for maximum reach across your platforms."
      />

      <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-violet-50 to-fuchsia-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <CardTitle>Best Performing Content Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="text-xl font-bold text-gradient">
            {bestPerformingRecommendation.title}
          </h3>
          <p className="text-muted-foreground">
            {bestPerformingRecommendation.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              <TrendingUp className="mr-1 h-3 w-3" />
              {bestPerformingRecommendation.format}
            </Badge>
            <Badge variant="gradient">
              {bestPerformingRecommendation.expectedEngagement}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Posting Calendar
          </CardTitle>
          <CardDescription>
            Your 2-week content rollout schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {postingCalendar.map((entry) => (
              <div
                key={`${entry.day}-${entry.contentType}`}
                className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{entry.day}</span>
                    <Badge variant="outline">{entry.platform}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.contentType}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {entry.bestTime}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
