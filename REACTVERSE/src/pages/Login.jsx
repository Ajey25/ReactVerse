import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleButton from "../components/GoogleButton";
import TextInput from "../components/TextInput";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext"; // Add this import
import toast from "react-hot-toast";
import { useProgress } from "../context/ProgressContext";
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const { refreshProgress } = useProgress();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form); // { token, user }

      console.log("Login response:", res); // Add this to debug

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Update context with user (this also saves to localStorage)
      login(res.data.user);

      // Go to dashboard
      navigate("/dashboard", { replace: true });
      toast.success("Welcome Back!");
      refreshProgress();
    } catch (err) {
      console.log("Login error:", err);

      // If backend tells Google-only user to login via Google
      if (err.response?.data?.requiresGoogle) {
        toast.error(
          "This account was created with Google. Please login with Google.",
        );
        return;
      }

      toast.error("Login failed. Please check your credentials.");
    }
  };
  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* PARTICLE BACKGROUND */}
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

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 
        p-8 rounded-2xl shadow-2xl relative z-10"
      >
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-3xl font-bold text-white text-center"
        >
          Welcome Back 👋
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-gray-300 text-center mt-2"
        >
          Login to continue your journey
        </motion.p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </motion.div>

          {/* LOGIN BUTTON */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all 
            duration-300 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Login
          </motion.button>
        </form>

        {/* SEPARATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center my-6"
        >
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-gray-300 px-4">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </motion.div>

        {/* GOOGLE LOGIN */}
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

        {/* SIGNUP LINK */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="text-center text-gray-300 mt-6"
        >
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
