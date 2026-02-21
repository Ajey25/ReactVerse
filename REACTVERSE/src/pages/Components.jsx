import { useState } from "react";
import { componentList } from "../data/componentdata";

export default function Components() {
  const [active, setActive] = useState(componentList[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveComponent = active.element;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* 🔹 Mobile Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b sm:hidden">
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">
          ☰
        </button>
        <h1 className="text-lg font-semibold">Components</h1>
      </header>

      <div className="flex">
        {/* 🔹 Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 🔹 Sidebar */}
        <aside
          className={`
            fixed sm:static z-10
            w-64 h-screen
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
            border-r
          `}
          style={{
            backgroundColor: "var(--sidebar-bg)",
            borderColor: "var(--border)",
          }}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Components
            </h2>

            <nav className="space-y-1">
              {componentList.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActive(comp);
                    setSidebarOpen(false);
                  }}
                  className="w-full text-left px-3 py-1 rounded-lg transition-all"
                  style={{
                    backgroundColor:
                      active.id === comp.id ? "var(--card-bg)" : "transparent",
                    borderLeft:
                      active.id === comp.id
                        ? "3px solid var(--primary)"
                        : "3px solid transparent",
                    color:
                      active.id === comp.id ? "var(--primary)" : "var(--text)",
                    fontWeight: active.id === comp.id ? "600" : "400",
                  }}
                >
                  {comp.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 🔹 Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[350px] sm:max-w-6xl mx-auto  sm:p-2 space-y-8 p-4">
            {/* Header */}
            <header>
              <h1 className="text-2xl sm:text-4xl font-bold mb-1">
                {active.name}
              </h1>
              <p className="text-sm opacity-60">
                Interactive component demonstration and code preview
              </p>
            </header>

            {/* Preview */}
            <section>
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                Preview
              </h3>
              <p className="text-sm opacity-60 mb-3">
                Live interactive demonstration
              </p>

              <div
                className="p-4 sm:p-8 rounded-xl sm:rounded-2xl border min-h-[220px] flex items-center justify-center"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card-bg)",
                }}
              >
                <ActiveComponent />
              </div>
            </section>

            {/* Code */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    Source Code
                  </h3>
                  <p className="text-sm opacity-60">
                    Copy and paste into your project
                  </p>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(active.code)}
                  className="px-3 py-2 text-sm rounded-lg font-medium hover:opacity-80"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                  }}
                >
                  📋 Copy
                </button>
              </div>

              <div
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--code-bg)",
                }}
              >
                <pre className="p-4 overflow-x-auto text-sm">
                  <code>{active.code}</code>
                </pre>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
