import { useState } from "react";

export default function CheckRadioDemo() {
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("basic");

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        Accept terms
      </label>

      <div className="space-y-1">
        {["basic", "pro", "enterprise"].map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name="plan"
              value={opt}
              checked={radio === opt}
              onChange={() => setRadio(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
