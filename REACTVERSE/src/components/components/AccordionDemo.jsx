import { useState } from "react";

export default function AccordionDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded w-72">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 font-semibold"
      >
        <span>What is React?</span>

        {/* Arrow */}
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-0" : " rotate-180"
          }`}
        >
          ^
        </span>
      </button>

      {open && (
        <div className="px-4 py-2 text-sm border-t">
          React is a JavaScript library for building UIs.
        </div>
      )}
    </div>
  );
}
