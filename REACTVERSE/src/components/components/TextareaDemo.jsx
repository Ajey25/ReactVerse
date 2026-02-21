import { useState } from "react";

export default function TextareaDemo() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-2">
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-72"
        placeholder="Write something..."
      />
      <p className="text-sm">Characters: {text.length}</p>
    </div>
  );
}
