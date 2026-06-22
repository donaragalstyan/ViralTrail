import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Viral<span className="text-gradient">Trail</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/generate"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Plan a Trip
          </Link>
          <Button variant="gradient" size="sm" asChild>
            <Link href="/generate">Generate My Trip</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
