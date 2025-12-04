// components/SetPasswordModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function SetPasswordModal({ isOpen, onClose, userEmail }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password set successfully!");
        onClose();
      } else {
        alert(data.message || "Failed to set password");
      }
    } catch (err) {
      console.error("Set password error:", err);
      alert("Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* PARTICLE BACKGROUND */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            className="fixed inset-0 z-30"
            options={{
              background: { color: "#000" },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "repulse" },
                  onClick: { enable: true, mode: "push" },
                },
                modes: { repulse: { distance: 120 }, push: { quantity: 4 } },
              },
              particles: {
                number: { value: 90, density: { enable: true, area: 900 } },
                color: { value: ["#8b5cf6", "#06b6d4", "#f472b6"] },
                links: {
                  enable: true,
                  distance: 140,
                  color: "#7c3aed",
                  opacity: 0.25,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.7,
                  outModes: { default: "bounce" },
                },
                size: { value: 2 },
                opacity: { value: 0.7 },
              },
            }}
          />

          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-50">
              <h2 className="text-2xl font-bold text-white mb-2">
                Set Your Password 🔐
              </h2>
              <p className="text-gray-400 mb-6">
                Set a password so you can also login with email and password
                later.
              </p>

              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? "Setting..." : "Set Password"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
