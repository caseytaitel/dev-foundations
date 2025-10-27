import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const title = "React Foundations";
  const year = new Date().getFullYear();

  return (
    <>
      <Header title={title} />
      <main>
        <p>Welcome to Day 2 -- JSX & Components.</p>
      </main>
      <Footer year={year}/>
    </>
  );
}

