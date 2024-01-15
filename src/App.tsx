import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div id="app" className="bg-brand-gray-950 text-brand-white font-mono">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
