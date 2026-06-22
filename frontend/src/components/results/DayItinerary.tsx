import { Calendar, DollarSign, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { ItineraryDay } from "@/types/trip";

interface DayItineraryProps {
  itinerary: ItineraryDay[];
}

export function DayItinerary({ itinerary }: DayItineraryProps) {
  return (
    <section>
      <SectionHeader
        title="Day-by-Day Itinerary"
        description="Your creator-optimized schedule with locations, activities, and costs."
      />
      <div className="space-y-4">
        {itinerary.map((day) => (
          <Card key={day.day} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-fuchsia-50 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white">
                    {day.day}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{day.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Day {day.day}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="gradient" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  ${day.estimatedCost} est.
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Locations
                </h4>
                <ul className="space-y-2">
                  {day.locations.map((location) => (
                    <li
                      key={location}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Activities
                </h4>
                <ul className="space-y-2">
                  {day.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
