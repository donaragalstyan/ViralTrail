import { tripResultJsonSchema } from "../schemas/tripSchema.js";
import type { TripFormData, TripResult } from "../types/trip.js";
import { getOpenAI, getOpenAIModel } from "./openai.js";

const SYSTEM_PROMPT = `You are ViralTrail, an AI travel planner for content creators.
Generate a realistic, creative trip plan optimized for social media content.
Recommend a specific destination (city/region) that fits the creator's niche, platform, vibe, and budget.
All scores must be integers from 0 to 100.
Budget amounts must be positive integers in USD.
Tailor hooks, captions, and shot lists to the chosen platform and niche.`;

function buildUserPrompt(form: TripFormData): string {
  return `Create a creator-optimized trip plan with this input:
- Starting city: ${form.startingCity}
- Total budget: ${form.budget}
- Trip length: ${form.numberOfDays} days
- Creator niche: ${form.creatorNiche}
- Primary platform: ${form.platform}
- Travel vibe: ${form.travelVibe}

Requirements:
- The itinerary must have exactly ${form.numberOfDays} days (day 1 through day ${form.numberOfDays}).
- Include 3-5 content ideas tied to real locations in the itinerary.
- Include 4-6 posting calendar entries spanning pre-trip through post-trip.
- Keep the total budget breakdown realistic for the stated budget.`;
}

export async function generateTrip(form: TripFormData): Promise<TripResult> {
  const response = await getOpenAI().responses.create({
    model: getOpenAIModel(),
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(form) },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "trip_result",
        strict: true,
        schema: tripResultJsonSchema,
      },
    },
  });

  const output = response.output_text;
  if (!output) {
    throw new Error("OpenAI returned an empty response");
  }

  return JSON.parse(output) as TripResult;
}
