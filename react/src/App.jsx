import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Counter from "./components/Counter";
import NameForm from "./components/NameForm";
import SearchBox from "./components/SearchBox";
import ItemList from "./components/ItemList";
import TodoList from "./components/TodoList";
import { useState } from "react";

export default function App() {
  const title = "React Foundations -- Demo";
  const year = new Date().getFullYear();

  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Cherry", "Date"];

  function handleClick() {
    alert("Button clicked!");
  }


  return (
    <>
      <Header title={title} />
      <main className="container">
        <section className="card">
          <h2>State & Events</h2>
          <Counter />
          <div className="spacer" />
          <NameForm />
        </section>

        <section className="card">
          <h2>Lifted State: Search</h2>
          <SearchBox query={query} onChange={setQuery} />
          <ItemList items={items} query={query} />
        </section>

        <section className="card">
          <h2>To-Do List</h2>
          <TodoList />
        </section>

        <section className="card">
          <h2>Reusable Button</h2>
          <Button label="Click Me" onClick={handleClick} />
        </section>
      </main>
      <Footer year={year} />
    </>
  );
}


