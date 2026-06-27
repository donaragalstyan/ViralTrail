import type { NextFunction, Request, Response } from "express";
import type { TripFormData } from "../types/trip.js";

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

export function isTripFormData(body: unknown): body is TripFormData {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return requiredFields.every(
    (field) => typeof data[field] === "string" && data[field].trim().length > 0
  );
}

export function validateTripForm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!isTripFormData(req.body)) {
    res.status(400).json({ error: "Missing or invalid trip form fields" });
    return;
  }
  next();
}
