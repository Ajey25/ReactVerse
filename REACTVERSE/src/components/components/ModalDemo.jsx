import { useState } from "react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {" "}
      {/* This traps the modal inside the demo area */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
      >
        Open Modal
      </button>
      {open && (
        <div className="absolute inset-0 bg-black/40 rounded-lg grid place-items-center z-10">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-xl shadow-xl space-y-4 w-72">
            <h2 className="text-xl font-semibold text-[var(--text-bold)]">
              Modal Title
            </h2>
            <p className="text-[var(--text-light)]">
              This modal stays inside its parent. No escape. No drama.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
