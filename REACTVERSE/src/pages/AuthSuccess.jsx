// pages/AuthSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SetPasswordModal from "../components/SetPasswordModal";
import { useProgress } from "../context/ProgressContext";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { refreshProgress } = useProgress();

  useEffect(() => {
    const token = searchParams.get("token");
    const firstTimeGoogle = searchParams.get("firstTimeGoogle") === "true";

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Decode JWT to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUserEmail(payload.email);

      // Store token
      localStorage.setItem("token", token);

      // Create user object from JWT payload
      const user = {
        _id: payload.id,
        email: payload.email,
        name: payload.name,
        avatar: payload.avatar,
        userxp: payload.xp,
      };

      // Update auth context
      login(user);
      refreshProgress();

      // Show password setup modal if first time Google login
      if (firstTimeGoogle) {
        setShowPasswordModal(true);
      } else {
        // Go to dashboard immediately
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Token decode error:", err);
      navigate("/login");
    }
  }, [searchParams, navigate, login]);

  const handleModalClose = () => {
    setShowPasswordModal(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Authenticating...</div>
      </div>

      <SetPasswordModal
        isOpen={showPasswordModal}
        onClose={handleModalClose}
        userEmail={userEmail}
      />
    </>
  );
}
