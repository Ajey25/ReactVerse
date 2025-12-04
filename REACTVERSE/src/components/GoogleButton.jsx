// src/components/GoogleButton.jsx
export default function GoogleButton() {
  const SERVER_URL = "http://localhost:5000"; // change later

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
    >
      <img src="/google.png" className="w-5 h-5" />
      Continue with Google
    </button>
  );
}
