import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  }

  function handleDelete(task) {
    setTasks(tasks.filter((t) => t !== task));
  }

  return (
    <section>
      <h3>To-Do List</h3>
      <form onSubmit={handleAdd}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t}>
              {t}
              <button onClick={() => handleDelete(t)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
