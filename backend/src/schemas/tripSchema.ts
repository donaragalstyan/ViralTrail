export const tripResultJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "destination",
    "budgetBreakdown",
    "creatorImpact",
    "itinerary",
    "contentIdeas",
    "postingStrategy",
  ],
  properties: {
    destination: {
      type: "object",
      additionalProperties: false,
      required: ["name", "creatorImpactScore", "description"],
      properties: {
        name: { type: "string" },
        creatorImpactScore: { type: "number" },
        description: { type: "string" },
      },
    },
    budgetBreakdown: {
      type: "object",
      additionalProperties: false,
      required: ["transportation", "lodging", "food", "activities"],
      properties: {
        transportation: { type: "number" },
        lodging: { type: "number" },
        food: { type: "number" },
        activities: { type: "number" },
      },
    },
    creatorImpact: {
      type: "object",
      additionalProperties: false,
      required: [
        "visualAppeal",
        "trendPotential",
        "contentVariety",
        "budgetEfficiency",
        "overallScore",
      ],
      properties: {
        visualAppeal: { type: "number" },
        trendPotential: { type: "number" },
        contentVariety: { type: "number" },
        budgetEfficiency: { type: "number" },
        overallScore: { type: "number" },
      },
    },
    itinerary: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["day", "title", "locations", "activities", "estimatedCost"],
        properties: {
          day: { type: "number" },
          title: { type: "string" },
          locations: { type: "array", items: { type: "string" } },
          activities: { type: "array", items: { type: "string" } },
          estimatedCost: { type: "number" },
        },
      },
    },
    contentIdeas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "location",
          "contentConcept",
          "hook",
          "caption",
          "shotList",
        ],
        properties: {
          location: { type: "string" },
          contentConcept: { type: "string" },
          hook: { type: "string" },
          caption: { type: "string" },
          shotList: { type: "array", items: { type: "string" } },
        },
      },
    },
    postingStrategy: {
      type: "object",
      additionalProperties: false,
      required: ["postingCalendar", "bestPerformingRecommendation"],
      properties: {
        postingCalendar: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["day", "platform", "contentType", "bestTime"],
            properties: {
              day: { type: "string" },
              platform: { type: "string" },
              contentType: { type: "string" },
              bestTime: { type: "string" },
            },
          },
        },
        bestPerformingRecommendation: {
          type: "object",
          additionalProperties: false,
          required: ["title", "description", "format", "expectedEngagement"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            format: { type: "string" },
            expectedEngagement: { type: "string" },
          },
        },
      },
    },
  },
} as const;
