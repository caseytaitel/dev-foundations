const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// CRUD operations
export async function getItems() {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(name) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function updateItem(id, name) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    throw new Error("Failed to delete item");
  }
}

// AI response
export async function generateAIResponse(data) {
  const res = await fetch(`${API_URL}/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || "AI request failed");
  }
  return res.json();
}