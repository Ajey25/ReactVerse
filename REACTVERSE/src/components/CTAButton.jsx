export function CTAButton({ children }) {
  return (
    <button className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transform transition">
      {children}
    </button>
  );
}
