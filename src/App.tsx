import Footer from "./components/Footer";
import Hero from "./components/Hero";

import Sections from "./components/Sections";

function App() {
  return (
    <div id="app" className="bg-brand-gray-950 text-brand-white font-mono">
      <div
        id="app-container"
        className="w-full xl:max-w-[200vh] mx-auto bg-brand-gray-900"
      >
        <div className="flex flex-col xl:grid xl:grid-cols-3 xl:grid-flow-row w-full">
          <div
            className={`
		  relative 
		  xl:col-span-1 
		  flex 
		  flex-row 
		  w-full 
		  border-b
		  xl:border-r 
		  border-brand-gray-700 
		  shadow-brand-gray-950 
		  shadow-2xl
		  `}
          >
            <Hero className="sticky top-0" />
          </div>

          <div className="relative xl:col-span-2 flex flex-col gap-y-8 w-full pt-6">
            <Sections />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
