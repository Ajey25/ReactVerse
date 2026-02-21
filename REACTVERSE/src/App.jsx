import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { SmoothScroll } from "./components/SmoothScroll";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { followingDotCursor } from "cursor-effects";

export default function App() {
  useEffect(() => {
    const cursor = new followingDotCursor({
      size: 2,
      color: "#22d3ee",
      zIndex: 9999,
    });

    return () => cursor.destroy();
  }, []);
  return (
    <div className="bg-black min-h-screen ">
      {/* <SmoothScroll /> */}
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}
