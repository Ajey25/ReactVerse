export function CTAButton({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        mt-5 sm:mt-6
        inline-flex items-center
        gap-2 sm:gap-3
        px-4 py-2.5 sm:px-6 sm:py-3
        text-sm sm:text-base
        rounded-full
        bg-gradient-to-r from-purple-600 to-pink-500
        text-white font-semibold
        shadow-md sm:shadow-lg
        transition-transform duration-200
        hover:scale-105
        active:scale-95
      "
    >
      {children}
    </button>
  );
}
