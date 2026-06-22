import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">ViralTrail</span>
          <span className="text-sm text-muted-foreground">
            — AI-powered travel planning for creators
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          MVP demo with mock data · No APIs connected yet
        </p>
        <Link
          href="/generate"
          className="text-sm font-medium text-primary hover:underline"
        >
          Start planning →
        </Link>
      </div>
    </footer>
  );
}
