let items = [{ id: 1, name: "Example", createdAt: new Date().toISOString() }];

export const listItems = (req, res) => res.json(items);

export const getItem = (req, res) => {
  const id = Number(req.params.id);
  const found = items.find(i => i.id === id);
  if (!found) return res.status(404).json({ error: "Not found" });
  res.json(found);
};

export const createItem = (req, res) => {
  const { name } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name required" });
  }
  const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const item = { id, name, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json(item);
};

export const updateItem = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const idx = items.findIndex(i => i.id === id);
  if (name !== undefined && !String(name).trim()) {
    return res.status(400).json({ error: "invalid name" });
  }
  items[idx] = { ...items[idx], name: name ?? items[idx].name };
  res.json(items[idx]);
};

export const deleteItem = (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter(i => i.id !== id);
  if (items.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
};