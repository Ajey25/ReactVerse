import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex bg-[var(--bg)] text-[var(--text)] h-screen w-full overflow-x-hidden relative">
      {/* DESKTOP SIDEBAR (unchanged) */}
      {!isMobile && (
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          theme={theme}
          isMobile={false}
        />
      )}

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobile && mobileSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 backdrop-blur-xl"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full">
            <Sidebar
              isOpen={true}
              setIsOpen={setMobileSidebarOpen}
              theme={theme}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* Main Content Area - REMOVE overflow-auto from parent */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 w-full min-w-0"
        style={{
          marginLeft: !isMobile ? (isOpen ? "256px" : "80px") : "0",
        }}
      >
        {/* Fixed Navbar instead of sticky */}

        <Navbar
          theme={theme}
          setTheme={setTheme}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          sidebarOpen={isMobile ? mobileSidebarOpen : isOpen}
        />

        <main className="flex-1 overflow-y-auto min-h-0 ">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
