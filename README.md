# ViralTrail

AI-powered travel planning for content creators — a full-stack app with a Next.js frontend and an Express backend powered by OpenAI.

## Features

- **Landing page** with hero section and feature highlights
- **Trip generation form** collecting starting city, budget, duration, creator niche, platform, travel vibe, and passport/visa preferences
- **AI-generated trip plans** via OpenAI structured output, including:
  - Recommended destination with creator impact score
  - Budget breakdown
  - Creator impact metrics
  - Day-by-day itinerary
  - Content ideas with hooks, captions, and shot lists
  - Posting strategy and calendar
- **Passport & visa awareness** — destinations respect nationality and visa preferences
- **Destination regeneration** — reject a suggestion and get a different destination for the same trip

## Tech Stack

**Frontend**

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

**Backend**

- [Express](https://expressjs.com/)
- [OpenAI API](https://platform.openai.com/) (structured JSON responses)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 20+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set at minimum:

```env
OPENAI_API_KEY=your_key_here
```

Start the API server:

```bash
npm run dev
```

The backend runs at [http://localhost:4000](http://localhost:4000). Health check: `GET /health`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The frontend expects the backend at `http://localhost:4000` by default (`NEXT_PUBLIC_API_URL` in `frontend/.env.local`).

## Environment Variables

| Location | Variable | Description |
|----------|----------|-------------|
| `backend/.env` | `PORT` | API port (default `4000`) |
| `backend/.env` | `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:3000`) |
| `backend/.env` | `OPENAI_API_KEY` | **Required** — OpenAI API key |
| `backend/.env` | `OPENAI_MODEL` | Model name (default `gpt-4o`) |
| `backend/.env` | `AI_PROVIDER` | Provider selector (`openai` today; Azure/Anthropic placeholders) |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | Backend URL (default `http://localhost:4000`) |
| `frontend/.env.local` | `NEXT_PUBLIC_APP_URL` | Frontend URL (default `http://localhost:3000`) |

See `backend/.env.example` and `frontend/.env.example` for the full list.

## API

### `POST /api/generate`

Generates a creator-optimized trip from form data.

**Body** — all fields required:

```json
{
  "startingCity": "New York, NY",
  "budget": "$1,000 - $2,000",
  "numberOfDays": "5",
  "creatorNiche": "Travel & Lifestyle",
  "platform": "Instagram",
  "travelVibe": "Adventure",
  "passportCountry": "United States",
  "openToVisaRequired": "no"
}
```

Optional: `excludeDestinations` (array of destination names to avoid when regenerating).

**Response** — structured trip result (destination, budget, itinerary, content ideas, posting strategy).

## Project Structure

```
ViralTrail/
├── backend/
│   └── src/
│       ├── index.ts              # Express app entry
│       ├── routes/
│       │   └── generate.ts       # POST /api/generate
│       ├── services/
│       │   ├── generateTrip.ts   # OpenAI trip generation
│       │   └── openai.ts         # OpenAI client
│       ├── middleware/
│       │   └── validateTripForm.ts
│       ├── schemas/
│       │   └── tripSchema.ts     # JSON schema for structured output
│       └── types/
│           └── trip.ts
├── frontend/
│   └── src/
│       ├── app/                  # Next.js App Router pages
│       │   ├── page.tsx          # Landing page
│       │   ├── generate/         # Trip form
│       │   └── results/          # Trip results
│       ├── components/
│       │   ├── ui/               # shadcn/ui primitives
│       │   ├── layout/           # Header, Footer
│       │   ├── landing/          # Hero section
│       │   ├── form/             # Trip form
│       │   ├── results/          # Results section components
│       │   └── shared/           # Reusable utilities
│       ├── data/
│       │   └── mockData.ts       # Form options & fallback mock trip
│       ├── lib/                  # API helpers, constants
│       └── types/
│           └── trip.ts
└── README.md
```

## Scripts

| Directory | Command | Description |
|-----------|---------|-------------|
| `backend/` | `npm run dev` | Start API with hot reload |
| `backend/` | `npm run build` | Compile TypeScript |
| `backend/` | `npm start` | Run compiled server |
| `frontend/` | `npm run dev` | Start Next.js dev server |
| `frontend/` | `npm run build` | Production build |
| `frontend/` | `npm start` | Run production server |
| `frontend/` | `npm run lint` | ESLint |

## License

MIT — see [LICENSE](LICENSE).
