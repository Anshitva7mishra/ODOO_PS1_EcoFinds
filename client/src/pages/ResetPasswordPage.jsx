import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0f0f0f, #1a1a1a)",
      }}
    >
      <div
        className="p-8 rounded-2xl"
        style={{
          backgroundColor: "rgba(51, 51, 51, 0.5)", // #33333350
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          Reset Password
        </h2>

        {error && (
          <p
            className="text-sm mb-4 font-semibold"
            style={{ color: "#EF4444" }}
          >
            {error}
          </p>
        )}
        {message && (
          <p
            className="text-sm mb-4 font-semibold"
            style={{ color: "#007BFF" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              backgroundColor: "#1a1a1a",
              color: "#FFFFFF",
              borderColor: "#333333",
            }}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              backgroundColor: "#1a1a1a",
              color: "#FFFFFF",
              borderColor: "#333333",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200"
            style={{
              background: "linear-gradient(to right, #007BFF, #005FCC)",
              color: "#FFFFFF",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
