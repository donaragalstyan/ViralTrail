import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { BudgetBreakdownCard } from "@/components/results/BudgetBreakdownCard";
import { ContentIdeas } from "@/components/results/ContentIdeas";
import { CreatorImpactCard } from "@/components/results/CreatorImpactCard";
import { DayItinerary } from "@/components/results/DayItinerary";
import { DestinationCard } from "@/components/results/DestinationCard";
import { PostingStrategyCard } from "@/components/results/PostingStrategyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTripResult } from "@/data/mockData";

interface ResultsPageProps {
  searchParams: Promise<{
    startingCity?: string;
    budget?: string;
    numberOfDays?: string;
    creatorNiche?: string;
    platform?: string;
    travelVibe?: string;
  }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const trip = mockTripResult;

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
              <Link href="/generate">
                <ArrowLeft className="h-4 w-4" />
                New Trip
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold md:text-3xl">Your Trip Plan</h1>
            </div>
            {params.startingCity && (
              <p className="mt-2 text-muted-foreground">
                From <strong>{params.startingCity}</strong>
                {params.budget && (
                  <>
                    {" "}
                    · Budget <strong>{params.budget}</strong>
                  </>
                )}
                {params.numberOfDays && (
                  <>
                    {" "}
                    · <strong>{params.numberOfDays}</strong> days
                  </>
                )}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {params.creatorNiche && (
              <Badge variant="secondary">{params.creatorNiche}</Badge>
            )}
            {params.platform && (
              <Badge variant="outline">{params.platform}</Badge>
            )}
            {params.travelVibe && (
              <Badge variant="gradient">{params.travelVibe}</Badge>
            )}
          </div>
        </div>

        <div className="space-y-12">
          <DestinationCard destination={trip.destination} />
          <BudgetBreakdownCard budget={trip.budgetBreakdown} />
          <CreatorImpactCard metrics={trip.creatorImpact} />
          <DayItinerary itinerary={trip.itinerary} />
          <ContentIdeas contentIdeas={trip.contentIdeas} />
          <PostingStrategyCard strategy={trip.postingStrategy} />
        </div>

        <div className="mt-12 text-center">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/generate">
              <Sparkles className="h-5 w-5" />
              Generate Another Trip
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
