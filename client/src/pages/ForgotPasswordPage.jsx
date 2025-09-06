import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
      <div className="p-8 flex flex-col items-center">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-center bg-clip-text text-transparent mb-6"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full">
            <p className="mb-6 text-center" style={{ color: "#9CA3AF" }}>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 font-bold rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                background: "linear-gradient(to right, #007BFF, #005FCC)",
                color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
              }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#007BFF" }}
            >
              <Mail className="h-8 w-8" style={{ color: "#FFFFFF" }} />
            </motion.div>
            <p style={{ color: "#9CA3AF" }} className="mb-6">
              If an account exists for{" "}
              <span style={{ color: "#FFFFFF" }}>{email}</span>, you will
              receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-8 py-4 flex justify-center"
        style={{ background: "#33333380" }}
      >
        <Link
          to={"/login"}
          className="text-sm flex items-center hover:underline"
          style={{ color: "#007BFF" }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
