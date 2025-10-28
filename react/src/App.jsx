import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";

export default function App() {
  const title = "React Foundations";
  const year = new Date().getFullYear();

  function handleClick() {
    alert("Button clicked!");
  }

  return (
    <>
      <Header title={title} />
      <main>
        <p>Welcome to Day 2 — JSX & Components.</p>
        <Button label="Click Me" onClick={handleClick} />
      </main>
      <Footer year={year} />
    </>
  );
}


