import { Sparkles } from "lucide-react";

import { TripForm } from "@/components/form/TripForm";

export default function GeneratePage() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
            <Sparkles className="h-4 w-4" />
            Trip Generator
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Plan Your Next <span className="text-gradient">Viral Trip</span>
          </h1>
          <p className="text-muted-foreground">
            Fill in your details and we&apos;ll generate a creator-optimized
            itinerary with content ideas and posting strategy.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <TripForm />
        </div>
      </div>
    </div>
  );
}
