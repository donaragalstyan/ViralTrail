import type { TripFormData } from "@/types/trip";

const requiredFields: (keyof TripFormData)[] = [
  "startingCity",
  "budget",
  "numberOfDays",
  "creatorNiche",
  "platform",
  "travelVibe",
  "passportCountry",
  "openToVisaRequired",
];

export function formParamsToTripFormData(
  params: Partial<TripFormData>
): TripFormData | null {
  for (const field of requiredFields) {
    const value = params[field];
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }
  }

  return params as TripFormData;
}
