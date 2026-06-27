export interface TripFormData {
  startingCity: string;
  budget: string;
  numberOfDays: string;
  creatorNiche: string;
  platform: string;
  travelVibe: string;
  passportCountry: string;
  openToVisaRequired: string;
}

export interface BudgetBreakdown {
  transportation: number;
  lodging: number;
  food: number;
  activities: number;
}

export interface CreatorImpactMetrics {
  visualAppeal: number;
  trendPotential: number;
  contentVariety: number;
  budgetEfficiency: number;
  overallScore: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  locations: string[];
  activities: string[];
  estimatedCost: number;
}

export interface ContentIdea {
  location: string;
  contentConcept: string;
  hook: string;
  caption: string;
  shotList: string[];
}

export interface PostingStrategy {
  postingCalendar: {
    day: string;
    platform: string;
    contentType: string;
    bestTime: string;
  }[];
  bestPerformingRecommendation: {
    title: string;
    description: string;
    format: string;
    expectedEngagement: string;
  };
}

export interface TripResult {
  destination: {
    name: string;
    creatorImpactScore: number;
    description: string;
  };
  budgetBreakdown: BudgetBreakdown;
  creatorImpact: CreatorImpactMetrics;
  itinerary: ItineraryDay[];
  contentIdeas: ContentIdea[];
  postingStrategy: PostingStrategy;
}
