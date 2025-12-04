import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { SmoothScroll } from "./components/SmoothScroll";

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <SmoothScroll />
      <RouterProvider router={router} />
    </div>
  );
}
