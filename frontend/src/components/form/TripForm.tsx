"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Sparkles, Wand2, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formOptions } from "@/data/mockData";
import { getApiUrl } from "@/lib/api";
import { TRIP_RESULT_STORAGE_KEY } from "@/lib/constants";
import { resetRejectedDestinations } from "@/lib/rejectedDestinations";
import type { TripFormData, TripResult } from "@/types/trip";

const defaultForm: TripFormData = {
  startingCity: "",
  budget: "",
  numberOfDays: "",
  creatorNiche: "",
  platform: "",
  travelVibe: "",
  passportCountry: "",
  openToVisaRequired: "",
};

export function TripForm() {
  const router = useRouter();
  const [form, setForm] = useState<TripFormData>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof TripFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${getApiUrl()}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to generate trip");
      }

      sessionStorage.setItem(
        TRIP_RESULT_STORAGE_KEY,
        JSON.stringify(data as TripResult)
      );
      resetRejectedDestinations(form);

      const params = new URLSearchParams(
        Object.entries(form) as [string, string][]
      );
      router.push(`/results?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  const isValid =
    form.startingCity &&
    form.budget &&
    form.numberOfDays &&
    form.creatorNiche &&
    form.platform &&
    form.travelVibe &&
    form.passportCountry &&
    form.openToVisaRequired;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="border-white/50 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <CardTitle>Trip Details</CardTitle>
          </div>
          <CardDescription>
            Tell us about your trip and creator profile. We&apos;ll generate a
            personalized plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="startingCity">Starting City</Label>
            <Input
              id="startingCity"
              placeholder="e.g. New York, NY"
              value={form.startingCity}
              onChange={(e) => updateField("startingCity", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Select
              value={form.budget}
              onValueChange={(value) => updateField("budget", value)}
              required
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.budgets.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfDays">Number of Days</Label>
            <Select
              value={form.numberOfDays}
              onValueChange={(value) => updateField("numberOfDays", value)}
              required
            >
              <SelectTrigger id="numberOfDays">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/50 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Creator Profile</CardTitle>
          </div>
          <CardDescription>
            Help us tailor content ideas and destinations to your audience.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="creatorNiche">Creator Niche</Label>
            <Select
              value={form.creatorNiche}
              onValueChange={(value) => updateField("creatorNiche", value)}
              required
            >
              <SelectTrigger id="creatorNiche">
                <SelectValue placeholder="Select niche" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.creatorNiches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={form.platform}
              onValueChange={(value) => updateField("platform", value)}
              required
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="travelVibe">Travel Vibe</Label>
            <Select
              value={form.travelVibe}
              onValueChange={(value) => updateField("travelVibe", value)}
              required
            >
              <SelectTrigger id="travelVibe">
                <SelectValue placeholder="Select vibe" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.travelVibes.map((vibe) => (
                  <SelectItem key={vibe} value={vibe}>
                    {vibe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/50 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Passport & Visa</CardTitle>
          </div>
          <CardDescription>
            We&apos;ll only suggest destinations you can actually visit based on
            your passport and visa preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="passportCountry">Passport Country</Label>
            <Select
              value={form.passportCountry}
              onValueChange={(value) => updateField("passportCountry", value)}
              required
            >
              <SelectTrigger id="passportCountry">
                <SelectValue placeholder="Select your passport country" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.passportCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="openToVisaRequired">
              Open to visa-required destinations?
            </Label>
            <Select
              value={form.openToVisaRequired}
              onValueChange={(value) =>
                updateField("openToVisaRequired", value)
              }
              required
            >
              <SelectTrigger id="openToVisaRequired">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.visaPreferences.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {form.openToVisaRequired === "no" && (
            <p className="text-sm text-muted-foreground sm:col-span-2">
              We&apos;ll only recommend destinations where your passport allows
              visa-free entry or easy visa-on-arrival — no embassy applications
              needed.
            </p>
          )}
        </CardContent>
      </Card>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating your trip...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate My Trip
          </>
        )}
      </Button>
    </form>
  );
}
