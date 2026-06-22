import type { TripResult } from "@/types/trip";

export const mockTripResult: TripResult = {
  destination: {
    name: "Lisbon, Portugal",
    creatorImpactScore: 94,
    description:
      "A sun-drenched coastal capital with pastel architecture, rooftop viewpoints, and a thriving creator scene. Lisbon delivers cinematic street scenes, affordable luxury, and trending audio-friendly backdrops perfect for lifestyle and travel content.",
  },
  budgetBreakdown: {
    transportation: 420,
    lodging: 680,
    food: 340,
    activities: 260,
  },
  creatorImpact: {
    visualAppeal: 96,
    trendPotential: 91,
    contentVariety: 93,
    budgetEfficiency: 88,
    overallScore: 94,
  },
  itinerary: [
    {
      day: 1,
      title: "Arrival & Alfama Golden Hour",
      locations: ["Alfama District", "Miradouro da Senhora do Monte", "Time Out Market"],
      activities: [
        "Check into boutique hostel in Chiado",
        "Wander Alfama's narrow streets for B-roll",
        "Sunset timelapse from miradouro",
        "Street food tasting at Time Out Market",
      ],
      estimatedCost: 145,
    },
    {
      day: 2,
      title: "Tiles, Trams & Trending Spots",
      locations: ["LX Factory", "Belém Tower", "Pastéis de Belém"],
      activities: [
        "Morning content shoot at LX Factory murals",
        "Iconic tram #28 ride for transition clips",
        "Belém waterfront golden hour reels",
        "Pastel de nata taste test for short-form",
      ],
      estimatedCost: 112,
    },
    {
      day: 3,
      title: "Coastal Day Trip",
      locations: ["Cascais", "Boca do Inferno", "Praia da Rainha"],
      activities: [
        "Train to Cascais for coastal drone shots",
        "Dramatic cliff content at Boca do Inferno",
        "Beach lifestyle shoot at Praia da Rainha",
        "Seafood dinner with ocean backdrop",
      ],
      estimatedCost: 138,
    },
    {
      day: 4,
      title: "Creator Collab & Nightlife",
      locations: ["Pink Street", "Bairro Alto", "Rooftop Bar no Chiado"],
      activities: [
        "Coffee shop work session + flat lay content",
        "Collab shoot with local creator (mock)",
        "Neon night content on Pink Street",
        "Rooftop cocktail B-roll for lifestyle reel",
      ],
      estimatedCost: 165,
    },
    {
      day: 5,
      title: "Farewell & Best-of Montage",
      locations: ["Praça do Comércio", "Santa Justa Lift", "Airport"],
      activities: [
        "Sunrise shoot at Praça do Comércio",
        "Elevator cityscape for final hero clip",
        "Edit trip recap on flight home",
        "Schedule posting calendar for next 2 weeks",
      ],
      estimatedCost: 98,
    },
  ],
  contentIdeas: [
    {
      location: "Alfama District",
      contentConcept: "Lost in Lisbon — cinematic walking tour",
      hook: "POV: you found Europe's most photogenic neighborhood",
      caption:
        "Alfama hits different at golden hour 🌅 Every corner is a frame. Save this for your Lisbon trip inspo! #Lisbon #TravelCreator #Alfama",
      shotList: [
        "Low-angle walking shot through narrow alley",
        "Slow pan of laundry-lined balconies",
        "Fado musician silhouette (ambient audio)",
        "Golden hour wide shot from miradouro",
      ],
    },
    {
      location: "LX Factory",
      contentConcept: "Street art scavenger hunt reel",
      hook: "I found 5 murals in 60 seconds — can you spot them all?",
      caption:
        "LX Factory is a creator playground 🎨 Industrial vibes meet insane street art. Which mural is your fave? #StreetArt #LXFactory #ContentIdeas",
      shotList: [
        "Fast-cut mural reveals with beat sync",
        "Outfit transition in front of graffiti wall",
        "Overhead walk-through of the complex",
        "Close-up detail shots of art textures",
      ],
    },
    {
      location: "Cascais Coastline",
      contentConcept: "Budget luxury beach day",
      hook: "This looks like the Amalfi Coast but costs $30/day",
      caption:
        "Day trip from Lisbon that feels like a dream ✨ Cascais is underrated and your audience needs to know. #Cascais #BudgetTravel #BeachVibes",
      shotList: [
        "Drone pullback from cliff to ocean",
        "Slo-mo hair flip on the beach",
        "Train window transition Lisbon → Cascais",
        "Seafood plate aesthetic close-up",
      ],
    },
    {
      location: "Pink Street",
      contentConcept: "Neon nights creator diary",
      hook: "The street that broke my camera's color settings (in a good way)",
      caption:
        "Pink Street after dark = content gold 💜 Pro tip: shoot vertical, use the neon reflections on wet pavement. #PinkStreet #NightPhotography #LisbonNights",
      shotList: [
        "Neon sign bokeh with subject in foreground",
        "Walking away shot down the pink pavement",
        "Cocktail pour slow-motion at bar",
        "Time-lapse of crowd energy",
      ],
    },
  ],
  postingStrategy: {
    postingCalendar: [
      {
        day: "Day 1 (Pre-trip)",
        platform: "Instagram",
        contentType: "Teaser reel — packing + destination reveal",
        bestTime: "6:00 PM",
      },
      {
        day: "Day 3",
        platform: "TikTok",
        contentType: "Alfama golden hour walking POV",
        bestTime: "7:30 PM",
      },
      {
        day: "Day 5",
        platform: "Instagram",
        contentType: "LX Factory mural carousel",
        bestTime: "12:00 PM",
      },
      {
        day: "Day 7",
        platform: "TikTok",
        contentType: "Budget luxury Cascais day trip",
        bestTime: "5:00 PM",
      },
      {
        day: "Day 10",
        platform: "YouTube Shorts",
        contentType: "Pink Street neon night montage",
        bestTime: "8:00 PM",
      },
      {
        day: "Day 14",
        platform: "Instagram",
        contentType: "Full trip recap reel with trending audio",
        bestTime: "6:30 PM",
      },
    ],
    bestPerformingRecommendation: {
      title: "Budget Luxury Cascais Day Trip",
      description:
        "This format combines aspirational visuals with a budget hook — the highest-performing combo for travel creators in 2025. Lead with the price comparison, deliver stunning coastal shots, and end with a CTA to save the itinerary.",
      format: "60-second vertical reel with text overlays",
      expectedEngagement: "3.2x above your average travel content",
    },
  },
};

export const formOptions = {
  creatorNiches: [
    "Lifestyle",
    "Travel",
    "Food & Dining",
    "Fashion",
    "Adventure",
    "Tech & Gadgets",
    "Fitness",
    "Beauty",
  ],
  platforms: ["Instagram", "TikTok", "YouTube", "YouTube Shorts", "Pinterest"],
  travelVibes: [
    "Adventure",
    "Luxury",
    "Budget Backpacker",
    "Cultural Explorer",
    "Foodie",
    "Beach & Chill",
    "Urban Creator",
  ],
  budgets: ["$500", "$1,000", "$2,000", "$3,000", "$5,000+"],
  days: ["3", "5", "7", "10", "14"],
};
