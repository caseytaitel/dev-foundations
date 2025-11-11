import { useState, useEffect } from "react";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  generateAIResponse,
} from "./api.js";
import "./App.css";

export default function App() {
  // Items (CRUD)
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");

  // AI
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Load items on mount
  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    }
    loadItems();
  }, []);

  // CRUD: add
  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const item = await createItem(newName.trim());
      setItems((prev) => [...prev, item]);
      setNewName("");
    } catch (err) {
      console.error("Failed to create item:", err);
      alert("Failed to create item. Check console for details.");
    }
  }

  // CRUD: update
  async function handleUpdate(id, currentName) {
    const name = prompt("Rename:", currentName);
    if (!name || !name.trim()) return;
    try {
      const updated = await updateItem(id, name.trim());
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Failed to update item. Check console for details.");
    }
  }

  // CRUD: delete
  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item. Check console for details.");
    }
  }

  // AI: submit prompt
  async function handleAISubmit(e) {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiError("");
    setAiResult("");

    try {
      const data = await generateAIResponse({ prompt: aiPrompt });

      const message =
        data?.choices?.[0]?.message?.content ||
        data?.message ||
        JSON.stringify(data, null, 2);

      setAiResult(message);
    } catch (err) {
      console.error("AI request failed:", err);
      setAiError(err.message || "Something went wrong talking to the AI service.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <main className="app-container">
      {/* Items Section */}
      <section className="panel">
        <h1 className="section-title">Items</h1>
        <p className="section-subtitle">
          Simple CRUD list powered by your Express + Prisma backend.
        </p>

        <form onSubmit={handleAdd} className="items-form">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New item"
            className="input"
          />
          <button type="submit" className="button primary">
            Add
          </button>
        </form>

        <ul className="items-list">
          {items.length === 0 && (
            <li className="empty-text">No items yet. Add one above.</li>
          )}
          {items.map((item) => (
            <li key={item.id} className="item-row">
              <span className="item-name">{item.name}</span>
              <div className="item-actions">
                <button
                  type="button"
                  onClick={() => handleUpdate(item.id, item.name)}
                  className="button ghost edit"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="button ghost delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* AI Section */}
      <section className="panel">
        <h2 className="section-title">AI Prompt Tester</h2>
        <p className="section-subtitle">
          This calls your full pipeline: Frontend → /api/ai → n8n → OpenAI → back.
        </p>

        <form onSubmit={handleAISubmit} className="ai-form">
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={4}
            placeholder="Ask the AI something..."
            className="textarea"
          />
          <div className="ai-actions">
            <button
              type="submit"
              disabled={aiLoading}
              className="button primary"
            >
              {aiLoading ? "Thinking..." : "Generate"}
            </button>
          </div>
        </form>

        {aiError && <div className="ai-error">{aiError}</div>}

        {aiResult && !aiError && (
          <div className="ai-result">
            {aiResult}
          </div>
        )}
      </section>
    </main>
  );
}