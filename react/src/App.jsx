import { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");

  // Load from API on mount
  useEffect(() => {
    getItems().then(setItems);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const item = await createItem(newName);
    setItems([...items, item]);
    setNewName("");
  }

  async function handleUpdate(id, name) {
    const updated = await updateItem(id, name);
    setItems(items.map(i => (i.id === id ? updated : i)));
  }

  async function handleDelete(id) {
    await deleteItem(id);
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Items</h1>

      <form onSubmit={handleAdd}>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New item"
          className="border p-2 mr-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Add</button>
      </form>

      <ul className="mt-4">
        {items.map(item => (
          <li key={item.id} className="flex items-center justify-between border-b py-1">
            <span>{item.name}</span>
            <div>
              <button onClick={() => handleUpdate(item.id, prompt("Rename:", item.name))} className="mr-2 text-green-600">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}