# ViralTrail

AI-powered travel planning for content creators — a polished MVP built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Landing page** with modern hero and feature cards
- **Trip generation form** collecting city, budget, days, niche, platform, and vibe
- **Results page** with mock AI-generated trip data including:
  - Recommended destination with creator impact score
  - Budget breakdown
  - Creator impact metrics
  - Day-by-day itinerary
  - Content ideas with hooks, captions, and shot lists
  - Posting strategy and calendar

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── generate/     # Trip form
│   │   └── results/      # Mock trip results
│   ├── components/
│   │   ├── ui/           # shadcn/ui primitives
│   │   ├── layout/       # Header, Footer
│   │   ├── landing/      # Hero section
│   │   ├── form/         # Trip form
│   │   ├── results/      # Results section components
│   │   └── shared/       # Reusable utilities
│   ├── data/
│   │   └── mockData.ts   # Hardcoded trip data
│   └── types/
│       └── trip.ts       # TypeScript interfaces
├── package.json
└── ...
```

## Note

This MVP uses **hardcoded mock data** only. No external APIs, AI models, databases, or authentication are connected yet.
