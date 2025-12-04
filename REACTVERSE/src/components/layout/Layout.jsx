import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex bg-[var(--bg)] text-[var(--text)] min-h-screen">
      {/* Fixed Sidebar like W3Schools */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} />

      {/* Main Content Area - W3Schools style */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isOpen ? "256px" : "80px",
        }}
      >
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 bg-[var(--bg)] text-[var(--text)]">
          <Navbar theme={theme} setTheme={setTheme} />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
