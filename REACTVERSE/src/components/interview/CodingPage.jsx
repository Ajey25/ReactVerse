// CodingPage.jsx
import { FiCode } from "react-icons/fi";

export default function CodingPage() {
  return (
    <div className="text-center p-10">
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl inline-block mb-4">
        <FiCode className="text-green-400" size={40} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Coding Challenges</h1>

      <p className="text-white/70">Mini projects & coding tasks coming soon…</p>
    </div>
  );
}
