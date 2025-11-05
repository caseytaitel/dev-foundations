import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./src/routes/items.routes.js"; 

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));
app.use("/api/items", itemsRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

