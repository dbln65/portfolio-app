import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import AboutMe from "./aboutme.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://example.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Cognito JWT Verifier konfigurieren
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Fehlendes Token" });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifier.verify(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error("Auth-Fehler:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Geschützte Route
app.get("/aboutme", requireAuth, (req, res) => {
  res.json(AboutMe);
});

// Kontaktformular
app.post("/contact", (req, res) => {
  console.log("📩 Neue Kontaktanfrage:", req.body);
  res.json({ message: "Nachricht erfolgreich empfangen!" });
});

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// GANZ AM ENDE
app.get("/", (req, res) => {
  res.redirect("https://example.com");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`Server läuft auf Port ${PORT}`));
