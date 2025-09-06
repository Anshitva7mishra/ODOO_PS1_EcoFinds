import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, ShoppingBag, Leaf } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  // Track cursor for ring effect
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] px-4">
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full rounded-2xl shadow-2xl group"
      >
        {/* Gradient Ring following cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(0,123,255,0.25), transparent 70%)`,
          }}
        ></div>

        {/* Circle Logo */}
        <div className="flex justify-center -mb-10 relative z-20">
          <div className="w-20 h-20 rounded-full bg-[#333333]/70 backdrop-blur-xl border border-[#333333] flex items-center justify-center shadow-lg">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-[#007BFF]" />
              <Leaf className="w-8 h-8 text-green-400 absolute bottom-0 right-0 rotate-12" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="relative z-10 bg-[#333333]/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

            <PasswordStrengthMeter password={password} />

            <motion.button
              className="mt-4 w-full py-3 px-4 bg-[#007BFF] text-white 
                font-bold rounded-lg shadow-lg hover:bg-[#005FCC] focus:outline-none 
                focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>

          {/* Footer inside card */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-[#007BFF] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
