import { MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScoreRing } from "@/components/shared/ScoreDisplay";
import type { TripResult } from "@/types/trip";

interface DestinationCardProps {
  destination: TripResult["destination"];
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-white shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 bg-white/20 text-white hover:bg-white/30"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Recommended Destination
            </Badge>
            <CardTitle className="text-3xl font-bold text-white md:text-4xl">
              {destination.name}
            </CardTitle>
            <CardDescription className="mt-2 text-base text-white/80">
              <MapPin className="mr-1 inline h-4 w-4" />
              Top pick for your creator profile
            </CardDescription>
          </div>
          <ScoreRing score={destination.creatorImpactScore} label="Impact Score" variant="light" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-white/90">
          {destination.description}
        </p>
      </CardContent>
    </Card>
  );
}
