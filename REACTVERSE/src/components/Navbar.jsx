import { useState } from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="max-w-7xl  px-3 sm:px:2 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-9 h-9" />
          <span className="text-white font-semibold text-lg">Reactverse</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          <a href="#modules" className="hover:text-white">
            Lessons
          </a>
          <a href="#playground" className="hover:text-white">
            Playground
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="#interview" className="hover:text-white">
            Interview
          </a>
          <a href="#profile" className="hover:text-white">
            Profile
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10">
          <nav className="flex flex-col px-6 py-6 gap-4 text-gray-200">
            {[
              ["Lessons", "#modules"],
              ["Playground", "#playground"],
              ["Projects", "#projects"],
              ["Interview", "#interview"],
              ["Profile", "#profile"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                onClick={() => setOpen(false)}
                className="text-base hover:text-white"
              >
                {label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-center px-4 py-2 rounded-full bg-white/10 text-white"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="text-center px-4 py-2 rounded-full bg-purple-600 text-white"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
