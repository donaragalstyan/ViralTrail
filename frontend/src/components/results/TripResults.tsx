"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2, RefreshCw, Sparkles } from "lucide-react";

import { BudgetBreakdownCard } from "@/components/results/BudgetBreakdownCard";
import { ContentIdeas } from "@/components/results/ContentIdeas";
import { CreatorImpactCard } from "@/components/results/CreatorImpactCard";
import { DayItinerary } from "@/components/results/DayItinerary";
import { DestinationCard } from "@/components/results/DestinationCard";
import { PostingStrategyCard } from "@/components/results/PostingStrategyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTripResult } from "@/data/mockData";
import { getApiUrl } from "@/lib/api";
import { TRIP_RESULT_STORAGE_KEY } from "@/lib/constants";
import {
  addRejectedDestination,
  getRejectedDestinations,
  isDestinationRejected,
} from "@/lib/rejectedDestinations";
import { formParamsToTripFormData } from "@/lib/tripForm";
import type { TripFormData, TripResult } from "@/types/trip";

const MAX_REGENERATE_ATTEMPTS = 3;

interface TripResultsProps {
  formParams: Partial<TripFormData>;
}

export function TripResults({ formParams }: TripResultsProps) {
  const [trip, setTrip] = useState<TripResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState<string | null>(null);
  const [rejectedDestinations, setRejectedDestinations] = useState<string[]>(
    []
  );

  const formData = useMemo(
    () => formParamsToTripFormData(formParams),
    [formParams]
  );

  useEffect(() => {
    if (!formData) return;
    setRejectedDestinations(getRejectedDestinations(formData));
  }, [formData]);

  const requestTrip = async (
    form: TripFormData,
    excludeDestinations: string[]
  ): Promise<TripResult> => {
    const response = await fetch(`${getApiUrl()}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        excludeDestinations,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Failed to regenerate trip");
    }

    return data as TripResult;
  };

  const handleRegenerate = async () => {
    if (!formData || !trip) return;

    setIsRegenerating(true);
    setRegenerateError(null);

    const updatedRejected = addRejectedDestination(
      formData,
      trip.destination.name
    );
    setRejectedDestinations(updatedRejected);

    try {
      let nextTrip: TripResult | null = null;

      for (let attempt = 0; attempt < MAX_REGENERATE_ATTEMPTS; attempt++) {
        const candidate = await requestTrip(formData, updatedRejected);

        if (!isDestinationRejected(candidate.destination.name, updatedRejected)) {
          nextTrip = candidate;
          break;
        }
      }

      if (!nextTrip) {
        throw new Error(
          "Couldn't find a new destination right now. Try again in a moment."
        );
      }

      sessionStorage.setItem(
        TRIP_RESULT_STORAGE_KEY,
        JSON.stringify(nextTrip)
      );
      setTrip(nextTrip);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setRegenerateError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsRegenerating(false);
    }
  };

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
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold md:text-3xl">Your Trip Plan</h1>
            </div>
            {formData && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isRegenerating}
              >
                {isRegenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {isRegenerating ? "Finding another destination..." : "Try another destination"}
              </Button>
            )}
          </div>
          {regenerateError && (
            <p className="mt-2 text-sm text-destructive">{regenerateError}</p>
          )}
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
          {formParams.passportCountry && (
            <Badge variant="outline">{formParams.passportCountry} passport</Badge>
          )}
        </div>
      </div>

      <div className="relative space-y-12">
        {isRegenerating && (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-xl bg-background/80 pt-24 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-lg border bg-card px-6 py-4 shadow-lg">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="font-medium">Finding a different destination for you...</p>
            </div>
          </div>
        )}
        <DestinationCard destination={trip.destination} />
        <BudgetBreakdownCard budget={trip.budgetBreakdown} />
        <CreatorImpactCard metrics={trip.creatorImpact} />
        <DayItinerary itinerary={trip.itinerary} />
        <ContentIdeas contentIdeas={trip.contentIdeas} />
        <PostingStrategyCard strategy={trip.postingStrategy} />
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        {formData && (
          <Button
            variant="gradient"
            size="lg"
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            {isRegenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}
            Try Another Destination
          </Button>
        )}
        <Button variant="outline" size="lg" asChild>
          <Link href="/generate">
            <Sparkles className="h-5 w-5" />
            Start Over
          </Link>
        </Button>
      </div>
    </>
  );
}
