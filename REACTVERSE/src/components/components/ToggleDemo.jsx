import { useState } from "react";

export default function ToggleDemo() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-14 h-7 rounded-full relative transition ${
        on ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${
          on ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}
