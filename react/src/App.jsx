import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Counter from "./components/Counter";
import NameForm from "./components/NameForm";
import { useState } from "react";
import SearchBox from "./components/SearchBox";
import ItemList from "./components/ItemList";

export default function App() {
  const title = "React Foundations";
  const year = new Date().getFullYear();
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Cherry", "Date"];

  function handleClick() {
    alert("Button clicked!");
  }

  return (
    <>
      <Header title={title} />
      <main>
        <p>Welcome to Day 3 — States & Events.</p>
        <Counter />
        <NameForm />

        <section>
          <SearchBox query={query} onChange={setQuery} />
          <ItemList items={items} query={query} />
        </section>

        <Button label="Click Me" onClick={handleClick} />
      </main>
      <Footer year={year} />
    </>
  );
}


