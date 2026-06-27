import { TRIP_REJECTED_DESTINATIONS_KEY } from "@/lib/constants";
import type { TripFormData } from "@/types/trip";

interface RejectedDestinationsStore {
  formKey: string;
  destinations: string[];
}

export function getFormKey(form: TripFormData): string {
  return JSON.stringify(form);
}

function readStore(): RejectedDestinationsStore | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(TRIP_REJECTED_DESTINATIONS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as RejectedDestinationsStore;
  } catch {
    return null;
  }
}

function writeStore(store: RejectedDestinationsStore): void {
  sessionStorage.setItem(TRIP_REJECTED_DESTINATIONS_KEY, JSON.stringify(store));
}

export function getRejectedDestinations(form: TripFormData): string[] {
  const store = readStore();
  if (!store || store.formKey !== getFormKey(form)) {
    return [];
  }
  return store.destinations;
}

export function resetRejectedDestinations(form: TripFormData): void {
  writeStore({ formKey: getFormKey(form), destinations: [] });
}

export function addRejectedDestination(
  form: TripFormData,
  destination: string
): string[] {
  const trimmed = destination.trim();
  if (!trimmed) return getRejectedDestinations(form);

  const existing = getRejectedDestinations(form);
  if (isDestinationRejected(trimmed, existing)) {
    return existing;
  }

  const updated = [...existing, trimmed];
  writeStore({ formKey: getFormKey(form), destinations: updated });
  return updated;
}

function normalizeDestination(name: string): string {
  return name.toLowerCase().trim();
}

export function isDestinationRejected(
  destination: string,
  rejected: string[]
): boolean {
  const normalized = normalizeDestination(destination);
  return rejected.some((entry) => {
    const normalizedEntry = normalizeDestination(entry);
    return (
      normalized === normalizedEntry ||
      normalized.includes(normalizedEntry) ||
      normalizedEntry.includes(normalized)
    );
  });
}
