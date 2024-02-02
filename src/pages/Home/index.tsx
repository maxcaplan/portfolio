import Footer from "../../components/Footer";
import Hero from "../../components/Hero";

import About from "../../components/Sections/About";
import Contact from "../../components/Sections/Contact";
import Work from "../../components/Sections/Work";

function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-y-20">
      <div className="flex flex-col xl:grid xl:grid-cols-3 xl:grid-flow-row w-full border-b border-brand-gray-700">
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
		  `}
        >
          <Hero className="sticky top-0" />
        </div>

        <div className="relative xl:col-span-2 flex flex-col gap-y-20 w-full pt-6 pb-20">
          <Work />

          <About />
        </div>
      </div>

      <Contact />

      <Footer />
    </div>
  );
}

export default Home;