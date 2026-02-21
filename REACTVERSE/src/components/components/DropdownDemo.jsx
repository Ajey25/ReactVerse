import { useState } from "react";

export default function DropdownDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-3 py-2 rounded w-64"
      >
        <option value="">Select option</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </select>

      <p className="text-sm">Selected: {value || "None"}</p>
    </div>
  );
}
