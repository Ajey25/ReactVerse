import ButtonDemo from "../components/components/ButtonDemo";
import CardDemo from "../components/components/CardDemo";
import ModalDemo from "../components/components/ModalDemo";
import InputDemo from "../components/components/InputDemo";

import DropdownDemo from "../components/components/DropdownDemo";
import CheckRadioDemo from "../components/components/CheckRadioDemo";
import TextareaDemo from "../components/components/TextareaDemo";
import BadgeDemo from "../components/components/BadgeDemo";
import AccordionDemo from "../components/components/AccordionDemo";
import LoaderDemo from "../components/components/LoaderDemo";
import PaginationDemo from "../components/components/PaginationDemo";
import ToggleDemo from "../components/components/ToggleDemo";
import TableDemo from "../components/components/TableDemo";

export const componentList = [
  {
    id: "button",
    name: "Button",
    element: ButtonDemo,
    code: `
export default function ButtonDemo() {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Click Me
    </button>
  );
}
`,
  },

  {
    id: "card",
    name: "Card",
    element: CardDemo,
    code: `
export default function CardDemo() {
  return (
    <div className="p-4 border rounded shadow w-64">
      <h3 className="font-bold">Card Title</h3>
      <p className="text-sm text-gray-600">
        Some card description
      </p>
    </div>
  );
}
`,
  },

  {
    id: "modal",
    name: "Modal",
    element: ModalDemo,
    code: `
import { useState } from "react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <p className="text-gray-600">
              This modal can be closed below.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
`,
  },

  {
    id: "input",
    name: "Input",
    element: InputDemo,
    code: `
import { useState } from "react";

export default function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="border p-2 rounded w-64"
      />
      <p className="text-sm">Value: {value || "..."}</p>
    </div>
  );
}
`,
  },

  {
    id: "dropdown",
    name: "Dropdown",
    element: DropdownDemo,
    code: `
import { useState } from "react";

export default function DropdownDemo() {
  const [value, setValue] = useState("");

  return (
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
  );
}
`,
  },

  {
    id: "check-radio",
    name: "Checkbox & Radio",
    element: CheckRadioDemo,
    code: `
import { useState } from "react";

export default function CheckRadioDemo() {
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("basic");

  return (
    <div className="space-y-3">
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        Accept terms
      </label>

      {["basic", "pro", "enterprise"].map(opt => (
        <label key={opt} className="flex gap-2">
          <input
            type="radio"
            checked={radio === opt}
            onChange={() => setRadio(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
`,
  },

  {
    id: "textarea",
    name: "Textarea",
    element: TextareaDemo,
    code: `
import { useState } from "react";

export default function TextareaDemo() {
  const [text, setText] = useState("");

  return (
    <textarea
      rows={4}
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="border p-2 rounded w-72"
      placeholder="Write something..."
    />
  );
}
`,
  },

  {
    id: "badge",
    name: "Badge / Tag",
    element: BadgeDemo,
    code: `
export default function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <span className="px-3 py-1 bg-blue-600 text-white rounded-full">
        Primary
      </span>
      <span className="px-3 py-1 bg-green-600 text-white rounded-full">
        Success
      </span>
    </div>
  );
}
`,
  },

  {
    id: "accordion",
    name: "Accordion",
    element: AccordionDemo,
    code: `
import { useState } from "react";

export default function AccordionDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded w-72">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 font-semibold text-left"
      >
        What is React?
      </button>

      {open && (
        <div className="px-4 py-2 border-t text-sm">
          React is a JavaScript UI library.
        </div>
      )}
    </div>
  );
}
`,
  },

  {
    id: "loader",
    name: "Loader",
    element: LoaderDemo,
    code: `
export default function LoaderDemo() {
  return (
    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
  );
}
`,
  },

  {
    id: "pagination",
    name: "Pagination",
    element: PaginationDemo,
    code: `
import { useState } from "react";

export default function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setPage(p => Math.max(1, p - 1))}>◀</button>
      <span>Page {page}</span>
      <button onClick={() => setPage(p => p + 1)}>▶</button>
    </div>
  );
}
`,
  },

  {
    id: "toggle",
    name: "Toggle / Switch",
    element: ToggleDemo,
    code: `
import { useState } from "react";

export default function ToggleDemo() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(!on)}
      className={\`w-14 h-7 rounded-full relative transition \${on ? "bg-green-600" : "bg-gray-400"}\`}
    >
      <span
        className={\`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition \${on ? "translate-x-7" : ""}\`}
      />
    </button>
  );
}
`,
  },

  {
    id: "table",
    name: "Table",
    element: TableDemo,
    code: `
export default function TableDemo() {
  const users = [
    { id: 1, name: "Aj", role: "Admin" },
    { id: 2, name: "Sam", role: "User" },
    { id: 3, name: "Riya", role: "User" },
  ];

  return (
    <table className="border-collapse border w-72 text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="border p-2">{u.name}</td>
            <td className="border p-2">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`,
  },
];
