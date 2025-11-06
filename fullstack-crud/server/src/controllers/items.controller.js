import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listItems = async (req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) { next(err); }
};

export const getItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) { next(err); }
};

export const createItem = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (typeof name !== "string" || !name.trim())
      return res.status(400).json({ error: "name required" });
    const item = await prisma.item.create({ data: { name } });
    res.status(201).json(item);
  } catch (err) { next(err); }
};

export const updateItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (name !== undefined && !String(name).trim())
      return res.status(400).json({ error: "invalid name" });
    const item = await prisma.item.update({ where: { id }, data: { name } });
    res.json(item);
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.item.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    next(err);
  }
};
