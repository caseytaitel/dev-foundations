import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Saved: ${name.trim() || "(empty)"}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <p>Preview: {name || "—"}</p>
    </>
  );
}
