import Link from "next/link";
import {
  ArrowRight,
  Camera,
  MapPin,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MapPin,
    title: "Creator-Optimized Destinations",
    description:
      "AI picks locations with maximum visual impact and trending potential for your niche.",
  },
  {
    icon: Camera,
    title: "Shot Lists & Content Ideas",
    description:
      "Get hooks, captions, and shot lists tailored to each location on your itinerary.",
  },
  {
    icon: TrendingUp,
    title: "Posting Strategy",
    description:
      "A full content calendar with best times and formats to maximize engagement.",
  },
  {
    icon: Zap,
    title: "Budget-Aware Planning",
    description:
      "Every recommendation balances creator impact with your budget constraints.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
            <Sparkles className="h-4 w-4" />
            Built for content creators
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            <span className="text-gradient">ViralTrail</span>
          </h1>

          <p className="mb-4 text-xl font-medium text-foreground md:text-2xl">
            AI-powered travel planning for creators
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Plan trips that look incredible on camera and perform on every
            platform. Get destinations, itineraries, content ideas, and posting
            strategies — all optimized for your creator niche.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/generate">
                Generate My Trip
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">See how it works</Link>
            </Button>
          </div>
        </div>

        <div id="features" className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-white/50 bg-white/60 backdrop-blur-sm transition-shadow hover:shadow-lg"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
