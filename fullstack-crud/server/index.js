import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./src/routes/items.routes.js"; 

dotenv.config();

const app = express();

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });  

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.get("/", (req, res) => res.send("API running"));
app.use("/api/items", itemsRouter); 
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

