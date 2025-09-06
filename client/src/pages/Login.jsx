import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, ShoppingBag, Leaf } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-[#333333]/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden relative z-10"
      >
        {/* Circle Logo */}
        <div className="flex justify-center -mb-10 relative z-20">
          <div className="w-20 h-20 rounded-full bg-[#333333]/70 backdrop-blur-xl border border-[#333333] flex items-center justify-center shadow-lg">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-[#007BFF]" />
              <Leaf className="w-8 h-8 text-green-400 absolute bottom-0 right-0 rotate-12" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-[#007BFF] hover:text-[#005FCC] focus:text-[#007BFF] underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-[#007BFF] hover:bg-[#005FCC] text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] transition duration-200"
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

        {/* Footer with glass effect */}
        <div className="px-8 py-4 bg-[#333333]/50 backdrop-blur-xl flex justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#007BFF] hover:text-[#005FCC] focus:text-[#007BFF] underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
