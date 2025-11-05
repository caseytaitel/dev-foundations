import { Router } from "express";
import {
  listItems, getItem, createItem, updateItem, deleteItem
} from "../controllers/items.controller.js";

const r = Router();
r.get("/", listItems);
r.get("/:id", getItem);
r.post("/", createItem);
r.put("/:id", updateItem);
r.delete("/:id", deleteItem);
export default r;
