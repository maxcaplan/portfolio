import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

export default function App() {
  return (
    <div className="bg-brand-gray-950 text-brand-white font-mono w-full h-screen">
      <div className="w-full h-fit xl:max-w-[200vh]  mx-auto bg-brand-gray-900">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
