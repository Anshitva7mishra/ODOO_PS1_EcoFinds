import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
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
          className="text-3xl font-bold text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          Welcome Back
        </h2>

        {/* App Name */}
        <p
          className="text-xl font-bold text-center bg-clip-text text-transparent mt-1"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          EcoFinds
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 w-full">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: "#007BFF" }}
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="font-semibold mb-2" style={{ color: "#EF4444" }}>
              {error}
            </p>
          )}

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
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <div
        className="px-8 py-4 flex justify-center"
        style={{ background: "#33333380" }}
      >
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="hover:underline"
            style={{ color: "#007BFF" }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
