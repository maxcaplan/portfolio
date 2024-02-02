import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
