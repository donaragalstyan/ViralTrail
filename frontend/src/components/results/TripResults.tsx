"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

import { BudgetBreakdownCard } from "@/components/results/BudgetBreakdownCard";
import { ContentIdeas } from "@/components/results/ContentIdeas";
import { CreatorImpactCard } from "@/components/results/CreatorImpactCard";
import { DayItinerary } from "@/components/results/DayItinerary";
import { DestinationCard } from "@/components/results/DestinationCard";
import { PostingStrategyCard } from "@/components/results/PostingStrategyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTripResult } from "@/data/mockData";
import { TRIP_RESULT_STORAGE_KEY } from "@/lib/constants";
import type { TripFormData, TripResult } from "@/types/trip";

interface TripResultsProps {
  formParams: Partial<TripFormData>;
}

export function TripResults({ formParams }: TripResultsProps) {
  const [trip, setTrip] = useState<TripResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(TRIP_RESULT_STORAGE_KEY);
    if (stored) {
      try {
        setTrip(JSON.parse(stored) as TripResult);
      } catch {
        setTrip(mockTripResult);
      }
    } else {
      setTrip(mockTripResult);
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !trip) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
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
          {formParams.startingCity && (
            <p className="mt-2 text-muted-foreground">
              From <strong>{formParams.startingCity}</strong>
              {formParams.budget && (
                <>
                  {" "}
                  · Budget <strong>{formParams.budget}</strong>
                </>
              )}
              {formParams.numberOfDays && (
                <>
                  {" "}
                  · <strong>{formParams.numberOfDays}</strong> days
                </>
              )}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {formParams.creatorNiche && (
            <Badge variant="secondary">{formParams.creatorNiche}</Badge>
          )}
          {formParams.platform && (
            <Badge variant="outline">{formParams.platform}</Badge>
          )}
          {formParams.travelVibe && (
            <Badge variant="gradient">{formParams.travelVibe}</Badge>
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
    </>
  );
}
