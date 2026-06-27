import { tripResultJsonSchema } from "../schemas/tripSchema.js";
import type { TripFormData, TripResult } from "../types/trip.js";
import { getOpenAI, getOpenAIModel } from "./openai.js";

const SYSTEM_PROMPT = `You are ViralTrail, an AI travel planner for content creators.
Generate a realistic, creative trip plan optimized for social media content.
Recommend a specific destination (city/region) that fits the creator's niche, platform, vibe, and budget.
All scores must be integers from 0 to 100.
Budget amounts must be positive integers in USD.
Tailor hooks, captions, and shot lists to the chosen platform and niche.
You must respect passport and visa constraints — never recommend a destination the traveler cannot realistically enter.`;

function buildVisaConstraints(form: TripFormData): string {
  if (form.openToVisaRequired === "yes") {
    return `- Passport: ${form.passportCountry}
- Visa preference: Open to destinations that require advance visa applications
- Still avoid destinations where this passport is routinely denied entry or visas (e.g. do not suggest the US to travelers who cannot obtain a US visa)`;
  }

  return `- Passport: ${form.passportCountry}
- Visa preference: Visa-free and visa-on-arrival/e-visa only — NO destinations requiring an embassy/consulate visa application
- CRITICAL: Only recommend countries this passport can enter without a pre-approved embassy visa. Exclude the United States, Canada, UK, Schengen countries, and any other visa-required destination for this nationality.`;
}

function buildExcludeDestinationsLine(excludeDestinations: string[]): string {
  if (excludeDestinations.length === 0) return "";

  const list = excludeDestinations.map((d) => `"${d}"`).join(", ");
  return `- IMPORTANT: The user already rejected these destinations for this trip: ${list}.
- Do NOT recommend any of them again, nor very similar cities/regions (same country/area counts as too similar when a nearby option was rejected).
- Pick a distinctly different destination that still fits all constraints below.\n`;
}

function buildUserPrompt(
  form: TripFormData,
  excludeDestinations: string[] = []
): string {
  const excludeLine = buildExcludeDestinationsLine(excludeDestinations);

  return `Create a creator-optimized trip plan with this input:
- Starting city: ${form.startingCity}
- Total budget: ${form.budget}
- Trip length: ${form.numberOfDays} days
- Creator niche: ${form.creatorNiche}
- Primary platform: ${form.platform}
- Travel vibe: ${form.travelVibe}

Travel documents & visa constraints:
${buildVisaConstraints(form)}

Requirements:
${excludeLine}- The destination MUST satisfy the visa constraints above — this is non-negotiable.
- The itinerary must have exactly ${form.numberOfDays} days (day 1 through day ${form.numberOfDays}).
- Include 3-5 content ideas tied to real locations in the itinerary.
- Include 4-6 posting calendar entries spanning pre-trip through post-trip.
- Keep the total budget breakdown realistic for the stated budget.`;
}

export async function generateTrip(
  form: TripFormData,
  options?: { excludeDestinations?: string[] }
): Promise<TripResult> {
  const excludeDestinations = (options?.excludeDestinations ?? [])
    .map((destination) => destination.trim())
    .filter(Boolean);

  const response = await getOpenAI().responses.create({
    model: getOpenAIModel(),
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: buildUserPrompt(form, excludeDestinations),
      },
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
