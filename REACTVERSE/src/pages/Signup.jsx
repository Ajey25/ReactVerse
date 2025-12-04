import { useState } from "react";
import { signupUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser({
        email: form.email,
        password: form.password,
        name: form.fullName,
      });

      console.log("Signup Response:", res);

      const token = res.data?.token;
      const user = res.data?.user;

      if (!token || !user) {
        alert("Signup response invalid");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Update AuthContext with user data (this also stores in localStorage)
      login(user);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to create account");
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* PARTICLES */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
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
            move: { enable: true, speed: 0.7, outModes: { default: "bounce" } },
            size: { value: 2 },
            opacity: { value: 0.7 },
          },
        }}
      />

      {/* SIGNUP CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-semibold text-white text-center mb-6"
        >
          Create Account
        </motion.h2>

        {/* GOOGLE LOGIN BUTTON */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={googleLogin} // Add this
          type="button" // Add this to prevent form submission
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition cursor-pointer"
        >
          <FcGoogle size={22} />
          Continue with Google
        </motion.button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-white/20"></div>
          <span className="text-gray-400 text-sm px-3">or</span>
          <div className="flex-1 h-[1px] bg-white/20"></div>
        </div>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="John Doe"
              required
            />
          </motion.div>

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="text-gray-300 text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="you@example.com"
              required
            />
          </motion.div>

          {/* PASSWORD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
          >
            <label className="text-gray-300 text-sm">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
              required
            />
          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            type="submit"
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-medium cursor-pointer"
          >
            Create Account
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-center text-gray-400 text-sm mt-6"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Log in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
