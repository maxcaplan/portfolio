import About from "./About";
import Work from "./Work";

export default function Sections() {
  return (
    <div className="relative w-full flex flex-col gap-y-20">
      <Work />
      <About />
    </div>
  );
}
