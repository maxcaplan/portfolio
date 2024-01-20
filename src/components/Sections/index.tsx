import About from "./About";
import Work from "./Work";

export default function Sections() {
  return (
    <div className="relative w-full flex flex-col gap-y-16">
      <Work />
      <About />
    </div>
  );
}
