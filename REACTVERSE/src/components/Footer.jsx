export function Footer() {
  return (
    <footer className="relative z-20 py-3 bg-gradient-to-b from-black/10 to-black/20 bg-white/10 border border-white/20">
      <div className="max-w-7xl mx-auto px-6 text-white text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white font-semibold">
          © {new Date().getFullYear()} Reactverse • Built with ❤️
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-white hover:text-gray-300">
            GitHub
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Docs
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
