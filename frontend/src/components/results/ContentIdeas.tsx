import { Camera, Hash, Lightbulb, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { ContentIdea } from "@/types/trip";

interface ContentIdeasProps {
  contentIdeas: ContentIdea[];
}

export function ContentIdeas({ contentIdeas }: ContentIdeasProps) {
  return (
    <section>
      <SectionHeader
        title="Content Ideas"
        description="Ready-to-shoot concepts with hooks, captions, and shot lists for each location."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {contentIdeas.map((idea) => (
          <Card key={idea.location} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <Badge variant="gradient" className="mb-2 w-fit">
                <Camera className="mr-1 h-3 w-3" />
                {idea.location}
              </Badge>
              <CardTitle className="text-lg">{idea.contentConcept}</CardTitle>
              <CardDescription className="flex items-start gap-2 pt-2">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span className="font-medium text-foreground">
                  &ldquo;{idea.hook}&rdquo;
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  Caption
                </h4>
                <p className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                  {idea.caption}
                </p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  Shot List
                </h4>
                <ul className="space-y-1.5">
                  {idea.shotList.map((shot, index) => (
                    <li
                      key={shot}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      {shot}
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
