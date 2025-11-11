import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./src/routes/items.routes.js"; 

dotenv.config();

const app = express();

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
if (!N8N_WEBHOOK_URL) {
  console.error("N8N_WEBHOOK_URL is not set");
}

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });  

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/items", itemsRouter); 

app.post("/api/ai", async (req, res) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });
  
    if (!response.ok) {
      const text = await response.text();
      console.error("n8n error response:", response.status, text);
      return res
        .status(500)
        .json({ error: "n8n workflow error", detail: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error calling n8n webhook:", err);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
