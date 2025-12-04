import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold shadow-lg">
            {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
          </div>
          <div className="text-white font-semibold text-lg">Reactverse</div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          <a href="#modules" className="hover:text-white transition">
            Lessons
          </a>
          <a href="#playground" className="hover:text-white transition">
            Playground
          </a>
          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>
          <a href="#interview" className="hover:text-white transition">
            Interview
          </a>
          <a href="#profile" className="hover:text-white transition">
            Profile
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
