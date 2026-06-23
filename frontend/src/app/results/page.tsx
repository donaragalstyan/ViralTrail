import { TripResults } from "@/components/results/TripResults";
import type { TripFormData } from "@/types/trip";

interface ResultsPageProps {
  searchParams: Promise<Partial<TripFormData>>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const formParams = await searchParams;

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <TripResults formParams={formParams} />
      </div>
    </div>
  );
}
