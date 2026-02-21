// src/components/GoogleButton.jsx

export default function GoogleButton() {
  const SERVER_URL = import.meta.env.VITE_BASE_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
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
