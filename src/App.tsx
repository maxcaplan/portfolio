import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div id="app" className="bg-brand-gray-950 text-brand-white font-mono">
      <div
        id="app-container"
        className="w-full max-w-[200vh] mx-auto bg-brand-gray-900"
      >
        <div className="flex flex-row xl:grid xl:grid-cols-3 xl:grid-flow-row w-full">
          <div className="relative xl:col-span-1 flex flex-row w-full">
            <Hero />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
