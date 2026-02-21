import { useState } from "react";

export default function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">Your name</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter something"
        className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-500">Value: {value || "..."}</p>
    </div>
  );
}
