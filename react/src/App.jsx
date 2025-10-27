import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header title="React Foundations" />
      <main>Home</main>
      <Footer year={new Date().getFullYear()} />
    </>
  );
}

