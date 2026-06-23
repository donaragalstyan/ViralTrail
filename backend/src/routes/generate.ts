import { Router } from "express";
import { validateTripForm } from "../middleware/validateTripForm.js";
import { generateTrip } from "../services/generateTrip.js";
import type { TripFormData } from "../types/trip.js";

export const generateRouter = Router();

generateRouter.post(
  "/generate",
  validateTripForm,
  async (req, res) => {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
      return;
    }

    try {
      const trip = await generateTrip(req.body as TripFormData);
      res.json(trip);
    } catch (error) {
      console.error("Trip generation failed:", error);
      const message =
        error instanceof Error ? error.message : "Failed to generate trip";
      res.status(500).json({ error: message });
    }
  }
);
