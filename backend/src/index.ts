import "dotenv/config";
import cors from "cors";
import express from "express";
import { generateRouter } from "./routes/generate.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", generateRouter);

app.listen(port, () => {
  console.log(`ViralTrail backend running on http://localhost:${port}`);
});
