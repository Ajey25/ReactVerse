// src/components/TextInput.jsx
export default function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-300 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-purple-500 
          placeholder-gray-400 transition
        "
      />
    </div>
  );
}
