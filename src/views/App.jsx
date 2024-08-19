import "../App.css";
import { Hero } from "../components/Hero";
import { Navbar } from "./Navbar";

function App() {
  return (
    <>
      <Navbar theme='white' />
      <Hero />
    </>
  );
}

export default App;
