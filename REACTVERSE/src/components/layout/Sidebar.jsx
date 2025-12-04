import { useState, useEffect } from "react";
import logo from "../../assets/react.svg";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiCode,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
} from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [modules, setModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [completed, setCompleted] = useState([]);

  // STATIC MENU
  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Projects", icon: <FiCode />, path: "/projects" },
    { name: "Interview", icon: <FiGrid />, path: "/interview" },
    { name: "Components", icon: <FiGrid />, path: "/components" },
  ];

  // Check if menu item is active
  const isActive = (path) => location.pathname === path;

  // --- FETCH MODULES WITH LESSONS ---
  useEffect(() => {
    fetch("http://localhost:5000/api/lessons/modules-with-lessons")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setModules(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/progress/completed/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCompleted(data.completedLessons);
      })
      .catch((err) => console.log(err));
  }, [location.pathname]); // 👈 sidebar updates every time route changes

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border)]
        transition-all duration-300 flex flex-col z-100
        ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo Header - Fixed at top */}
      <div className="h-18 flex items-center gap-3 px-4 border-b border-[var(--border)] bg-[var(--sidebar-bg)] shrink-0">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 filter brightness-0 invert"
          />
        </div>

        {isOpen && (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              REACTVERSE
            </h1>
            <p className="text-xs opacity-60">Learn & Build</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-5 bg-gradient-to-br from-blue-500 to-purple-600 
          text-white p-1.5 rounded-full shadow-lg border-2 border-[var(--bg)] 
          hover:scale-110 transition z-100"
      >
        {isOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
      </button>

      {/* Scrollable Navigation with Themed Scrollbar */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {/* STATIC MENUS */}
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
              ${
                isActive(item.path)
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-[var(--text)] hover:bg-[var(--hover-bg)]"
              }`}
          >
            <span
              className={`text-lg ${
                isActive(item.path) ? "text-white" : "text-[var(--text)]/70"
              }`}
            >
              {item.icon}
            </span>
            {isOpen && <span className="font-medium text-sm">{item.name}</span>}
          </Link>
        ))}

        {/* LEARN MODULES SECTION */}
        <div className="mt-8 mb-4">
          {isOpen && (
            <div className="px-3 py-2 text-xs font-semibold text-[var(--text)]/50 uppercase tracking-wider">
              Learning Path
            </div>
          )}

          {/* Modules */}
          {modules.map((mod) => (
            <div key={mod.moduleId} className="mb-1">
              {/* Module Header */}
              <button
                onClick={() =>
                  setExpandedModule(
                    expandedModule === mod.moduleId ? null : mod.moduleId
                  )
                }
                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg transition-all
                  ${
                    expandedModule === mod.moduleId
                      ? "bg-[var(--hover-bg)] text-[var(--text)]"
                      : "text-[var(--text)] hover:bg-[var(--hover-bg)]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FiChevronRight
                    className={`transition-transform text-[var(--text)]/60
                      ${expandedModule === mod.moduleId && "rotate-90"}`}
                  />
                  {isOpen && (
                    <span className="text-sm font-medium">
                      {mod.moduleName}
                    </span>
                  )}
                </div>

                {isOpen &&
                  (expandedModule === mod.moduleId ? (
                    <FiChevronUp className="text-[var(--text)]/40" />
                  ) : (
                    <FiChevronDown className="text-[var(--text)]/40" />
                  ))}
              </button>

              {/* Lessons List */}
              {expandedModule === mod.moduleId && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-[var(--border)] pl-3">
                  {mod.lessons.map((lesson) => (
                    <Link
                      key={lesson.lessonId}
                      to={`/lesson/${lesson.lessonId}`}
                      className="block px-3 py-2 text-sm rounded-lg transition-all
      text-[var(--text)]/70 hover:bg-[var(--hover-bg)] hover:text-[var(--text)]"
                    >
                      {isOpen ? (
                        <div className="flex items-start gap-2 w-full">
                          {/* Number */}
                          <span className="font-medium text-[var(--text)]/40 shrink-0">
                            {lesson.lessonNumber}.
                          </span>

                          {/* Title (wraps to multiple lines) */}
                          <span className="text-sm leading-5 break-words flex-1">
                            {lesson.title}
                          </span>

                          {/* Tick column (fixed width, never shrinks) */}
                          <div className="w-6 flex justify-end shrink-0 pt-1">
                            {completed.includes(lesson.lessonId) && (
                              <FiCheckCircle
                                className="text-green-400"
                                size={16}
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="relative mx-auto flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[var(--text)]/30" />

                          {/* Tiny tick when sidebar closed */}
                          {completed.includes(lesson.lessonId) && (
                            <FiCheckCircle
                              className="text-green-400 "
                              size={16}
                            />
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
